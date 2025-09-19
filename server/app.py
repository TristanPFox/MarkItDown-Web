from fastapi import (
    FastAPI,
    HTTPException,
    status,
    UploadFile,
    File,
    BackgroundTasks,
)
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from dotenv import load_dotenv
from markitdown import MarkItDown
import uvicorn
import pytz
import os

from api.models import MessageResponse, FileDownloadResponse
from utils.ssl_generator import generate_self_signed_cert

utc = pytz.utc
local_tz = pytz.timezone("America/New_York")
load_dotenv()

# FastAPI app
app = FastAPI()

app.state.mission_gen_time = datetime.now(local_tz)
app.state.initial_gen = False

origins = []
origins.append(os.getenv("https://project.domain.com"))
if os.getenv("FRONTEND_IP"):
    origins.append(os.getenv("FRONTEND_IP"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to the React build folder
dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../dist"))


# =========== Helper Functions ============


def markitdown_to_text(file_path):
    md = MarkItDown(enable_plugins=True)
    result = md.convert(file_path)
    return result.text_content


# ============ API Endpoints ============


@app.get("/api/health", response_model=MessageResponse)
async def health_check():
    return {"message": "Server is healthy"}


# Convert a pptx, docx, xlsx, xls, pdf, or md file to markdown text
@app.post("/api/convert", response_model=FileDownloadResponse)
async def convert_file(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    allowed_extensions = [".pptx", ".docx", ".xlsx", ".xls", ".pdf", ".md"]
    filename, file_extension = os.path.splitext(file.filename)

    if file_extension.lower() not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type: {file_extension}. Supported types are: {', '.join(allowed_extensions)}",
        )

    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as temp_file:
        content = await file.read()
        temp_file.write(content)

    try:
        text_content = markitdown_to_text(temp_file_path)
    except Exception as e:
        os.remove(temp_file_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing file: {str(e)}",
        )

    # Clean up the uploaded temp file
    os.remove(temp_file_path)

    # Create markdown file
    markdown_filename = f"{filename}.md"
    markdown_file_path = f"converted_{markdown_filename}"

    try:
        with open(markdown_file_path, "w", encoding="utf-8") as md_file:
            md_file.write(text_content)

        # Schedule file deletion after response is sent
        background_tasks.add_task(os.remove, markdown_file_path)

        # Return the markdown file as a download
        return FileResponse(
            path=markdown_file_path,
            filename=markdown_filename,
            media_type="text/markdown",
            headers={
                "Content-Disposition": f"attachment; filename={markdown_filename}"
            },
        )
    except Exception as e:
        # Clean up in case of error
        if os.path.exists(markdown_file_path):
            os.remove(markdown_file_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating markdown file: {str(e)}",
        )

# ============ Webhosting ============

# Serve the React app
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    requested_file = os.path.join(dist_dir, full_path)

    if os.path.exists(requested_file) and os.path.isfile(requested_file):
        return FileResponse(requested_file)

    index_file = os.path.join(dist_dir, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)

    return {"error": "index.html not found"}

# ============ Run App ============

if __name__ == "__main__":
    cert_path, key_path = generate_self_signed_cert()
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=443,
        log_level="debug",
        reload=True,
        ssl_keyfile=key_path,
        ssl_certfile=cert_path,
    )