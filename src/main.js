import compression from "compression";
import cors from "cors";
import express from "express";
import http from "http";
import morgan from "morgan";
import { env } from "process";
import { NotFoundException } from "./common/exceptions";
import { errorHandler } from "./common/middlewares";
import { AccessLogStream, Logger } from "./common/utils/loggers";
import { APP_CONFIG } from "./infrastructure/configs";
import { sequelize } from "./infrastructure/database";
import { rootRouter } from "./routes";

env.TZ = "Asia/Ho_Chi_Minh";

const app = express();

app.use(compression({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_CONFIG.origin,
        credentials: APP_CONFIG.credential,
        allowedHeaders: "X-Requested-With, X-HTTP-Method-Override, X-Request-Id, Content-Type, Authorization, Accept",
        methods: "GET, POST, PUT, PATCH, DELETE",
    }),
);

app.use(morgan("combined", { stream: new AccessLogStream() }));

// handle API route here
app.use(rootRouter);

app.use(function (req, res, next) {
    throw new NotFoundException(`Can not ${req.method} ${req.path}`);
});

// error
app.use(errorHandler);

const PORT = APP_CONFIG.appPort;

const httpServer = http.createServer(app);

async function bootstrap() {
    try {
        await sequelize.authenticate();

        Logger.info("Database connection has been established successfully.");

        httpServer.listen(PORT, () => {
            Logger.info(`Server is listening on port:${PORT}`);
        });
    } catch (error) {
        Logger.error("Unable to connect to the database", error);
    }
}

bootstrap();
