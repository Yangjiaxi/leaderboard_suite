import logger from "./logger";

const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS, GET, PUT, PATCH, DELETE",
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    next();
};

const infoLogger = (req, res, next) => {
    const ip = req.get("X-Real-IP") || req.ip;
    logger.info(`[${ip}] [${req.method}] ${req.url} `);
    next();
};

export { cors, infoLogger };
