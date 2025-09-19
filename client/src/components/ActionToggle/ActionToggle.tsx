import { IconMoon, IconSun } from '@tabler/icons-react';
import { ActionIcon, Group, useComputedColorScheme, useMantineColorScheme, Tooltip, rem } from '@mantine/core';

export function ActionToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const labelText = computedColorScheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

  return (
    <Group justify="center">
      <Tooltip label={labelText} openDelay={300} position="bottom">
        <ActionIcon
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          variant="light"
          color={computedColorScheme === 'light' ? 'primary' : 'orange'}
          size="lg"
          radius="md"
          aria-label="Toggle color scheme"
          style={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          }}
        >
          {computedColorScheme === 'light' ? (
            <IconMoon size={28} stroke={1.5} />
          ) : (
            <IconSun size={28} stroke={1.5} style={{ color: '#fd7e14' }} />
          )}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
