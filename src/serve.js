import express from "express";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";

import App from "./pages/App";
import theme from "./templates/theme";
import headerConfig from "./templates/header";
import tableSchemas from "./templates/board";
import { readAllJsonFromFolder, readTextFile } from "./server/read";
import createEmotionCache from "./server/cache";

const JSON_RESULT_FOLDER = "./page_result";
const INFO_MARKDOWN = "./src/templates/info.md";

const renderFull = (title, html, css, data) => `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        ${css}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <script>window.__my_little_pony__='${Buffer.from(JSON.stringify(data)).toString("base64")}'</script>
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;

const handleRender = async (req, res) => {
    console.log(`request [${new Date().getTime()}] -> `);
    const { pageName, ...rest } = headerConfig;

    const resultData = await readAllJsonFromFolder(JSON_RESULT_FOLDER);
    const detail = await readTextFile(INFO_MARKDOWN);

    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =		createEmotionServer(cache);

    const packed = {
        header: rest, detail, schemas: tableSchemas, data: resultData,
    };
    const html = ReactDOMServer.renderToString(
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App {...packed} />
            </ThemeProvider>
        </CacheProvider>,
    );

    const emotionChunks = extractCriticalToChunks(html);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    res.send(renderFull(pageName, html, emotionCss, packed));
    console.log(`   send [${new Date().getTime()}] <- `);
};

const app = express();

app.use("/build", express.static("build"));

app.use(handleRender);

const port = 3000;
app.listen(port);
