const authStore = {
    state() {
        const token = localStorage.getItem("token");
        return {
            isLogin: !!token,
        };
    },
    mutations: {
        setLoginStatus(state, status) {
            state.isLogin = !!status;
        },
        logout(state) {
            localStorage.clear();
            state.isLogin = false;
        }
    },
    getters: {
        isLogin(state) {
            return state.isLogin;
        }
    }
};

export default authStore;