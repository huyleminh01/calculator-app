import * as dotenv from "dotenv";
dotenv.config();

export const APP_CONFIG = {
    appPort: process.env.PORT ? +process.env.PORT : 5001,
    logLevel: process.env.LOG_LEVEL || "debug",
    logDriver: process.env.LOG_DRIVER || "console",

    origin: process.env.ORIGIN.split(" ") || "*",
    credential: Boolean(process.env.CREDENTIAL).valueOf(),
};

export const DB_CONFIG = {
    host: process.env.DB_HOST || "",
    port: process.env.DB_PORT ? +process.env.DB_PORT : 0,
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME || "",
};

export const TOKEN_CONFIG = {
    secret: process.env.TOKEN_SECRET || "",
    expiresTime: process.env.TOKEN_EXP ? +process.env.TOKEN_EXP : 0,
};
