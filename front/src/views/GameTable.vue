<script setup>
import Card from '@/components/gameTable/Card.vue';
import CardsInTable from '@/components/gameTable/CardsInTable.vue';
import PerfilInformation from '@/components/gameTable/PerfilInformation.vue';
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
    cardForShowInfos.value = null;
    return
  }
  cardForShowInfos.value = index;
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
    <!-- Fade da descrição -->
    <div
     class="absolute left-0 top-0 bottom-0 w-[28vw] bg-gradient-to-r from-black/80 to-transparent break-words duration-300" 
     :class="cardForShowInfos !== null? '':'-translate-x-[200%]'"
    >
      Descrição aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
    <!-- Tabuleiro -->
    <div class="w-full h-full bg-slate-900 flex flex-col justify-between">
      
      <CardsInTable :cardsDispatched="enemyCardsDispatched"/>
      <CardsInTable 
        v-model:cardsDispatched="userCardsDispatched"
        :cardClicked="cardForShowInfos"
        :currentCards="currentCards"
      />
    </div>

    <!-- Cartas -->
    <div class="absolute bottom-0 w-full px-3 flex justify-between pointer-events-none ">
      <div class="relative">
        <div class="absolute bottom-[-130px] flex space-x-3">
          <div 
            v-for="(card, index) in currentCards" 
            :key="card.id"
            @click="clickInCard(index)"
            class="card-wrapper transition-transform duration-500 ease-in-out cursor-pointer pointer-events-auto"
            style="width: 140px"
            :class="cardForShowInfos === index
              ? 'translate-y-[-300px] scale-105 z-50'
              : 'hover:-translate-y-10'"
          >
            <Card :cardInfo="card" class="shadow-slate-800 shadow-md"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>