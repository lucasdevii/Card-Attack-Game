<script setup>
import DescriptionFade from '@/components/layouts/gameTable/DescriptionFade.vue';
import CardsInTable from '@/components/layouts/gameTable/CardsInTable.vue';
import PerfilInformation from '@/components/layouts/gameTable/PerfilInformation.vue';
import Cheap from '@/components/layouts/gameTable/Cheap.vue';
import { getCards } from '@/services/CardService';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { user } from '@/composables/useAuth';

const props = defineProps({
  cards: {
    type: Array,
    required: true
   }
})

const infosBase = {index: null, card: null, line: null}

const cheap = ref([]);
const cardClicked = ref({...infosBase});

const enemyCardsDispatched = ref({ front: [null, null], back: [null, null, null] });
const userCardsDispatched = ref({ front: [null, null, null], back: [null, null] });

watch(
  () => props.cards,
  (newCards) => {
    cheap.value = Array.isArray(newCards) ? [...newCards] : [];
  },
  { immediate: true }
);

// Verifica se o mouse clicou fora da carta para resetar a descrição
function verifyMouseInCard(event){
  const clickedInside = event.target.closest('.card-wrapper');

  if (!clickedInside) {
    cardClicked.value = {...infosBase};
  }
}

onMounted(async () => {
  window.addEventListener("click", verifyMouseInCard);
});
onUnmounted(() => {
  window.removeEventListener("click", verifyMouseInCard);
});
</script>

<template>
  <div class="w-full h-full">
    <div class="relative overflow-hidden w-full h-full">
      <DescriptionFade :cardClicked="cardClicked"/>
      <!-- Tabuleiro Screen-->
      <div class="relative w-full h-full bg-slate-900 flex flex-col justify-between">
        
        <CardsInTable :cardsDispatched="enemyCardsDispatched"/>
        <!-- Perfil do inimigo -->
        <div class="absolute top-0">
          <PerfilInformation/>
        </div>

        <!-- Perfil do usuário -->
         <div class="relative">
          <CardsInTable 
            v-model:cardsDispatched="userCardsDispatched"
            v-model:cardClicked="cardClicked"
            v-model:cheap="cheap"
          />
          <Cheap
            class="absolute top-1/3 left-[12vw]" 
            :userCardsDispatched="userCardsDispatched"
            v-model:cheap="cheap"
            v-model:cardClicked="cardClicked"
          />
        </div>
        <div class="absolute bottom-0 right-0">
          <PerfilInformation :name="user?.name"/>
        </div>
      </div>

    </div>
  </div>
</template>