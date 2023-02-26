import express from "express";
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';

import theme from "./templates/theme";
import App from "./pages/App";
import createEmotionCache from "./server/cache";

const renderFull = (title, html, css) => `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        ${css}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;

const handleRender = (req, res) => {
    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
        createEmotionServer(cache);

    const html = ReactDOMServer.renderToString(
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </CacheProvider>,
    );

    const emotionChunks = extractCriticalToChunks(html);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    res.send(renderFull(html, emotionCss));
};

const app = express();

app.use('/build', express.static('build'));

app.use(handleRender);

const port = 3000;
app.listen(port);

