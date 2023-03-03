import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import App from "./pages/App";
import theme from "./templates/theme";

const createEmotionCache = () => createCache({ key: 'css' });
const cache = createEmotionCache();

const Main = () => (
  <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App {...JSON.parse(window.atob(window.__my_little_pony__))} />
    </ThemeProvider>
  </CacheProvider>
);

hydrateRoot(document.getElementById("root"), <Main />);

console.log("Hydrate Enabled");
