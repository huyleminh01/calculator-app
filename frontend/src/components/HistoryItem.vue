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
    <div class="cursor-pointer hover:bg-[#eff2f3] rounded-lg px-4 py-2" @click="$emit('onClick', this.espression)">
        <div class="text-end text-md font-medium max-h-[40%]">
            {{ expression }}
        </div>
        <div class="text-end text-2xl font-semibold max-h-[60%]" id="display">
            ={{ result }}
        </div>
    </div>
</template>