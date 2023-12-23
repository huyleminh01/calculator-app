import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestException, UnauthorizedException } from "../common/exceptions";
import { ResponseBuilder } from "../common/utils/builders/response.builder";
import { TOKEN_CONFIG } from "../infrastructure/configs";
import { UserModel } from "../infrastructure/database/models";

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
        throw new BadRequestException("The username format is invalid");
    }

    if (!password || !password.trim() || !PASSWORD_REGEX.test(password)) {
        throw new BadRequestException("The password format is invalid");
    }

    const user = await UserModel.findOne({ where: { username } });

    const badRequestException = new BadRequestException("Invalid username or password");
    if (!user) {
        throw badRequestException;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        throw badRequestException;
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
