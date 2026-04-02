<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    cardInfo: {
        type: Object
    }
})

const cardInfo = ref(props.cardInfo);


</script>
<template>
        <div class="bg-gray-800 w-full h-full px-2 rounded-xl space-y-2 hover:scale-105 transition-transform cursor-pointer overflow-hidden" >
            <div class="h-3/6">
                <div class="flex h-1/5 text-[9px] justify-between items-center">
                    <span class="">Vida: {{ cardInfo.stats?.life }}</span>
                    <div class="space-x-1">
                        <span>Defesa: {{ cardInfo.stats?.defense }}</span>
                        <span>Ataque: {{ cardInfo.stats?.attack }}</span>
                    </div>
                </div>
                <!-- Imagem -->
                <div class="bg-black w-full h-4/5 flex justify-center items-center">
                    <img :src="image" alt="" v-if="image">
                    <span v-else>Sem imagem</span>
                </div>
            </div>
            <div class="flex flex-col h-3/6">
                <div class="flex-1 border p-1 text-center overflow-hidden box-border">
                    <p class="break-words text-[8px] leading-tight">
                        {{ cardInfo?.description }}
                    </p>
                </div>
            </div>
        </div>
</template>