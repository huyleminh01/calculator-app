import { TOKEN_TYPE, Stack, OPERATOR_PRECEDENCE } from "./common";
import { ExpressionException } from "./expression.exception";

export class Expression {
    #tokenArray;

    /**
     * @param {{ value: string, type: TOKEN_TYPE }[]} tokenArray
     */
    constructor(tokenArray = []) {
        this.#tokenArray = tokenArray;
    }

    /**
     * @returns BigInt
     */
    calculate() {
        // convert to RPN form
        const rpnForm = this.#constructRPN();
        // calculate RPN form
        const result = this.#calculateRPN(rpnForm);
        return result;
    }

    /**
     * @returns string
     */
    toString() {
        return this.#tokenArray.join(" ");
    }

    /**
     * @description Create an array of elements that represent Reverse Polish Notiation
     */
    #constructRPN() {
        const result = [];
        const stack = new Stack();

        for (let token of this.#tokenArray) {
            if (token.type === TOKEN_TYPE.OPERAND) {
                result.push(token);
                continue;
            }

            if (token.type === TOKEN_TYPE.OPERATOR) {
                // check operator precedence
                while (!stack.isEmpty()) {
                    const topElement = stack.top();
                    const topValue = topElement.value;

                    if (OPERATOR_PRECEDENCE[topValue] < OPERATOR_PRECEDENCE[token.value]) {
                        break;
                    }

                    result.push(topElement);
                    stack.pop();
                }

                stack.push(token);
            }
        }

        while (!stack.isEmpty()) {
            result.push(stack.top());
            stack.pop();
        }

        return result;
    }

    /**
     * @param {{ value: string, type: TOKEN_TYPE }[]} rpnItems
     */
    #calculateRPN(rpnItems) {
        const stack = new Stack();

        for (let item of rpnItems) {
            if (item.type === TOKEN_TYPE.OPERAND) {
                stack.push(BigInt(item.value));
                continue;
            }

            if (item.type === TOKEN_TYPE.OPERATOR) {
                const secondOperand = stack.top();
                stack.pop();
                const firstOperand = stack.top();
                stack.pop();

                let result;
                switch (item.value) {
                    case "+":
                        result = firstOperand + secondOperand;
                        break;
                    case "-":
                        result = firstOperand - secondOperand;
                        break;
                    case "*":
                        result = firstOperand * secondOperand;
                        break;
                    case "/":
                        result = firstOperand / secondOperand;
                        break;
                    default:
                        throw new ExpressionException(`Unexpected operator ${item.value}`);
                }
                stack.push(result);
            }
        }

        return stack.top().toString();
    }
}
