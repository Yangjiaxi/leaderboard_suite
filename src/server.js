import express from "express";
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import { readFile } from "fs/promises";

import App from "./pages/App";
import theme from "./templates/theme";
import headerConfig from "./templates/header";


const createEmotionCache = () => createCache({ key: 'css' });

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

const handleRender = async (req, res) => {
  console.log(`request [${new Date().getTime()}] -> `);
  const { pageName, ...rest } = headerConfig;
  const detail = await readFile("./src/templates/info.md", "utf-8");

  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const html = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App header={rest} detail={detail} schema={null} data={null} />
      </ThemeProvider>
    </CacheProvider>,
  );

  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  res.send(renderFull(pageName, html, emotionCss));
  console.log(`   send [${new Date().getTime()}] <- `);

};

const app = express();

app.use('/build', express.static('build'));

app.use(handleRender);

const port = 3000;
app.listen(port);

