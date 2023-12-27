<script>
import LoginForm from "@/components/LoginForm.vue";
import { HttpService } from "@/services/http-service";
import { toast } from "vue3-toastify";

export default {
    methods: {
        async handleLogin({ username, password }) {
            const res = await HttpService.post("/v1/auth/login", { username, password });
            if (res.code === 200) {
                const { data } = res;
                localStorage.setItem("token", data.token);
                this.$store.commit("auth/setLoginStatus", true);
                this.$router.push("/");
                return;
            }
            if (res.code === 400) {
                toast.error(res.message);
                return;
            }
        }
    },
    components: { LoginForm }
}
</script>

<template>
    <main class="w-screen h-screen">
        <div class="w-full h-full flex justify-center items-center">
            <div class="w-[30rem] h-auto rounded-lg shadow-2xl flex flex-col gap-2 px-6 py-8 relative">
                <h1 class="w-full text-center text-2xl font-bolder relative">
                    Login
                    <router-link to="/" class="absolute left-0 top-1/2 translate-y-[-50%] p-2" title="Back">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.25"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </router-link>
                </h1>

                <LoginForm @on-submit="handleLogin" />
            </div>
        </div>
    </main>
</template>
