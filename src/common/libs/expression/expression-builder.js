import { Expression } from "./expression";
import { ExpressionParser } from "./expression-parser";

export class ExpressionBuilder {
    #expression;
    /**
     * @param {string} expression
     */
    constructor(expression) {
        this.#expression = expression;
    }

    build() {
        const parser = new ExpressionParser(this.#expression);
        const tokenArray = parser.parse();
        return new Expression(tokenArray);
    }
}
