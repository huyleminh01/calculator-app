import { TOKEN_TYPE } from "./common/constanst";
import { ExpressionException } from "./expression.exception";

export class ExpressionParser {
    #expression;
    /**
     *
     * @param {string} expression
     */
    constructor(expression) {
        if (!expression || !expression.trim()) {
            throw new ExpressionException("Syntax error", "Empty expression");
        }

        this.#expression = expression.trim();
    }

    /**
     * @returns {{ value: string, type: TOKEN_TYPE }[]}
     */
    parse() {
        this.#cleanExpression();

        const tokenArray = [];

        let currentToken = "";

        for (let i = 0; i < this.#expression.length; ++i) {
            const character = this.#expression[i];

            if (this.#isOperator(character)) {
                tokenArray.push({ value: currentToken, type: TOKEN_TYPE.OPERAND });
                currentToken = "";

                tokenArray.push({ value: character, type: TOKEN_TYPE.OPERATOR });
                continue;
            }

            currentToken = currentToken.concat(character);

            if (i === this.#expression.length - 1) {
                tokenArray.push({ value: currentToken, type: TOKEN_TYPE.OPERAND });
            }
        }

        return tokenArray;
    }

    #cleanExpression() {
        const syntaxErrorExp = new ExpressionException("Syntax error");

        // Define valid characters
        // const validCharacterRegex = /^[\d\+\-*\/() ]+$/;
        // const validCharacterRegex = /^[\d\+\-*\/()]+$/;
        // current solution: allow number and base operator only
        const validCharacterRegex = /^[\d\+\-*\/]+$/;

        if (!validCharacterRegex.test(this.#expression)) {
            syntaxErrorExp.details = "Unexpected characters";
            throw syntaxErrorExp;
        }

        // Disable invalid operator: ++, ++++++, +*-/, etc.
        if (/[\+\-*\/]{2,}|[\+\-*\/]$/.test(this.#expression)) {
            throw syntaxErrorExp;
        }

        let sanitizedExpression = this.#expression;
        if (/^[\+\-*\/]/.test(this.#expression)) {
            sanitizedExpression = `0${sanitizedExpression}`;
        }

        this.#expression = sanitizedExpression;
    }

    #isOperator(character) {
        return /[\+\-*\/]/.test(character);
    }
}
