import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import express from "express";
import https from "https";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

import App from "./pages/App";

import htmlTemplate from "./server/htmlTemplate";
import createEmotionCache from "./server/cache";
import logger from "./server/logger";
import { cors, infoLogger } from "./server/middlewares";
import { readAllJsonFromFolder, readSync, readTextFile } from "./server/read";

import tableSchemas from "../templates/board";
import headerConfig from "../templates/header";
import theme from "../templates/theme";

const PORT = 3000;
const JSON_RESULT_FOLDER = "page_result";
const INFO_MARKDOWN = "./templates/info.md";

const handleRender = async (req, res) => {
    const { pageName, ...rest } = headerConfig;

    const resultData = await readAllJsonFromFolder(JSON_RESULT_FOLDER);
    const detail = await readTextFile(INFO_MARKDOWN);

    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

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

    res.send(htmlTemplate(pageName, html, emotionCss, packed));
};

const app = express();

app.use(cors);
app.use(infoLogger);

app.use("/build", express.static("build"));
app.use(handleRender);

if (process.env.NODE_ENV === "production") {
    const server = https.createServer({
        key: readSync("ssl/leaderboard.key"),
        cert: readSync("ssl/leaderboard.pem"),
    }, app);
    server.listen(PORT);
    logger.info(`HTTPS server started, listening at port ${PORT}`);
} else {
    app.listen(PORT);
    logger.info(`HTTP server started, listening at port ${PORT}`);
}
