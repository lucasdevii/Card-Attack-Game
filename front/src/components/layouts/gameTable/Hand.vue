<script setup>
import Card from '@/components/layouts/gameTable/Card.vue';

const props = defineProps({
  userCardsDispatched: Object,
  currentCards: Array,
  cardClicked: Object,
})
const emit = defineEmits(['update:cardClicked']);

const clickInCard = (index) => {
  if(props.cardClicked.index === index){
    const cardClicked = {index: null, card: null};
    emit('update:cardClicked', cardClicked);
    return
  }

  const cardClicked = {index: index, card: props.currentCards[index]};
  emit('update:cardClicked', cardClicked);
}

</script>
<template>
    <div class="absolute bottom-0 w-full p-3 flex justify-between pointer-events-none ">
      <div class="relative">
        <div class="absolute bottom-[-130px] flex space-x-3">
          <div 
            v-for="(card, index) in props.currentCards" 
            :key="card.id"
            @click="clickInCard(index)"
            class="card-wrapper transition-transform duration-500 ease-in-out cursor-pointer pointer-events-auto"
            style="width: 140px"
            :class="props.cardClicked.index === index
              ? 'translate-y-[-200px] scale-105 z-50'
              : 'hover:-translate-y-10'"
          >
            <Card :cardInfo="card" class="shadow-slate-800 shadow-md"/>
          </div>
        </div>
      </div>
    </div>
</template>