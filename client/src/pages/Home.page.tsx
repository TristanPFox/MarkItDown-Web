import { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Button,
  Stack,
  Box,
  rem,
  Grid,
  Center,
  Transition,
  Badge,
  ThemeIcon,
  SimpleGrid,
  Divider,
  ActionIcon,
  Tooltip,
  ScrollArea,
} from '@mantine/core';
import {
  IconDownload,
  IconFileText,
  IconSparkles,
  IconCheck,
  IconFileDescription,
  IconMarkdown,
  IconPresentation,
  IconTable,
  IconRefresh,
  IconEye,
  IconArrowRight,
} from '@tabler/icons-react';
import { DropzoneButton } from '../components/DropzoneButton/DropzoneButton';
import { ActionToggle } from '../components/ActionToggle/ActionToggle';
import { downloadFile } from '../services/fileUpload';

interface ConvertedFile {
  filename: string;
  blob: Blob;
  convertedAt: Date;
  originalSize: number;
  markdownContent?: string;
}

export function HomePage() {
  const [convertedFile, setConvertedFile] = useState<ConvertedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileConverted = async (blob: Blob, filename: string) => {
    const text = await blob.text();
    setConvertedFile({
      filename,
      blob,
      convertedAt: new Date(),
      originalSize: blob.size,
      markdownContent: text,
    });
  };

  const handleDownload = () => {
    if (convertedFile) {
      downloadFile(convertedFile.blob, convertedFile.filename);
    }
  };

  const handleNewConversion = () => {
    setConvertedFile(null);
  };

  const supportedFormats = [
    {
      icon: IconFileDescription,
      title: 'Word',
      description: 'Microsoft Word (.docx)',
      color: 'blue'
    },
    {
      icon: IconTable,
      title: 'Excel',
      description: 'Spreadsheets (.xlsx, .xls)',
      color: 'green'
    },
    {
      icon: IconPresentation,
      title: 'PowerPoint',
      description: 'Presentations (.pptx)',
      color: 'orange'
    },
    {
      icon: IconFileText,
      title: 'PDF',
      description: 'Portable Document Format (.pdf)',
      color: 'red'
    },
    {
      icon: IconMarkdown,
      title: 'Markdown',
      description: 'Plain text format (.md)',
      color: 'dark'
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        py={rem(80)}
        style={{
          background: 'linear-gradient(135deg, light-dark(#e8f2ff, #1a1b3a) 0%, light-dark(#fce7f3, #3d1a47) 50%, light-dark(#f0f4ff, #2a1d3f) 100%)',
          borderBottom: '1px solid light-dark(#e9ecef, #373a40)',
        }}
      >
        <Container>
          <Group justify="space-between" align="flex-start" mb="xl">
            <Box />
            <ActionToggle />
          </Group>

          <Center>
            <Stack gap="xl" align="center" maw={800}>
              <Group gap="sm" justify="center">
                <ThemeIcon
                  size={rem(48)}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: 'primary.6', to: 'accent.5' }}
                >
                  <IconSparkles size={rem(24)} />
                </ThemeIcon>
                <Title
                  order={1}
                  size={rem(48)}
                  fw={800}
                  ta="center"
                  style={{
                    background: 'linear-gradient(45deg, var(--mantine-color-primary-6), var(--mantine-color-accent-5))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  MarkItDown Web
                </Title>
              </Group>

              <Text size="xl" ta="center" c="dimmed" maw={600} lh={1.6}>
                Transform any document into clean, readable Markdown instantly.
                Drag, drop, and convert. It's that simple!
              </Text>

              <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="md" mt="md">
                {supportedFormats.map((format, index) => {
                  const items = [];

                  // Add the format card
                  items.push(
                    <Tooltip key={index} label={format.description} position="bottom">
                      <Card
                        p="sm"
                        radius="md"
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          borderColor: `var(--mantine-color-${format.color}-3)`,
                        }}
                      >
                        <Center>
                          <Stack gap={4} align="center">
                            <ThemeIcon
                              size={32}
                              radius="md"
                              variant="light"
                              color={format.color}
                            >
                              <format.icon size={rem(16)} />
                            </ThemeIcon>
                            <Text size="xs" fw={500} ta="center">{format.title}</Text>
                          </Stack>
                        </Center>
                      </Card>
                    </Tooltip>
                  );

                  // Add arrow icon between PDF (index 3) and Markdown (index 4)
                  if (index === 3) {
                    items.push(
                      <Center key="arrow">
                        <ThemeIcon
                          size={48}
                          radius={100}
                          variant="gradient"
                          style={{
                            background: 'linear-gradient(45deg, #ff6b6b 20%, #ffd93d 35%, #74c0fc 50%, #6bcf7f 65%, #da77f2 80%)',
                          }}
                        >
                          <IconArrowRight size={32} />
                        </ThemeIcon>
                      </Center>
                    );
                  }

                  return items;
                }).flat()}
              </SimpleGrid>
            </Stack>
          </Center>
        </Container>
      </Box>

      {/* Main Content */}
      <Container py="xl">
        <Center>
          <Box maw={800} w="100%">
            {!convertedFile ? (
              /* Upload Section */
              <Card p="xl" radius="lg" withBorder>
                <Stack gap="lg">
                  <Group gap="sm" justify="center">
                    <ThemeIcon size={32} radius="md" variant="light" color="primary">
                      <IconFileText size={18} />
                    </ThemeIcon>
                    <Title order={2} size="h3" fw={600}>Upload Document</Title>
                  </Group>

                  <DropzoneButton
                    onFileConverted={handleFileConverted}
                    onUploadStart={() => setIsUploading(true)}
                    onUploadEnd={() => setIsUploading(false)}
                  />

                  {isUploading && (
                    <Card p="md" bg="primary.0" withBorder={false} radius="md">
                      <Group gap="sm" justify="center">
                        <ThemeIcon size="sm" variant="light" color="primary">
                          <IconSparkles size={rem(12)} />
                        </ThemeIcon>
                        <Text size="sm" fw={500} c="primary">
                          Converting your document...
                        </Text>
                      </Group>
                    </Card>
                  )}
                </Stack>
              </Card>
            ) : (
              /* Results Section */
              <Transition mounted={!!convertedFile} transition="slide-up" duration={400}>
                {(styles) => (
                  <Card p="xl" radius="lg" withBorder style={styles}>
                    <Stack gap="lg">
                      <Group gap="sm" justify="center">
                        <ThemeIcon size={32} radius="md" variant="light" color="success">
                          <IconMarkdown size={rem(18)} />
                        </ThemeIcon>
                        <Title order={2} size="h3" fw={600}>Converted Markdown</Title>
                      </Group>

                      {/* File Info */}
                      <Card p="lg" bg="success.0" withBorder={false} radius="md">
                        <Stack gap="sm">
                          <Group gap="sm">
                            <ThemeIcon size="md" variant="light" color="success" radius="md">
                              <IconCheck size={16} />
                            </ThemeIcon>
                            <Box flex={1}>
                              <Text fw={600} size="md" truncate>{convertedFile.filename}</Text>
                              <Text size="sm" c="dimmed">
                                Converted on {convertedFile.convertedAt.toLocaleDateString()} at{' '}
                                {convertedFile.convertedAt.toLocaleTimeString()} • {' '}
                                {(convertedFile.originalSize / 1024).toFixed(1)} KB
                              </Text>
                            </Box>
                          </Group>

                          <Button
                            variant="filled"
                            color="success"
                            size="sm"
                            fullWidth
                            mt="sm"
                            leftSection={<IconDownload size={16} />}
                            onClick={handleDownload}
                            radius="md"
                          >
                            Download Markdown File
                          </Button>
                        </Stack>
                      </Card>

                      <Divider
                        label={
                          <Group gap="xs">
                            <IconMarkdown size={28} />
                            <Text size="sm" fw={500}>Preview</Text>
                          </Group>
                        }
                        labelPosition="center"
                      />

                      {/* Preview */}
                      <Card
                        p="lg"
                        bg="light-dark(#f8f9fa, #1a1b1e)"
                        withBorder
                        radius="md"
                        style={{ border: '1px solid light-dark(#e9ecef, #373a40)' }}
                      >
                        <ScrollArea h={320} type="auto">
                          <Text
                            size="sm"
                            ff="monospace"
                            lh={1.6}
                            style={{
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                              color: 'light-dark(#495057, #ced4da)',
                              letterSpacing: '0.02em',
                            }}
                          >
                            {convertedFile.markdownContent?.substring(0, 2000)}
                            {convertedFile.markdownContent && convertedFile.markdownContent.length > 2000 && (
                              <Text c="dimmed" fs="italic" size="xs" mt="md" style={{ fontFamily: 'var(--mantine-font-family)' }}>
                                ... (showing first 2,000 characters - download to see full content)
                              </Text>
                            )}
                          </Text>
                        </ScrollArea>
                      </Card>

                      <Group justify="center" mt="md">
                        <Button
                          variant="outline"
                          onClick={handleNewConversion}
                          leftSection={<IconRefresh size={16} />}
                          size="md"
                          radius="md"
                          color="primary"
                          style={{
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Convert Another File
                        </Button>
                      </Group>
                    </Stack>
                  </Card>
                )}
              </Transition>
            )}
          </Box>
        </Center>
      </Container>

      {/* Footer */}
      <Box py="xl" style={{ borderTop: '1px solid light-dark(#e9ecef, #373a40)' }}>
        <Container>
          <Center>
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Powered by
              </Text>
              <Badge
                variant="light"
                color="primary"
                size="sm"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => window.open('https://github.com/microsoft/markitdown', '_blank', 'noopener,noreferrer')}
              >
                MarkItDown
              </Badge>
              <Text size="sm" c="dimmed">
                 WebUI by
              </Text>
              <Badge
                variant="light"
                color="accent"
                size="sm"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => window.open('https://github.com/TristanPFox', '_blank', 'noopener,noreferrer')}
              >
                TristanPFox
              </Badge>
            </Group>
          </Center>
        </Container>
      </Box>
    </Box>
  );
}
