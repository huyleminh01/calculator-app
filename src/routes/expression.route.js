import express from "express";
import { asyncRouteHandler } from "../common/middlewares";
import { calculateExpression } from "../controllers";

export const expressionRouter = express.Router();

expressionRouter.post("/calculation", asyncRouteHandler(calculateExpression));
