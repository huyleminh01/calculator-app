<script>
import { HttpService } from "@/services/http-service";
import { toast } from "vue3-toastify";

export default {
    data() {
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        async handleSubmit(event) {
            event.preventDefault();

            const res = await HttpService.post("/v1/auth/login", { username: this.username, password: this.password });
            if (res.code === 200) {
                const { data } = res;
                localStorage.setItem("token", data.token);
                this.$router.push("/");
                return;
            }

            if (res.code === 400) {
                toast.error(res.message);
                return;
            }
        }
    }
}
</script>

<template>
    <main class="w-screen h-screen">
        <div class="w-full h-full flex justify-center items-center">
            <div class="w-[30rem] h-auto rounded-lg shadow-2xl flex flex-col gap-2 px-6 py-8">
                <h1 class="w-full text-center text-2xl font-bolder">Login</h1>

                <form class="flex flex-col justify-between" @submit.prevent="handleSubmit">
                    <label class="block mb-3">
                        <span class="block text-sm font-medium text-slate-700 mb-1">Username <b
                                class="text-red-600">*</b></span>
                        <input type="text" placeholder="Enter your username" v-model="username"
                            class="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
                            pattern="^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$" required oninput="setCustomValidity('')"
                            oninvalid="this.setCustomValidity('Username must have minimum 8 characters, at least 1 letter and 1 number')" />
                    </label>

                    <label class="block mb-3">
                        <span class="block text-sm font-medium text-slate-700 mb-1">Password <b
                                class="text-red-600">*</b></span>
                        <input type="password" placeholder="Enter your password" v-model="password"
                            class="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required
                            oninput="setCustomValidity('')"
                            oninvalid="this.setCustomValidity('Password must have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number')" />
                    </label>

                    <button type="submit"
                        class="bg-sky-500 hover:bg-sky-700 text-white text-sm block w-full px-4 py-2 font-semibold rounded-md">Login</button>
                </form>
            </div>
        </div>
    </main>
</template>
