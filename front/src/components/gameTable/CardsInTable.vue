<script setup>
import Card from '@/components/gameTable/Card.vue';

const props = defineProps({
  cardsList: Array
});
</script>

<template>
  <div class="w-full h-[150px] bg-white flex justify-center items-center">
    
    <div 
      v-for="(index,card) in props.cardsList"
      :key="index"
      class="mx-4 flex justify-center items-center h-full w-[100px]"
    >
      <Card v-if="card.description" :cardInfo="card"/>
      <div v-else class="bg-gray-800 w-full h-full flex justify-center items-center">
        Vazio
      </div>
    </div>

  </div>
</template>