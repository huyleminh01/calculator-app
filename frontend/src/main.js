import { createApp } from "vue";
import Vue3Toastify from "vue3-toastify";
import App from "./App.vue";
import "./assets/base.css";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(Vue3Toastify, {
    autoClose: 3000,
    position: "bottom-right",
    transition: "slide",
});

app.use(store);
app.mount("#app");
