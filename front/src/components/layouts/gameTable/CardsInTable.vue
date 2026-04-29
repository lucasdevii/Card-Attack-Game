<script setup>
import { nextTick } from 'vue';
import Card from '@/components/ui/cards/Card.vue';
import CardsStructure from '@/components/ui/cards/CardsStructure.vue';

const props = defineProps({
  cardsDispatched: {type: Object},
  cardClicked: {type: Object},
  cheap: {type: Array}
});

const emit = defineEmits(["update:cardsDispatched","update:cheap","update:cardClicked"]);

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

    const updatedHand = [...props.cheap];
    updatedHand.splice(props.cardClicked.index, 1);
    emit("update:cheap", updatedHand);
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
    <div class="w-full flex justify-center h-[270px]">

      <CardsStructure 
        :cardsDispatched="props.cardsDispatched"
        :cardClicked="props.cardClicked"
        :cheap="props.cheap"
        @update:cardsDispatched="event => emit('update:cardsDispatched', event)"
        @update:cardClicked="event => emit('update:cardClicked', event)"
        @update:cheap="event => emit('update:cheap', event)"
      />
      
    </div>
  </div>
</template>