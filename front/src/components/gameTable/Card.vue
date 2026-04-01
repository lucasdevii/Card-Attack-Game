<script setup>
import { ref } from 'vue';

const props = defineProps({
    cardInfo: {
        type: Object
    }
})

const cardInfo = ref(props.cardInfo);
</script>
<template>
        <div class="bg-gray-900 w-[210px] h-[350px] p-3 rounded-2xl space-y-2 hover:scale-105 transition-transform cursor-pointer">
            <!-- Imagem -->
            <div class="bg-black w-full h-2/5 flex justify-center items-center">
                <img :src="image" alt="" v-if="image">
                <span v-else>Sem imagem</span>
            </div>
            
            <div class="h-3/5">
                <!-- Descrição -->
                <div class="flex flex-col h-5/6">
                    <div class="flex-1 border rounded-lg p-1 overflow-auto">
                        <span class="break-words text-[10px] m-0 p-0">
                            {{ cardInfo?.description }}
                        </span>
                    </div>
                </div>
                <!-- Atributos -->
                <div class="flex h-1/6 text-xs justify-between items-center">
                    <span class="">Vida: {{ cardInfo.stats?.life }}</span>
                    <div class="space-x-1">
                        <span>Defesa: {{ cardInfo.stats?.defense }}</span>
                        <span>Ataque: {{ cardInfo.stats?.attack }}</span>
                    </div>
                </div>
            </div>
        </div>
</template>