import express from "express";
import { readFileSync } from "fs";
import path from "path";
import * as SwaggerUi from "swagger-ui-express";
import { parse } from "yaml";
import { APP_CONFIG } from "../infrastructure/configs";

export const apiDocRouter = express.Router();

const swaggerYaml = readFileSync(path.join(__dirname, "../../swagger.yml"), "utf8");
const swaggerDoc = parse(swaggerYaml);

apiDocRouter.use((req, res, next) => {
    swaggerDoc.servers[0].url = APP_CONFIG.appUrl;
    req.swaggerDoc = swaggerDoc;
    next();
}, SwaggerUi.serve);

apiDocRouter.get("/swagger.json", (_, res) => {
    res.json(swaggerDoc);
});

apiDocRouter.get(
    "/",
    SwaggerUi.setup(null, {
        explorer: true,
        swaggerOptions: {
            urls: [
                {
                    url: `${APP_CONFIG.appUrl}/api-doc/swagger.json`,
                    name: "Calculator API",
                },
            ],
        },
        customSiteTitle: "API Specs - Calculator API",
        // customfavIcon: "/public/icons/favicon-32x32.png",
    }),
);
