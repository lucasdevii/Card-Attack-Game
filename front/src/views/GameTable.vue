<script setup>
import DescriptionFade from '@/components/layouts/gameTable/DescriptionFade.vue';
import CardsInTable from '@/components/layouts/gameTable/CardsInTable.vue';
import PerfilInformation from '@/components/layouts/gameTable/PerfilInformation.vue';
import Hand from '@/components/layouts/gameTable/Hand.vue';
import { getCards } from '@/services/CardService';
import { onMounted, onUnmounted, ref } from 'vue';

const cardLimit = 3;
const infosBase = {index: null, card: null, line: null}

const currentCards = ref(null);
const cardClicked = ref({...infosBase});

const enemyCardsDispatched = ref({ front: [null, null], back: [null, null, null] });
const userCardsDispatched = ref({ front: [null, null, null], back: [null, null] });

// Verifica se o mouse clicou fora da carta para resetar a descrição
function verifyMouseInCard(event){
  const clickedInside = event.target.closest('.card-wrapper');

  if (!clickedInside) {
    cardClicked.value = {...infosBase};
  }
}
onMounted(async () => {
  window.addEventListener("click", verifyMouseInCard);

  const cards = await getCards();
  currentCards.value = [cards[0], cards[1], cards[2]];
});

onUnmounted(() => {
  window.removeEventListener("click", verifyMouseInCard);
});
</script>

<template>
  <div class="w-screen h-screen relative overflow-hidden">
    <DescriptionFade :cardClicked="cardClicked"/>
    <!-- Tabuleiro Screen-->
    <div class="relative w-full h-full bg-slate-900 flex flex-col justify-between">
      
      <CardsInTable :cardsDispatched="enemyCardsDispatched"/>
      <!-- Perfil do inimigo -->
      <div class="absolute top-0">
        <PerfilInformation/>
      </div>

      <!-- Perfil do usuário -->
      <CardsInTable 
        v-model:cardsDispatched="userCardsDispatched"
        v-model:cardClicked="cardClicked"
        v-model:currentCards="currentCards"
      />
      <div class="absolute bottom-0 right-0">
        <PerfilInformation/>
      </div>
    </div>

    <!-- Cartas -->
    <Hand
      v-model:cardClicked="cardClicked"
      v-model:currentCards="currentCards"
      v-model:userCardsDispatched="userCardsDispatched"
    />
  </div>
</template>