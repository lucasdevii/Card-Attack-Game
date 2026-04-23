<script setup>
import Icon from '../Icon.vue';

const emit = defineEmits(['update:value'])
const props = defineProps({text: String, icon: Object, collapsed: Boolean, active: Boolean})
</script>
<template>
    <div :class="[
            'h-12 w-full rounded-3xl flex items-center overflow-hidden transition-all duration-300 cursor-pointer',
            collapsed ? 'justify-center px-2 bg-slate-800' : 'justify-start px-4 bg-slate-900',
            props.active ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-100 hover:bg-slate-800'
        ]">
        <div class="flex items-center justify-center flex-shrink-0">
            <Icon :icon="props.icon" class="h-5 w-5"/>
        </div>
        <span class="overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300"
              :class="collapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[180px] opacity-100 ml-3'">
            {{ props.text }}
        </span>
    </div>
</template>
<style></style>