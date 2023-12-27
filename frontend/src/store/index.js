import { createStore } from "vuex";
import authStore from "./auth.js";

const store = createStore({
    modules: {
        auth: {
            ...authStore,
            namespaced: true,
        }
    }
});

export default store;