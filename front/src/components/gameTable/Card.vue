<script setup>
import { ref, onMounted } from 'vue';

const cardRef = ref(null);
const cardHeight = ref(null);

const props = defineProps({
    cardInfo: {
        type: Object
    }
})

onMounted(() => {
    //Configura a altura apenas com base na largura para que não haja problema de proporcionalidade
    const width = cardRef.value.getBoundingClientRect().width;
    cardHeight.value = width * 1.6
})

</script>
<template>
        <div v-if="props.cardInfo" 
            :style="`height: ${cardHeight}px`"
            class="bg-gray-800 w-full h-full space-y-2 hover:scale-105 transition-transform cursor-pointer overflow-hidden" 
            :class="cardHeight < 200? 'rounded-lg px-1':'rounded-xl px-2'"
            ref="cardRef"
        >
            <div class="h-3/6">
                <div class="flex h-1/5 justify-between items-center"
                    :class="cardHeight < 200? 'text-[5px]': 'text-[8px]'"
                >
                    <span>Vida: {{ props.cardInfo.stats?.life }}</span>
                    <div class="space-x-1">
                        <span>Defesa: {{ props.cardInfo.stats?.defense }}</span>
                        <span>Ataque: {{ props.cardInfo.stats?.attack }}</span>
                    </div>
                </div>
                <!-- Imagem -->
                <div class="bg-black text-[53%] w-full h-4/5 flex justify-center items-center">
                    <img v-if="image" :src="image" alt="" >
                    <span v-else>Sem imagem</span>
                </div>
            </div>
            <div class="flex flex-col h-3/6">
                <div class="flex-1 text-center overflow-hidden box-border">
                    <p class="break-words leading-tight" :class="cardHeight < 200? 'text-[5px]' : 'text-[8px] '">
                        {{ props.cardInfo?.description }}
                    </p>
                </div>
            </div>
        </div>
        
</template>