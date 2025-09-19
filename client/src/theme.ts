import { createTheme, rem, MantineColorsTuple } from '@mantine/core';

// Modern color palettes optimized for light/dark modes
const vibrantPrimary: MantineColorsTuple = [
  '#f0f4ff',
  '#e1e9fe', 
  '#c3d2fd',
  '#a5b8fc',
  '#879dfb',
  '#6c82fa',
  '#5568f9',
  '#4552e7',
  '#3b47d1',
  '#323cbb'
];

const softPrimary: MantineColorsTuple = [
  '#f6f7ff',
  '#eceef8',
  '#d5d9ec',
  '#bcc3df',
  '#a0aad4',
  '#8b97cc',
  '#7d8ac7',
  '#6a77b1',
  '#5e6aa0',
  '#505c8e'
];

const accentOrange: MantineColorsTuple = [
  '#fff4e6',
  '#ffe8cc',
  '#ffd09c',
  '#ffb366',
  '#ff9a3b',
  '#ff8520',
  '#ff7a0f',
  '#e36602',
  '#ca5800',
  '#b04900'
];

const accentPink: MantineColorsTuple = [
  '#fff0f6',
  '#ffdeeb',
  '#fcc2d7',
  '#faa2c1',
  '#f783ac',
  '#f06595',
  '#e64980',
  '#d6336c',
  '#c2255c',
  '#a61e4d'
];

const successGreen: MantineColorsTuple = [
  '#ebfbee',
  '#d3f9d8',
  '#b2f2bb',
  '#8ce99a',
  '#69db7c',
  '#51cf66',
  '#40c057',
  '#37b24d',
  '#2f9e44',
  '#2b8a3e'
];

export const theme = createTheme({
  primaryColor: 'primary',
  defaultRadius: 'md',
  
  colors: {
    primary: vibrantPrimary,
    soft: softPrimary,
    accent: accentOrange,
    pink: accentPink,
    success: successGreen,
  },

  white: '#ffffff',
  black: '#1a1b1e',

  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',

  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: rem(32), lineHeight: '1.2', fontWeight: '800' },
      h2: { fontSize: rem(24), lineHeight: '1.25', fontWeight: '700' },
      h3: { fontSize: rem(20), lineHeight: '1.3', fontWeight: '600' },
      h4: { fontSize: rem(18), lineHeight: '1.35', fontWeight: '600' },
      h5: { fontSize: rem(16), lineHeight: '1.4', fontWeight: '500' },
      h6: { fontSize: rem(14), lineHeight: '1.45', fontWeight: '500' },
    },
  },

  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },

  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },

  other: {
    // Custom properties for light/dark mode adaptation
    cardBg: 'light-dark(#ffffff, #25262b)',
    surfaceBg: 'light-dark(#f8f9fa, #1a1b1e)',
    borderColor: 'light-dark(#e9ecef, #373a40)',
    textPrimary: 'light-dark(#212529, #f8f9fa)',
    textSecondary: 'light-dark(#6c757d, #adb5bd)',
    textMuted: 'light-dark(#868e96, #6c7583)',
    
    // Dynamic accent colors for eye-strain reduction
    accentPrimary: 'light-dark(var(--mantine-color-primary-6), var(--mantine-color-soft-6))',
    accentSecondary: 'light-dark(var(--mantine-color-accent-5), var(--mantine-color-accent-7))',
    accentSuccess: 'light-dark(var(--mantine-color-success-6), var(--mantine-color-success-7))',
  },

  components: {
    Container: {
      defaultProps: {
        size: 'lg',
      },
    },
    
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'lg',
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: 'var(--mantine-shadow-md)',
          },
        },
      },
    },

    Button: {
      defaultProps: {
        variant: 'filled',
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },

    Paper: {
      defaultProps: {
        shadow: 'xs',
        radius: 'md',
      },
      styles: {
        root: {
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        },
      },
    },

    Text: {
      styles: {
        root: {
          color: 'var(--text-primary)',
        },
      },
    },

    Title: {
      styles: {
        root: {
          color: 'var(--text-primary)',
        },
      },
    },
  },
});
