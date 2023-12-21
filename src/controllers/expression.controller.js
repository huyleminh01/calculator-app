import { HTTP_CODE } from "../common/constants/response-code.const";
import { ExpressionBuilder } from "../common/libs/expression";
import { ResponseBuilder } from "../common/utils/builders/response.builder";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export function calculateExpression(req, res) {
    const { body } = req;

    const { expression } = body;

    const result = new ExpressionBuilder(expression).build().calculate();

    res.json(new ResponseBuilder().withCode(HTTP_CODE.created).withData(result).build());
}
