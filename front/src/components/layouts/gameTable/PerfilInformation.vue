<script setup>
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
    name: {type: String, default: "Enemy"}
})
</script>
<template>
    <div class="w-[230px] h-[60px] mx-5 my-5">
        <div class="flex items-center h-1/2 space-x-2">
            <!-- Foto e nome do usuario -->
            <FontAwesomeIcon :icon="faCircleUser" class="w-[30px] h-[30px]" />
            <span class="text-[0.9rem]">{{ props.name }}</span>
        </div>
        <div class="flex-1 mt-2">
            <!-- Bg Life Bar -->
            <div class="w-full h-2 bg-gray-500 rounded-2xl">
                <!-- Life Bar -->
                <div class="w-[100%] h-full bg-green-400 rounded-2xl"></div>
            </div>
        </div>
    </div>
</template>