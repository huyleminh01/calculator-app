import fs from "fs";
import path from "path";
import * as winston from "winston";
import "winston-daily-rotate-file";
import { APP_CONFIG } from "../../../infrastructure/configs";

/**
 * @description Example:   Logger.debug ("debug", "error", ["debug 3"], {key: "value"}, "and many parameters")
 */
const formatFunction = winston.format.printf(({ level, timestamp, ms, message, ...rest }) => {
    const timestampString = new Date(timestamp).toLocaleString();

    const args = rest[Symbol.for("splat")] || [];
    const outMessage = [message, ...args].map(JSON.stringify).join(" ");

    return `[${timestampString}] : [${level}] : ${outMessage} ${ms}`;
});

const format = winston.format.combine(winston.format.timestamp(), winston.format.ms(), formatFunction);

// Base on config, we'll indicate the destination that the logger will write to: console or file system or somewhere
const logTransports = [];

if (APP_CONFIG.logDriver.includes("file")) {
    const logDirectory = path.join(__dirname, "../../../logs");
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    const FileTransport = new winston.transports.DailyRotateFile({
        filename: "log-%DATE%",
        extension: ".log",
        dirname: logDirectory,
        datePattern: "YYYY-MM-DD",
        maxSize: "20m",
        maxFiles: "7d",
    });
    logTransports.push(FileTransport);
}

if (APP_CONFIG.logDriver.includes("console")) {
    const ConsoleTransport = new winston.transports.Console();
    logTransports.push(ConsoleTransport);
}

export const Logger = winston.createLogger({
    transports: logTransports,
    format,
    level: APP_CONFIG.logLevel,
});
