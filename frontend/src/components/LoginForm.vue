<script>
export default {
    data() {
        return {
            username: "",
            password: "",
        }
    },
    emits: ["onSubmit"],
    methods: {
        handleSubmit() {
            this.$emit("onSubmit", { username: this.username, password: this.password });
        }
    }
}
</script>

<template>
    <form class="flex flex-col justify-between" @submit.prevent="handleSubmit">
        <label class="block mb-3">
            <span class="block text-sm font-medium text-slate-700 mb-1">Username <b class="text-red-600">*</b></span>
            <input type="text" placeholder="Enter your username" v-model="username"
                class="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
                pattern="^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$" required oninput="setCustomValidity('')"
                oninvalid="this.setCustomValidity('Username must have minimum 8 characters, at least 1 letter and 1 number')" />
        </label>

        <label class="block mb-3">
            <span class="block text-sm font-medium text-slate-700 mb-1">Password <b class="text-red-600">*</b></span>
            <input type="password" placeholder="Enter your password" v-model="password"
                class="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required oninput="setCustomValidity('')"
                oninvalid="this.setCustomValidity('Password must have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number')" />
        </label>

        <button type="submit"
            class="bg-sky-500 hover:bg-sky-700 text-white text-sm block w-full px-4 py-2 font-semibold rounded-md">Login</button>
    </form>
</template>