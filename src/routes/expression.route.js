import express from "express";
import {
    asyncRouteHandler,
    optionalTokenAuthMiddleware,
    tokenAuthMiddleware,
    verifyUserAccessMiddleware,
} from "../common/middlewares";
import { calculateExpression, clearExpressionHistory, viewExpressionHistory } from "../controllers";

export const expressionRouter = express.Router();

expressionRouter.post(
    "/calculation",
    optionalTokenAuthMiddleware,
    verifyUserAccessMiddleware,
    asyncRouteHandler(calculateExpression),
);

expressionRouter.get(
    "/history",
    tokenAuthMiddleware,
    verifyUserAccessMiddleware,
    asyncRouteHandler(viewExpressionHistory),
);

expressionRouter.delete(
    "/history/all",
    tokenAuthMiddleware,
    verifyUserAccessMiddleware,
    asyncRouteHandler(clearExpressionHistory),
);
