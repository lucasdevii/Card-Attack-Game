<script setup>
import Card from '../ui/cards/Card.vue';
import CardsStructure from '../ui/cards/CardsStructure.vue';
import { ref } from 'vue';

const props = defineProps({
    cards: {
        type: Array,
        required: true
    }
})

const cardsDispatched = ref({front: [null, null, null], back: [null, null]})
const cardClicked = ref({ index: null, card: null, line: null })
const currentCards = ref([...props.cards])
const unlockedCards = ref([...props.cards])
const allCards = ref([...props.cards])

</script>
<template>
    <div class="w-full h-full px-4 py-3">
        <!-- Cartas atuais do jogador -->
        <div>
            <h1 class="text-2xl font-bold">SEU DECK</h1>
            <CardsStructure 
                class="scale-105"
                v-model:cardsDispatched="cardsDispatched" 
                v-model:cardClicked="cardClicked" 
                v-model:currentCards="currentCards"
            />
        </div>
        <!-- Linha de cartas disponíveis -->
        <div>
            <h1 class="text-2xl font-bold">SUAS CARTAS</h1>
            <div class="flex space-x-5 mt-5">
                <div v-for="card in props.cards" class="w-[150px]">
                    <Card :key="card.id" :cardInfo="card"/>
                </div>
            </div>
        </div>
        <!-- Linha de cartas indisponiveis -->
        <div>
            <h1 class="text-2xl font-bold my-5">Cartas Indisponíveis</h1>
            <div class="flex space-x-5 mt-5">
                <div v-for="card in props.cards" class="w-[150px] color saturate-0">
                    <Card :key="card.id" :cardInfo="card"/>
                </div>
            </div>
        </div>
    </div>
</template>
