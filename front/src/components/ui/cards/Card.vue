<script setup>
import { ref, onMounted, nextTick } from 'vue';

const cardRef = ref(null);
const cardHeight = ref(null);

const props = defineProps({
    cardInfo: {
        type: Object
    },
})

onMounted(async () => {
    //Configura a altura apenas com base na largura para que não haja problema de proporcionalidade
    await nextTick();
    if (cardRef.value) {
        const width = cardRef.value.getBoundingClientRect().width;
        cardHeight.value = width * 1.5
    }
})

</script>
<template>
        <div v-if="props.cardInfo" 
            :style="`height: ${cardHeight}px`"
            class="card-wrapper bg-[#FCE5D0] w-full space-y-2 hover:scale-105 transition-transform cursor-pointer overflow-hidden" 
            :class="
                cardHeight && cardHeight < 200? 'rounded-md ':'rounded-lg '
            "
            ref="cardRef"
        >
            <img :src="props.cardInfo.image" alt="" class="flex-1">
        </div>
</template>