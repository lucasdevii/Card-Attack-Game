<script setup>
import { nextTick } from 'vue';
import Card from '@/components/layouts/gameTable/Card.vue';

const props = defineProps({
  cardsDispatched: {type: Object},
  cardClicked: {type: Object},
  currentCards: {type: Array}
});

const emit = defineEmits(["update:cardsDispatched","update:currentCards","update:cardClicked"]);

 /**
  * @returns void
  * @param index do slot de carta
  * @param line front ou back
  */
const addCardInSlot = (index, line) => {
  if (props.cardClicked?.index !== null && props.cardClicked?.index !== undefined) {
    const selectedCard = props.cardClicked.card;
    const updatedBoard = {
      front: [...props.cardsDispatched.front],
      back: [...props.cardsDispatched.back]
    };

    updatedBoard[line][index] = selectedCard;
    emit("update:cardsDispatched", updatedBoard);

    const updatedHand = [...props.currentCards];
    updatedHand.splice(props.cardClicked.index, 1);
    emit("update:currentCards", updatedHand);
    emit("update:cardClicked", { index: null, card: null, line: null });
  }
}

const clickInCard = async (index, card, line) => {
  //Se for a mesma carta clicada duas vezes tira
  if(props.cardClicked.index == index && props.cardClicked.line == line){
    const newInfoCardClicked = {index: null, card:null, line:null}
    emit("update:cardClicked", newInfoCardClicked)
    return
  }
  const newInfoCardClicked = {index: index, card: card, line: line}
  emit("update:cardClicked", newInfoCardClicked)

  await nextTick()
  console.log(props.cardClicked)
}

</script>

<template>
  <div class="w-full flex flex-col my-4 relative space-y-3">
    <div class="w-full flex justify-center h-[120px]">
      <div 
        v-for="(card,index) in props.cardsDispatched.front"
        :key="index"
        class="mx-4 flex justify-center items-center h-full w-[75px]"
      >
        <Card v-if="card?.description" :cardInfo="card" @click="clickInCard(index, card, 'front')"/>
        <div 
          v-else 
          @click="addCardInSlot(index, 'front')"
          class="bg-gray-800 w-full h-full flex justify-center items-center rounded-md cursor-pointer hover:scale-105 transition-transform"
          :class="cardClicked?.index != null? 'shadow-[0_0_15px_rgba(251,191,36,0.5)] shadow-amber-200':''"
        >
          Vazio
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center h-[120px]">
      <div 
        v-for="(card,index) in props.cardsDispatched.back"
        :key="index"
        class="mx-4 flex justify-center items-center h-full w-[75px]"
      >
        <Card v-if="card?.description" :cardInfo="card" @click="clickInCard(index, card, 'back')"/>
        <div 
          v-else 
          @click="addCardInSlot(index, 'back')"
          class="bg-gray-800 w-full h-full flex justify-center items-center rounded-md cursor-pointer hover:scale-105 transition-transform"
          :class="cardClicked?.index != null? 'shadow-[0_0_15px_rgba(251,191,36,0.5)] shadow-amber-200':''"
        >
          Vazio
        </div>
      </div>
    </div>
  </div>
</template>