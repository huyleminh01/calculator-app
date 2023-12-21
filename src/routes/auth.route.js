import express from "express";
import { asyncRouteHandler } from "../common/middlewares";
import { loginByUsername } from "../controllers/auth";

export const authRouter = express.Router();

authRouter.post("/login", asyncRouteHandler(loginByUsername));
