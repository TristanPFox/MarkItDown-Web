import axios from 'axios';

export interface UploadResponse {
  success: boolean;
  data?: Blob;
  error?: string;
  filename?: string;
}

export const ALLOWED_EXTENSIONS = ['.pptx', '.docx', '.xlsx', '.xls', '.pdf', '.md'];

export const MIME_TYPES_MAP = {
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xls': 'application/vnd.ms-excel',
  '.md': 'text/markdown',
};

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
  
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      isValid: false,
      error: `Unsupported file type: ${extension}. Supported types are: ${ALLOWED_EXTENSIONS.join(', ')}`,
    };
  }

  // 30MB limit
  const maxSize = 30 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size exceeds 30MB limit. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
    };
  }

  return { isValid: true };
};

export const uploadFileForConversion = async (file: File): Promise<UploadResponse> => {
  try {
    // Validate file first
    const validation = validateFile(file);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    const formData = new FormData();
    formData.append('file', file);

    // Get the API base URL from config or environment
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
    
    const response = await axios.post(`${apiBaseUrl}/api/convert`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
      timeout: 60000,
      withCredentials: false,
    });

    // Get filename from response headers or generate one
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'converted.md';
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    } else {
      // Fallback: use original filename with .md extension
      const originalName = file.name.split('.').slice(0, -1).join('.');
      filename = `${originalName}.md`;
    }

    return {
      success: true,
      data: response.data,
      filename,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred during file conversion.';
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`;
        
        // Try to extract error message from response
        if (error.response.data instanceof Blob) {
          try {
            const text = await error.response.data.text();
            const errorData = JSON.parse(text);
            if (errorData.detail) {
              errorMessage = errorData.detail;
            }
          } catch {
            // Ignore parsing errors, use default message
          }
        }
      } else if (error.request) {
        // Network error - could be SSL certificate issue
        if (error.code === 'ERR_CERT_AUTHORITY_INVALID' || 
            error.message.includes('certificate') ||
            error.message.includes('SSL') ||
            error.message.includes('CERT')) {
          errorMessage = 'SSL Certificate Error: Please navigate to the server URL in your browser and accept the self-signed certificate, then try again.';
        } else {
          errorMessage = 'Network error: Unable to reach the server. Please check your connection.';
        }
      } else {
        // Request setup error
        errorMessage = `Request error: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};