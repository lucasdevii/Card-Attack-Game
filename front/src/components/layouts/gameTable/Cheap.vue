<script setup>
import Card from '@/components/ui/cards/Card.vue';

const props = defineProps({
  userCardsDispatched: Object,
  currentCards: Array,
  cardClicked: Object,
})
const emit = defineEmits(['update:cardClicked']);

const clickInCard = (index) => {
  if(props.cardClicked.index === index){
    const cardClicked = {index: null, card: null, line: null};
    emit('update:cardClicked', cardClicked);
    return
  }

  const cardClicked = {index: index, card: props.currentCards[index], line: 'hand'};
  emit('update:cardClicked', cardClicked);
}

</script>
<template>
    <div class="absolute top-1/2 w-full p-3 flex justify-between pointer-events-none ">
      <div class="relative">
        <div class="absolute flex space-x-3">
          <div class="w-[150px] h-[200px] bg-gray-800 rounded-xl">
            
          </div>
        </div>
      </div>
    </div>
</template>