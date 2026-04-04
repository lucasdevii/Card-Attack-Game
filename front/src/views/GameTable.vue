<script setup>
import Card from '@/components/gameTable/Card.vue';
import CardsInTable from '@/components/gameTable/CardsInTable.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const mock = [
  {
    id: 1,
    name: "Kael, o Portador de Cinzas",
    description: `Causa 4 de dano a um inimigo.
Se o alvo estiver com menos de 50% de vida, causa +2 de dano adicional.
Ao eliminar um inimigo, ganha +1 de ataque permanentemente.`,
    stats: { life: 12, attack: 4, defense: 2 }
  },
  {
    id: 2,
    name: "Lyra, Guardiã da Névoa",
    description: `Concede um escudo de 3 pontos a um aliado.
Enquanto o escudo estiver ativo, reduz todo dano recebido em 1.
Se o escudo for quebrado, cura 2 de vida.`,
    stats: { life: 10, attack: 2, defense: 5 }
  },
  {
    id: 3,
    name: "Drogar, o Devorador de Ossos",
    description: `Causa 3 de dano a todos os inimigos.
Para cada inimigo atingido, recupera 1 de vida.
Se atingir 3 ou mais inimigos, ganha +2 de defesa neste turno.`,
    stats: { life: 14, attack: 3, defense: 3 }
  }
];

const currentCards = ref(mock);
const cardForShowInfos = ref(null);

const enemyCardsDispatched = ref([null, null, null]);
const userCardsDispatched = ref([null, null, null]);

// Clique na carta
function clickInCard(index){
  if(cardForShowInfos.value === index){
    dispatchCard(index);
    cardForShowInfos.value = null;
    return;
  }
  cardForShowInfos.value = index;
}

// Remove da mão
function dispatchCard(index){
  const emptyIndex = userCardsDispatched.value.findIndex(c => c === null);

  if (emptyIndex !== -1) {
    userCardsDispatched.value[emptyIndex] = currentCards.value[index];
    currentCards.value.splice(index, 1);
  }
}

// Clique fora (profissional)
function verifyMouseInCard(event){
  const clickedInside = event.target.closest('.card-wrapper');

  if (!clickedInside) {
    cardForShowInfos.value = null;
  }
}

// Lifecycle correto
onMounted(() => {
  window.addEventListener("click", verifyMouseInCard);
});

onUnmounted(() => {
  window.removeEventListener("click", verifyMouseInCard);
});
</script>

<template>
  <div class="w-screen h-screen relative overflow-hidden">

    <!-- Tabuleiro -->
    <div class="w-full h-full bg-slate-900 flex flex-col justify-between">
      <CardsInTable :cardsList="enemyCardsDispatched"/>
      <CardsInTable :cardsList="userCardsDispatched"/>
    </div>

    <!-- Cartas -->
    <div class="absolute bottom-[-130px] w-full ml-4 flex justify-start space-x-4">
      
      <div 
        v-for="(card, index) in currentCards" 
        :key="card.id"
        @click="clickInCard(index)"
        class="card-wrapper transition-transform duration-500 ease-in-out cursor-pointer"
        style="width: 160px"
        :class="cardForShowInfos === index
          ? 'translate-y-[-300px] scale-105 z-50'
          : 'hover:-translate-y-10'"
      >
        <Card :cardInfo="card" class="shadow-black shadow-xl"/>
      </div>

    </div>
  </div>
</template>