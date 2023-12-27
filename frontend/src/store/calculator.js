import { HttpService } from "@/services/http-service";
import { toast } from "vue3-toastify";

const calculatorStore = {
    state() {
        return {
            expression: "",
            calculatedExpression: "",
            result: "",
            showHistory: false,
            expressionHistory: [],
        };
    },
    mutations: {
        closeHistoryModal(state) {
            state.showHistory = false;
        },
        showHistoryModal(state) {
            state.showHistory = true;
        },
        handleClear(state) {
            state.expression = "";
            state.result = "";
            state.calculatedExpression = "";
        },
        handleBackSpace(state) {
            state.expression = state.expression.slice(0, state.expression.length - 1);
        },
        handleTypeNumber(state, value) {
            if (state.result) {
                state.result = "";
                state.calculatedExpression = "";
            }
            state.expression += value;
        },
        handleTypeOperator(state, operator) {
            if (state.result) {
                state.expression = state.result;
                state.result = "";
                state.calculatedExpression = "";
            }

            state.expression = /[\+\-\*\/]/.test(state.lastKey)
                ? state.expression.slice(0, state.expression.length - 1).concat(operator)
                : state.expression.concat(operator);
        },
        updateExpressionFromHistory(state, { expression, result }) {
            state.result = result;
            state.calculatedExpression = expression;
            state.expression = "";

            // close history modal
            state.showHistory = false;
        },
    },
    actions: {
        async handleSubmit({ state }) {
            if (!state.expression) {
                return;
            }

            const res = await HttpService.post("/v1/expressions/calculation", {
                expression: state.expression,
            });

            if (res.code === 200) {
                state.calculatedExpression = res.data.expression;
                state.result = res.data.result;
                state.expression = "";
                return;
            }

            if (res.code === 400) {
                toast.error(res.data || res.message);
                return;
            }

            if (res.code === 401) {
                // TODO: handle later
            }
        },
        async fetchHistory({ state }) {
            const query = { limit: 50, page: 1 };
            const res = await HttpService.get(`/v1/expressions/history?limit=${query.limit}&page=${query.page}`);

            if (res.code === 200) {
                // TODO: handle pagination later
                const { items } = res.data;

                state.expressionHistory = items;
                return;
            }

            if (res.code === 401) {
                // TODO: handle later
            }
        },
        async clearHistory({ state }) {
            if (state.expressionHistory.length === 0) {
                return;
            }

            const res = await HttpService.delete("/v1/expressions/history/all");
            if (res.code === 204) {
                state.expressionHistory = [];
                return;
            }

            if (res.code === 401) {
                // TODO: handle later
            }
        }
    },
    getters: {
        expression(state) {
            return state.expression;
        },
        calculatedExpression(state) {
            return state.calculatedExpression;
        },
        result(state) {
            return state.result;
        },
        showHistory(state) {
            return state.showHistory;
        },
        lastKey(state) {
            return state.expression[state.expression.length - 1];
        },
        expressionHistory(state) {
            return state.expressionHistory;
        },
    },
};

export default calculatorStore;
