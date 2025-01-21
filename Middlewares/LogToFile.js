import { appendFile } from "fs/promises";
export const logToFileMiddleware = (req, res, next) => {
    appendFile("log.txt", `${req.method} ${req.url}\n`);
    next();
};
