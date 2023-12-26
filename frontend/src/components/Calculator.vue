<script setup>
import CalculatorButton from './CalculatorButton.vue';
</script>

<script>
const buttonList = [
    { value: "/", type: "operator" },
    { value: "7", type: "operand" },
    { value: "8", type: "operand" },
    { value: "9", type: "operand" },
    { value: "*", type: "operator" },
    { value: "4", type: "operand" },
    { value: "5", type: "operand" },
    { value: "6", type: "operand" },
    { value: "-", type: "operator" },
    { value: "1", type: "operand" },
    { value: "2", type: "operand" },
    { value: "3", type: "operand" },
    { value: "+", type: "operator" },
    { value: "" },
    { value: "0", type: "operand" },
    { value: "" },
]
export default {
    components: {
        CalculatorButton,
    },
    data() {
        return {
            expression: "",
            calculatedExpression: "",
            result: "",
        }
    },
    computed: {
        lastKey() {
            return this.expression[this.expression.length - 1]
        }
    },
    created() {
        // register keyboard event
        window.addEventListener("keyup", this.handleKeyboard)
    },
    beforeUnmount() {
        window.removeEventListener("keyup", this.handleKeyboard)
    },
    methods: {
        handleClear() {
            this.expression = ""
            this.result = "";
            this.calculatedExpression = "";
        },
        handleBackSpace() {
            this.expression = this.expression.slice(0, this.expression.length - 1);
        },
        handleKeyboard(event) {
            if (event.key === "Backspace") {
                this.handleButtonClicked("delete");
                return;
            }

            if (event.key === "c") {
                this.handleButtonClicked("clear");
                return;
            }

            if (event.key === "Enter" && event.ctrlKey) {
                this.handleSubmit();
                return;
            }

            this.handleButtonClicked(event.key);
        },
        handleButtonClicked(value) {
            switch (value) {
                case "=":
                    this.handleSubmit();
                    break;
                case "clear":
                    this.handleClear();
                case "delete":
                    this.handleBackSpace();
                    break;
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    if (this.result) {
                        this.result = "";
                        this.calculatedExpression = "";
                    }
                    this.expression += value;
                    break;
                case "+":
                case "-":
                case "*":
                case "/":
                    if (this.result) {
                        this.expression = this.result;
                        this.result = "";
                        this.calculatedExpression = "";
                    }

                    this.expression = /[\+\-\*\/]/.test(this.lastKey)
                        ? this.expression.slice(0, this.expression.length - 1).concat(value)
                        : this.expression.concat(value);
                    break;
                default:
                    break;
            }
        },
        handleSubmit: async function () {
            if (!this.expression) {
                return;
            }

            this.calculatedExpression = this.expression;
            this.result = eval(this.expression).toString();
            this.expression = "";
        },

        handleKeyUp(event) {
            console.log(event.target)
        }
    }
}
</script>

<template>
    <div class="w-96 border-[1px] border-solid rounded-3xl h-[48rem]">
        <div class="bg-[#E5EAED] rounded-t-3xl h-2/5 flex flex-col px-6 pt-8 pb-6">
            <div class="flex justify-end mb-4">
                <button class="p-2 rounded-lg hover:bg-[#d7dcdf]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.25"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>

            <div
                class="flex-grow flex flex-col justify-end overflow-y-auto break-words h-full max-h-full calculator-screen">
                <div class="text-end text-lg font-medium max-h-[40%] mb-2 py-1">
                    {{ calculatedExpression }}
                </div>
                <div class="text-end text-4xl font-semibold max-h-[60%] py-1" id="display">
                    {{ expression }}
                </div>
                <div class="text-end text-4xl font-semibold max-h-[60%] py-1" id="display">
                    {{ result }}
                </div>
            </div>
        </div>

        <div class="bg-[#F4F8FB] h-3/5 rounded-b-3xl grid grid-cols-4 place-items-center gap-2 px-6 pb-8 pt-2">
            <CalculatorButton class="col-span-2 hover:bg-[#eff2f3] text-red-500" @on-click="handleButtonClicked"
                :value="`clear`">C
            </CalculatorButton>

            <CalculatorButton class="col-span-1 hover:bg-[#eff2f3] text-[#FDAD10]" :value="`delete`"
                @on-click="handleButtonClicked">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.25"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                </svg>
            </CalculatorButton>

            <CalculatorButton v-for="button in buttonList" :type="button.type" :value="button.value"
                @on-click="handleButtonClicked">
                {{ button.value }}
            </CalculatorButton>

            <CalculatorButton class="bg-[#FDAD10] hover:bg-[#e39b0c] text-white" id="equals" @on-click="handleButtonClicked"
                :value="`=`">=</CalculatorButton>
        </div>
    </div>
</template>

<style scoped>
/* width */
.calculator-screen::-webkit-scrollbar {
    width: 6px;
}

/* Track */
.calculator-screen::-webkit-scrollbar-track {
    background: #e5eaed;
    border-radius: 8px;
}

/* Handle */
.calculator-screen::-webkit-scrollbar-thumb {
    background: #bbbbbb;
    border-radius: 8px;
}

.calculator-screen::-webkit-scrollbar-thumb:hover {
    background: #aaaaaa;
}
</style>
