from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Union, List, Dict


class MessageResponse(BaseModel):
    message: str


class NumberResponse(BaseModel):
    message: int


class FileDownloadResponse(BaseModel):
    filename: str
    content_type: str = "text/markdown"
    file_path: str
