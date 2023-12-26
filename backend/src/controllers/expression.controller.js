import { PAGINATION } from "../common/constants/common";
import { HTTP_CODE } from "../common/constants/response-code.const";
import { ExpressionBuilder } from "../common/libs/expression";
import { ResponseBuilder } from "../common/utils/builders/response.builder";
import { Logger } from "../common/utils/loggers";
import { ExpressionModel } from "../infrastructure/database/models";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function calculateExpression(req, res) {
    const { body, user = {} } = req;
    const userExpression = body.expression || "";

    const expression = new ExpressionBuilder(userExpression).build();
    const result = expression.calculate();

    res.json(
        new ResponseBuilder().withCode(HTTP_CODE.ok).withData({ result, expression: expression.toString() }).build(),
    );

    if (user.id) {
        ExpressionModel.create({ result, expression: expression.toString(), userId: user.id })
            .then()
            .catch((error) => Logger.error("----Save calculation history error:", error.message || error));
    }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function viewExpressionHistory(req, res) {
    const { id: userId } = req.user;

    let { page, limit } = req.query;

    page = parseInt(page);
    if (isNaN(page)) {
        page = PAGINATION.page;
    }

    limit = parseInt(limit);
    if (isNaN(limit)) {
        limit = PAGINATION.defaultPageSize;
    }

    const offset = limit * (page - 1);

    const { count, rows } = await ExpressionModel.findAndCountAll({
        where: { userId },
        limit,
        offset,
        order: [["created_at", "DESC"]],
        attributes: { exclude: ["id", "userId"] },
    });

    const items = rows.map((row) => row.toJSON());

    res.json(new ResponseBuilder().withData({ items, pagination: { page, limit, total: count } }).build());
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function clearExpressionHistory(req, res) {
    const { id: userId } = req.user;

    await ExpressionModel.destroy({ where: { userId } });

    res.json(new ResponseBuilder().withCode(HTTP_CODE.noContent).build());
}
