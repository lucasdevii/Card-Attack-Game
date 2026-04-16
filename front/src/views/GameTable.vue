<script setup>
import Card from '@/components/layouts/gameTable/Card.vue';
import CardsInTable from '@/components/layouts/gameTable/CardsInTable.vue';
import PerfilInformation from '@/components/layouts/gameTable/PerfilInformation.vue';
import { getCards } from '@/services/CardService';
import { onMounted, onUnmounted, ref } from 'vue';

const cardLimit = 3;
const infosBase = {index: null, card: null}

const currentCards = ref(null);
const cardClicked = ref(infosBase);

const enemyCardsDispatched = ref([null, null, null]);
const userCardsDispatched = ref([null, null, null]);

// Clique na carta
function clickInCard(index){
  if(cardClicked.value.index === index){
    cardClicked.value = infosBase;
    return
  }

  cardClicked.value = {index: index, card: currentCards.value[index]};
}

// Clique fora 
function verifyMouseInCard(event){
  const clickedInside = event.target.closest('.card-wrapper');

  if (!clickedInside) {
    cardClicked.value = infosBase;
  }
}

// Lifecycle correto
onMounted(async () => {
  window.addEventListener("click", verifyMouseInCard);

  const cards = await getCards();
  console.log(cards)
  currentCards.value = [cards[0], cards[1], cards[2]];
});

onUnmounted(() => {
  window.removeEventListener("click", verifyMouseInCard);
});
</script>

<template>
  <div class="w-screen h-screen relative overflow-hidden">
    <!-- Fade da descrição -->
    <div
     class="absolute left-0 top-0 bottom-0 w-[32vw] bg-gradient-to-r from-black/80 to-transparent break-words duration-300 p-5 z-10 pointer-events-none" 
     :class="cardClicked.index !== null? '':'-translate-x-[200%]'"
    >
      <div>
        <h1 class="mb-6 text-[18px]">{{cardClicked?.card?.name}}</h1>
        <span class="text-[12px]">{{cardClicked?.card?.description}}</span>
      </div>
    </div>
    <!-- Tabuleiro -->
    <div class="relative w-full h-full bg-slate-900 flex flex-col justify-between">
      
      <CardsInTable :cardsDispatched="enemyCardsDispatched"/>
      <!-- Perfil do inimigo -->
      <div class="absolute top-0">
        <PerfilInformation/>
      </div>
      <CardsInTable 
        v-model:cardsDispatched="userCardsDispatched"
        :cardClicked="cardClicked"
        :currentCards="currentCards"
      />
      <div class="absolute bottom-0 right-0">
        <PerfilInformation/>
      </div>
    </div>

    <!-- Cartas -->
    <div class="absolute bottom-0 w-full px-3 py-3 flex justify-between pointer-events-none ">
      <div class="relative">
        <div class="absolute bottom-[-130px] flex space-x-3">
          <div 
            v-for="(card, index) in currentCards" 
            :key="card.id"
            @click="clickInCard(index)"
            class="card-wrapper transition-transform duration-500 ease-in-out cursor-pointer pointer-events-auto"
            style="width: 140px"
            :class="cardClicked.index === index
              ? 'translate-y-[-200px] scale-105 z-50'
              : 'hover:-translate-y-10'"
          >
            <Card :cardInfo="card" class="shadow-slate-800 shadow-md"/>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>