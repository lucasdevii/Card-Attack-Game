<script setup>
import { ref, onMounted } from 'vue';

const cardRef = ref(null);
const cardHeight = ref(null);

const props = defineProps({
    cardInfo: {
        type: Object
    },
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
            class="bg-[#E7D8BE] w-full space-y-2 hover:scale-105 transition-transform cursor-pointer overflow-hidden" 
            :class="
                cardHeight < 200? 'rounded-md px-1':'rounded-lg px-2'
            "
            ref="cardRef"
        >
        </div>
</template>