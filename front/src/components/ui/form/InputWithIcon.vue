<script setup>
import Icon from '../Icon.vue';

const emit = defineEmits(['update:value'])
const props = defineProps({placeholder: String, type: String, icon: Object})
</script>
<template>
    <div class="w-full h-11 rounded-xl bg-slate-700 flex items-center">
        <Icon :icon="props.icon" class="h-4 w-4 mx-2" />
        <input :type="props.type" class="flex-1 h-full bg-slate-700 px-2" :placeholder="props.placeholder" @input="emit('update:value', $event.target.value)">
    </div>
</template>