# MarkItDown Web

A modern web interface for Microsoft's MarkItDown document conversion library. Transform any document into clean, readable Markdown through an intuitive drag-and-drop interface.

## Overview

MarkItDown Web provides a user-friendly frontend for the powerful MarkItDown library, enabling seamless conversion of various document formats to Markdown. The application features a clean, responsive design with real-time conversion and preview capabilities.

## Tech Stack

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![uv](https://img.shields.io/badge/uv-purple?style=for-the-badge&logo=uv&logoColor=%23DE5FE9) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=black) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Mantine](https://img.shields.io/badge/Mantine-ffffff?style=for-the-badge&logo=Mantine&logoColor=339af0) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![npm](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## Features

- **Multiple Format Support**: Convert Word documents (.docx), Excel spreadsheets (.xlsx, .xls), PowerPoint presentations (.pptx), PDFs, and existing Markdown files
- **Drag-and-Drop Interface**: Simple file upload through an intuitive dropzone component
- **Real-Time Preview**: View converted Markdown content immediately after processing
- **Secure Processing**: Files are processed server-side with automatic cleanup after conversion
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Theme**: Toggle between color schemes for comfortable viewing
- **Fast Conversion**: Efficient processing with immediate download availability

## Architecture

The application consists of two main components:

### Frontend (React + Vite)
- Built with React 18 and TypeScript
- Mantine UI component library for consistent design
- Vite for fast development and optimized builds
- Responsive layout with modern CSS features

### Backend (FastAPI + Python)
- FastAPI framework for high-performance API endpoints
- Microsoft MarkItDown library for document conversion
- Automatic file cleanup using background tasks
- CORS support for cross-origin requests

## Quick Start with Docker

The easiest way to run MarkItDown Web is using Docker. The application is available as a pre-built container image.

### Docker Compose

Create a `compose.yml` file:

```yaml
version: '3.8'

services:
  markitdown-web:
    image: ghcr.io/tristanpfox/markitdown-web:latest
    ports:
      - "443:443"
    environment:
      - FRONTEND_IP=https://localhost:443
    restart: unless-stopped
```

Start the application:

```bash
docker compose up -d
```

The application will be available at `https://localhost:443`.

### Docker Run

Alternatively, run the container directly:

```bash
docker run -d \
  --name markitdown-web \
  -p 443:443 \
  -e FRONTEND_IP=https://localhost:443 \
  --restart unless-stopped \
  ghcr.io/tristanpfox/markitdown-web:latest
```

## Development Setup

### Prerequisites

- Node.js 18+ and npm (for frontend)
- Python 3.8+ and uv (for backend)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tristanpfox/markitdown-web.git
cd MarkItDown-Web
```

2. Set up the frontend:
```bash
cd client
npm i
```

3. Create a `.env` file in the client directory and insert:
```bash
VITE_API_TARGET="https://localhost:443"
```

4. Set up the backend:
```bash
cd server
uv sync
```

### Running in Development

1. Start the backend server:
```bash
cd server
uv run python app.py
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173` and will proxy API requests to the backend at `https://localhost:443`.

## API Documentation

### Endpoints

#### POST /api/convert
Converts an uploaded file to Markdown format.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: File upload

**Response:**
- Content-Type: application/octet-stream
- Body: Converted Markdown file

**Example:**
```bash
curl -X POST \
  -F "file=@document.docx" \
  https://localhost:443/api/convert \
  --output converted.md
```

## Supported File Formats

| Format | Extensions | Description |
|--------|------------|-------------|
| Microsoft Word | .docx | Word documents with formatting preservation |
| Microsoft Excel | .xlsx, .xls | Spreadsheets converted to Markdown tables |
| Microsoft PowerPoint | .pptx | Presentations with slide content extraction |
| PDF | .pdf | Portable Document Format with text extraction |
| Markdown | .md | Existing Markdown files for processing |

## Configuration

### Environment Variables

The application supports the following environment variables in the `server/.env` file:

- `FRONTEND_IP`: This is required by CORS. (example: https://myproject.com)

## Building for Production

### Frontend Build

```bash
cd client
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [Microsoft MarkItDown](https://github.com/microsoft/markitdown) for the core conversion functionality
- [Mantine](https://mantine.dev/) for the React component library
- [FastAPI](https://fastapi.tiangolo.com/) for the Python web framework
- [uv](https://github.com/astral-sh/uv) for fast Python package management

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/TristanPFox/MarkItDown-Web).