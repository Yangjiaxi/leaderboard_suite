import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
      <App />
    </ThemeProvider>
  </CacheProvider>
);

ReactDOM.hydrate(<Main />, document)

