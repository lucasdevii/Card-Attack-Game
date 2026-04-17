<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({placeholder: String, type: String, icon: Object})
</script>
<template>
    <div class="w-full h-11 rounded-xl bg-slate-700 flex items-center">
        <FontAwesomeIcon :icon="props.icon" class="h-4 w-4 mx-2" />
        <input :type="props.type" class="flex-1 h-full bg-slate-700 px-2" :placeholder="props.placeholder">
    </div>
</template>
<style></style>