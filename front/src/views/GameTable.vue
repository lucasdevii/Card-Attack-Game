<script setup>
import Card from '@/components/gameTable/Card.vue';
import { onUnmounted, onMounted, ref } from 'vue';

const mock = [
  {
    id: 1,
    name: "Kael, o Portador de Cinzas",
    description: `Causa 4 de dano a um inimigo.
Se o alvo estiver com menos de 50% de vida, causa +2 de dano adicional.
Ao eliminar um inimigo, ganha +1 de ataque permanentemente.`,
    stats: {
      life: 12,
      attack: 4,
      defense: 2
    }
  },
  {
    id: 2,
    name: "Lyra, Guardiã da Névoa",
    description: `Concede um escudo de 3 pontos a um aliado.
Enquanto o escudo estiver ativo, reduz todo dano recebido em 1.
Se o escudo for quebrado, cura 2 de vida.`,
    stats: {
      life: 10,
      attack: 2,
      defense: 5
    }
  },
  {
    id: 3,
    name: "Drogar, o Devorador de Ossos",
    description: `Causa 3 de dano a todos os inimigos.
Para cada inimigo atingido, recupera 1 de vida.
Se atingir 3 ou mais inimigos, ganha +2 de defesa neste turno.`,
    stats: {
      life: 14,
      attack: 3,
      defense: 3
    }
  }
];

const currentCards = ref(mock); 
const cardForShowInfos = ref(null);
const enemyCardsDispatched = ref([{},{},{}])

const inCard = ref(false); //Verifica se o mouse esta sobre alguma carta

// Selecionando carta
function clickInCard(index){
  if(cardForShowInfos.value == index){
    dispatchCard(index)
    cardForShowInfos.value = null   
    return
  }
  cardForShowInfos.value = index;
}

function dispatchCard(index){
  //Logica de selecionar carta...
  currentCards.value.splice(index, 1)
}


// Sistema de quando clicar fora da carta ela voltar para o deck
function isInCard(value){
  inCard.value = value
}


window.addEventListener("click", verifyMouseInCard)
function verifyMouseInCard(event){
  if(!inCard.value){
    cardForShowInfos.value = null;
  }
}


onUnmounted(() => {
  window.removeEventListener("click");
})

</script>
<template>
  <div class="w-screen h-screen relative overflow-hidden">
    <!-- Tabuleiro -->
    <div class="w-full h-full bg-slate-900 flex flex-col justify-between">
      <!-- Nemy Row -->
      <div class="w-full h-[150px] bg-white flex justify-center items-center">
        <!-- CardSlot || Altura = 50% do card e é proporcional a largura -->
        <div class="w-[90px] h-[135px] bg-slate-500 mx-4" v-for="card in enemyCardsDispatched">
          <Card :cardInfo="card" />
        </div>
      </div>

      <!-- Row user -->
      <div  class="w-full mb-24 h-[150px] bg-white flex justify-center items-center">
        <!-- CardSlot || Altura = 50% do card e é proporcional a largura -->
        <div class="w-[90px] h-[135px] bg-slate-500 mx-4" v-for="card in enemyCardsDispatched">
          <Card :cardInfo="card" ref="cardRef"/>
        </div>
      </div>
    </div>
    <!-- Cartas -->
    <div class="absolute bottom-[-130px] w-full ml-4 flex justify-start space-x-4">
      <div 
        v-for="(card, index) in currentCards" 
        :key="index"
        @mouseenter="isInCard(true)"
        @mouseleave="isInCard(false)"
        @click="clickInCard(index)"
        class="transition-all duration-500 ease-in-out cursor-pointer h-[260px] w-[160px]"
        :class="cardForShowInfos === index 
          ? 'translate-y-[-300px] scale-105 z-50' 
          : 'hover:-translate-y-10'"
      >
        <Card :cardInfo="card"/>
      </div>
    </div>
  </div>
</template>