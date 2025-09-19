import { useRef, useState } from 'react';
import { IconCloudUpload, IconDownload, IconX, IconFile, IconUpload } from '@tabler/icons-react';
import { Button, Group, Text, useMantineTheme, Loader, rem, Stack, ThemeIcon, Center } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { toast } from 'react-toastify';
import classes from './DropzoneButton.module.css';
import { uploadFileForConversion, ALLOWED_EXTENSIONS, validateFile } from '../../services/fileUpload';

interface DropzoneButtonProps {
  onFileConverted?: (blob: Blob, filename: string) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
}

export function DropzoneButton({ onFileConverted, onUploadStart, onUploadEnd }: DropzoneButtonProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileDrop = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0]; // Process only the first file

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      toast.error(validation.error || 'Invalid file');
      return;
    }

    setIsUploading(true);
    onUploadStart?.();

    try {
      toast.info(`Converting ${file.name}...`, { autoClose: false, toastId: 'converting' });

      const result = await uploadFileForConversion(file);

      if (result.success && result.data && result.filename) {
        toast.dismiss('converting');
        toast.success(`Successfully converted ${file.name} to Markdown!`);
        onFileConverted?.(result.data, result.filename);
      } else {
        toast.dismiss('converting');
        toast.error(result.error || 'Failed to convert file');
      }
    } catch (error) {
      toast.dismiss('converting');
      toast.error('An unexpected error occurred during conversion');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      onUploadEnd?.();
    }
  };

  const handleFileReject = (rejectedFiles: any[]) => {
    const file = rejectedFiles[0];
    if (file) {
      const errors = file.errors || [];
      const errorMessage = errors.length > 0
        ? errors[0].message
        : 'File was rejected';
      toast.error(errorMessage);
    }
  };

  // Create MIME types from allowed extensions
  const acceptedMimeTypes = [
    MIME_TYPES.pdf,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
    'text/markdown', // .md
  ];

  return (
    <Stack gap="md">
      <Dropzone
        openRef={openRef}
        onDrop={handleFileDrop}
        onReject={handleFileReject}
        radius="lg"
        accept={acceptedMimeTypes}
        maxSize={30 * 1024 * 1024} // 30MB
        maxFiles={1}
        disabled={isUploading}
        h={rem(200)}
        style={{
          border: `2px dashed light-dark(${theme.colors.gray[3]}, ${theme.colors.gray[6]})`,
          backgroundColor: 'light-dark(#f8f9fa, #25262b)',
          transition: 'all 0.2s ease',
          borderRadius: rem(12),
        }}
      >
        <Center h="100%">
          <Stack gap="lg" align="center" pt="md">
            <Dropzone.Accept>
              <ThemeIcon size={rem(48)} radius="xl" variant="light" color="success">
                <IconDownload size={rem(24)} />
              </ThemeIcon>
            </Dropzone.Accept>

            <Dropzone.Reject>
              <ThemeIcon size={rem(48)} radius="xl" variant="light" color="red">
                <IconX size={rem(24)} />
              </ThemeIcon>
            </Dropzone.Reject>

            <Dropzone.Idle>
              {isUploading ? (
                <ThemeIcon size={rem(48)} radius="xl" variant="light" color="primary">
                  <Loader size={rem(24)} />
                </ThemeIcon>
              ) : (
                <ThemeIcon size={rem(48)} radius="xl" variant="light" color="primary">
                  <IconCloudUpload size={rem(24)} />
                </ThemeIcon>
              )}
            </Dropzone.Idle>

            <Stack gap={4} align="center">
              <Text fw={600} size="lg" ta="center">
                <Dropzone.Accept>Drop your file here</Dropzone.Accept>
                <Dropzone.Reject>Invalid file type or size</Dropzone.Reject>
                <Dropzone.Idle>
                  {isUploading ? 'Converting document...' : 'Drop files here'}
                </Dropzone.Idle>
              </Text>

              <Text size="sm" c="dimmed" ta="center" maw={300}>
                <Dropzone.Accept>Release to start conversion</Dropzone.Accept>
                <Dropzone.Reject>
                  Please select a valid file type under 30MB
                </Dropzone.Reject>
                <Dropzone.Idle>
                  Supports: {ALLOWED_EXTENSIONS.join(', ')} • Max 30MB
                </Dropzone.Idle>
              </Text>
            </Stack>
          </Stack>
        </Center>
      </Dropzone>

      <Button
        onClick={() => openRef.current?.()}
        disabled={isUploading}
        leftSection={
          isUploading ? (
            <Loader size="sm" />
          ) : (
            <IconUpload size={16} />
          )
        }
        variant="filled"
        radius="md"
        size="md"
        fullWidth
        styles={{
          root: {
            background: 'linear-gradient(135deg, var(--mantine-color-primary-6) 0%, var(--mantine-color-accent-5) 100%)',
            border: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, var(--mantine-color-primary-7) 0%, var(--mantine-color-accent-6) 100%)',
            },
          },
          inner: {
            justifyContent: 'center',
          },
          label: {
            textAlign: 'center',
            fontWeight: 600,
          },
        }}
      >
        {isUploading ? 'Converting...' : 'Choose File'}
      </Button>
    </Stack>
  );
}