<script setup>
import { nextTick } from 'vue';
import Card from './Card.vue';

const props = defineProps({
  cardsDispatched: {type: Object},
  cardClicked: {type: Object},
  cheap: {type: Array},
  position: {type: String, default: 'horizontal'} // Para reutilização em diferentes cantos
});

const emit = defineEmits(["update:cardsDispatched","update:cheap","update:cardClicked"]);

 /**
  * @returns void
  * @param index do slot de carta
  * @param line front ou back
  */
const addCardInSlot = (index, line) => {
  if (!props.cardClicked?.card) return; // Se não tiver carta selecionada, não faz nada

  const selectedCard = props.cardClicked.card;
  const updatedBoard = {
    front: [...props.cardsDispatched.front],
    back: [...props.cardsDispatched.back]
  };

  updatedBoard[line][index] = selectedCard;
  emit("update:cardsDispatched", updatedBoard);

  const updatedHand = [...props.cheap];
  if (props.cardClicked?.line === 'cheap') {
    const cardIndex = updatedHand.findIndex(c => c?.id === selectedCard?.id);
    if (cardIndex !== -1) {
      updatedHand.splice(cardIndex, 1);
    }
  } else if (props.cardClicked?.index !== null && props.cardClicked?.index !== undefined) {
    updatedHand.splice(props.cardClicked.index, 1);
  }
  emit("update:cheap", updatedHand);
  emit("update:cardClicked", { index: null, card: null, line: null });
}

 /**
  * @returns void
  * @param index do slot de carta
  * @param line front ou back
  * @param card objeto da carta clicada
  */
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
  <div class="w-full flex flex-col my-4 relative space-y-3" :class="position === 'vertical' ? 'flex-row space-y-0 space-x-3' : ''">
    <div class="w-full flex justify-center h-[120px]" :class="position === 'vertical' ? 'flex-col h-auto' : ''">
      <div 
        v-for="(card,index) in props.cardsDispatched.front"
        :key="index"
        class="mx-4 flex justify-center items-center h-full w-[75px]"
        :class="position === 'vertical' ? 'mx-0 my-4 w-full h-[75px]' : ''"
      >
        <Card 
          v-if="card?.description" 
          :cardInfo="card" @click="clickInCard(index, card, 'front')"
          :class="props.cardClicked?.index == index && props.cardClicked?.line == 'front' ?
            'shadow-[0_0_15px_rgba(251,191,36,0.5)] shadow-cyan-700':''" 
        />
        <div 
          v-else 
          @click="addCardInSlot(index, 'front')"
          class="bg-gray-800 w-full h-full flex justify-center items-center rounded-md cursor-pointer hover:scale-105 transition-transform"
          :class="props.cardClicked?.index != null && (props.cardClicked?.line != 'front' && props.cardClicked?.line != 'back') ? 'shadow-[0_0_15px_rgba(251,191,36,0.5)] shadow-amber-200':''"
        >
          Vazio
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center h-[120px]" :class="position === 'vertical' ? 'flex-col h-auto' : ''">
      <div 
        v-for="(card,index) in props.cardsDispatched.back"
        :key="index"
        class="mx-4 flex justify-center items-center h-full w-[75px]"
        :class="position === 'vertical' ? 'mx-0 my-4 w-full h-[75px]' : ''"
      >
        <Card 
          v-if="card?.description" 
          :cardInfo="card" @click="clickInCard(index, card, 'back')"
          :class="props.cardClicked?.index == index && props.cardClicked?.line == 'back' ?
            'shadow-[0_0_15px_rgba(251,191,36,0.5)] shadow-cyan-700':''" 
        />
        <div 
          v-else 
          @click="addCardInSlot(index, 'back')"
          class="bg-gray-800 w-full h-full flex justify-center items-center rounded-md cursor-pointer hover:scale-105 transition-transform"
          :class="props.cardClicked?.index != null && (props.cardClicked?.line != 'front' && props.cardClicked?.line != 'back') ? 'shadow-[0_0_15px_rgba(251,191,36,0.5)] shadow-amber-200':''"
        >
          Vazio
        </div>
      </div>
    </div>
  </div>
</template>