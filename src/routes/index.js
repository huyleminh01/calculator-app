import express from "express";
import { ResponseBuilder } from "../common/utils/builders/response.builder";

export const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
    res.json(new ResponseBuilder().withData({ name: "Calculator API", version: "v1" }).build());
});

export * from "./expression.route";
