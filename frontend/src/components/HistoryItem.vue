<script>
export default {
    props: {
        expression: String,
        result: String,
    },
    emits: ["onClick"],
}
</script>

<template>
    <div class="cursor-pointer hover:bg-[#eff2f3] rounded-lg px-4 py-2"
        @click="$emit('onClick', this.expression, this.result)">
        <div class="text-end text-md font-medium max-h-[40%] break-words">
            {{ expression }}
        </div>
        <div class="text-end text-2xl font-semibold max-h-[60%] break-words" id="display">
            ={{ result }}
        </div>
    </div>
</template>