<script>
import { mapGetters } from 'vuex';
import HistoryItem from './HistoryItem.vue';

export default {
    computed: mapGetters({
        expressionHistory: "calculator/expressionHistory"
    }),
    components: { HistoryItem },
    mounted() {
        this.$store.dispatch("calculator/fetchHistory");
    }
}
</script>

<template>
    <div class="flex flex-col h-full gap-2">
        <div class="flex flex-col flex-grow gap-2 overflow-y-auto history-container">
            <template v-if="$store.getters['auth/isLogin']">
                <div v-if="expressionHistory.length === 0" class="flex-grow flex justify-center items-center text-center">
                    Your history is empty
                </div>
                <div v-else class="flex-grow">
                    <HistoryItem v-for="item of expressionHistory" :expression="item.expression" :result="item.result"
                        :key="item.identifier"
                        @on-click="(expression, result) => this.$store.commit('calculator/updateExpressionFromHistory', { expression, result })" />
                </div>

                <button class="px-4 py-2 bg-[#E5EAED] hover:bg-[#d7dcdf] font-semibold rounded-lg"
                    @click="$store.dispatch('calculator/clearHistory')">Clear
                    history</button>
            </template>

            <template v-else>
                <div class="flex-grow flex justify-center items-center text-center">
                    You have to login to store and view your calculation history
                </div>

                <router-link to="/login">
                    <button class="px-4 py-2 bg-[#E5EAED] hover:bg-[#d7dcdf] font-semibold rounded-lg w-full">
                        Login
                    </button>
                </router-link>
            </template>
        </div>
    </div>
</template>