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
    connectionString: process.env.DB_URL || ""
}
