import fs from "fs";

const pad = (number) => (number < 10 ? `0${number}` : number);

const getTimeString = () => {
    const event = new Date();
    return `${event.getFullYear()}-${pad(event.getMonth() + 1)}-${pad(
        event.getDate(),
    )} ${pad(event.getHours())}:${pad(event.getMinutes())}:${pad(
        event.getSeconds(),
    )}`;
};

let logInfo;
let logError;

if (process.env.NODE_ENV === "production") {
    if (!fs.existsSync("./logs")) fs.mkdirSync("./logs");
    logInfo = (msg) => fs.appendFile("./logs/stdout.log", `${msg}\n`, () => {});
    logError = (msg) => fs.appendFile("./logs/stderr.log", `${msg}\n`, () => {});
} else {
    logInfo = console.log;
    logError = console.error;
}

const logger = {
    info: (message) => {
        logInfo(`${getTimeString()} | [I] ${message}`);
    },
    error: (message) => {
        logError(`${getTimeString()} | [E] ${message}`);
    },
};

export default logger;
