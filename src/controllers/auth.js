import { UnauthorizedException } from "../common/exceptions";
import { UserModel } from "../infrastructure/database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResponseBuilder } from "../common/utils/builders/response.builder";
import { TOKEN_CONFIG } from "../infrastructure/configs";

const USERNAME_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function loginByUsername(req, res) {
    const { body } = req;
    const { username, password } = body;

    if (!username || !username.trim() || !USERNAME_REGEX.test(username)) {
        throw new UnauthorizedException("The username format is invalid");
    }

    if (!password || !password.trim() || !PASSWORD_REGEX.test(password)) {
        throw new UnauthorizedException("The password format is invalid");
    }

    const user = await UserModel.findOne({ where: { username } });

    const unauthorizedException = new UnauthorizedException("Invalid username or password");
    if (!user) {
        throw unauthorizedException;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        throw unauthorizedException;
    }

    const token = jwt.sign(
        {
            userId: user.identifier,
        },
        TOKEN_CONFIG.secret,
        { expiresIn: TOKEN_CONFIG.expiresTime },
    );

    res.json(new ResponseBuilder().withData({ token }).build());
}
