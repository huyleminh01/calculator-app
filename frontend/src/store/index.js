import { createStore } from "vuex";
import authStore from "./auth.js";
import calculatorStore from "./calculator.js";

const store = createStore({
    modules: {
        auth: {
            ...authStore,
            namespaced: true,
        },
        calculator: {
            ...calculatorStore,
            namespaced: true,
        }
    }
});

export default store;