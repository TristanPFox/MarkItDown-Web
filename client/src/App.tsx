import '@mantine/core/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.css';

import { MantineProvider, ColorSchemeScript, useComputedColorScheme } from '@mantine/core';
import { ToastContainer, Bounce } from 'react-toastify';
import { Router } from './Router';
import { theme } from './theme';

function ToastProvider() {
  const computedColorScheme = useComputedColorScheme('light');

  return (
    <ToastContainer
      position="top-right"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={computedColorScheme}
      transition={Bounce}
    />
  );
}

export default function App() {
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Router />
        <ToastProvider />
      </MantineProvider>
    </>
  );
}
