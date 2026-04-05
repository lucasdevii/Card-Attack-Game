<script setup>
import Card from '@/components/gameTable/Card.vue';

const props = defineProps({
  cardsDispatched: {type: Array},
  cardClicked: {type: Number, default: null},
  currentCards: {type: Array}
});

const emit = defineEmits(["update:cardsDispatched","update:currentCards"]);

 /**
  * @returns void
  * @param index do slot de carta
  */
const addCardInSlot = (index) => {
  if (props.cardClicked !== null) {
    //Passa da mão para a mesa
    const updatedBoard = [...props.cardsDispatched];
    updatedBoard[index] = props.currentCards[props.cardClicked];
    emit("update:cardsDispatched", updatedBoard);
    //Retira da mão
    const currentCards = props.currentCards.splice(props.cardClicked, 1);
    emit("update:currentCards", currentCards)
  }
}

</script>

<template>
  <div class="w-full h-[160px] flex justify-center items-center my-4 relative">
    
    <div 
      v-for="(card,index) in props.cardsDispatched"
      :key="index"
      class="mx-4 flex justify-center items-center h-full w-[100px]"
    >
      <Card v-if="card?.description" :cardInfo="card"/>
      <div 
        v-else 
        @click="addCardInSlot(index)"
        class="bg-gray-800 w-full h-full flex justify-center items-center rounded-md cursor-pointer hover:scale-105 transition-transform"
        :class="cardClicked != null? 'shadow-[0_0_15px_rgba(251,191,36,0.5)] shadow-amber-200':''"
      >
        Vazio
      </div>
    </div>
    <div class="absolute right-3 bottom-3">
      <PerfilInformation/>
    </div>

  </div>
</template>