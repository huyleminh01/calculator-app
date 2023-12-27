<script setup>
import Calculator from "@/components/Calculator.vue";
</script>

<script>
export default {
    methods: {
        logout() {
            this.$store.commit("auth/logout");
        }
    }
}
</script>

<template>
    <main class="w-screen h-screen flex flex-col">
        <nav class="w-full shadow-md py-4 px-8 flex flex-row justify-end">
            <template v-if="$store.getters['auth/isLogin']">
                <button class="bg-sky-500 hover:bg-sky-700 text-white text-sm block px-4 py-2 font-semibold rounded-md" @click="logout">
                    Logout
                </button>
            </template>

            <template v-else>
                <router-link to="/login">
                    <button class="bg-sky-500 hover:bg-sky-700 text-white text-sm block px-4 py-2 font-semibold rounded-md">
                        Login
                    </button>
                </router-link>
            </template>
        </nav>

        <div class="flex flex-col justify-center items-center flex-grow">
            <Calculator />
        </div>
    </main>
</template>
