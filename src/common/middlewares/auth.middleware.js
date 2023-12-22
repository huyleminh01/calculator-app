import { UnauthorizedException } from "../exceptions";
import { TOKEN_CONFIG } from "../../infrastructure/configs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../infrastructure/database/models";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function tokenAuthMiddleware(req, res, next) {
    const authorization = req.headers.authorization || "";

    // Authorization: <scheme> <token>
    const [tokenScheme, token] = authorization.split(" ");

    // Validate bearer token strategy
    if (!tokenScheme || tokenScheme !== TOKEN_CONFIG.tokenScheme) {
        next(new UnauthorizedException("Token scheme is not supported"));
        return;
    }

    jwt.verify(token, TOKEN_CONFIG.secret, {}, (errors, payload) => {
        if (errors) {
            next(new UnauthorizedException("Invalid access token"));
            return;
        }

        req.user = {
            userIdentifier: payload.userId,
        };

        req.userType = "user";

        next();
    });
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function optionalTokenAuthMiddleware(req, res, next) {
    const authorization = req.headers.authorization || "";

    // Asume that current user is anonymus
    if (!authorization) {
        req.userType = "anonymus";
        next();
        return;
    }

    return tokenAuthMiddleware(req, res, next);
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @description This function must be placed after the tokenAuthMiddleware
 * or any middlewares that validates user authentication and attaches user id to the request
 */
export async function verifyUserAccessMiddleware(req, res, next) {
    if (!req.userType) {
        next(new Error("Calling middleware at wrong position"));
    }

    if (req.userType === "anonymus") {
        next();
        return;
    }

    const { userIdentifier } = req.user;

    const user = await UserModel.findOne({ where: { identifier: userIdentifier } });
    if (!user) {
        next(new UnauthorizedException());
        return;
    }

    // Check user permission, role, etc.
    // Attach addition information to req.user
    req.user = {
        ...req.user,
        id: user.id,
    };
    next();
}
