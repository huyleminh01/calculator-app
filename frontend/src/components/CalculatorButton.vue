<script>
export default {
    props: {
        type: {
            validator(value) {
                return ["operator", "operand"].includes(value)
            }
        },
        value: {
            type: String,
        }
    },
    emits: ["onClick"],
    computed: {
        buttonClassObject() {
            return {
                "text-[#FDAD10]": this.type === "operator",
                "hover:bg-[#eff2f3]": this.type === "operator" || this.type === "operand"
            }
        }
    }
}
</script>

<template>
    <button class="w-full h-full flex justify-center items-center rounded-lg font-bold text-xl" :class="buttonClassObject"
        @click="$emit('onClick', this.value)">
        <slot></slot>
    </button>
</template>