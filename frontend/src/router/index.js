import LoginPage from "@/pages/LoginPage.vue";
import NotFoundPage from "@/pages/errors/NotFoundPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "Login",
            component: LoginPage,
        },
        {
            path: "/",
            name: "home",
            component: HomePage,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFoundPage,
        },
    ],
});

export default router;
