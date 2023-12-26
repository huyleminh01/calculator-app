import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import NotFoundPage from "@/pages/errors/NotFoundPage.vue";
import LoginPage from "@/pages/LoginPage.vue";

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
            beforeEnter: (to, from, next) => {
                // get state from store
                next({ name: "Login" });
            },
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
