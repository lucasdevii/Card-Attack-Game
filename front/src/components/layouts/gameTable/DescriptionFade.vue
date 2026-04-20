<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  cardClicked: Object
});
</script>
<template>
    <div
     class="absolute left-0 top-0 bottom-0 w-[32vw] bg-gradient-to-r from-black/80 to-transparent break-words duration-300 p-5 z-10 pointer-events-none" 
     :class="props.cardClicked?.index !== null? '':'-translate-x-[200%]'"
    >
      <div>
        <h1 class="mb-6 text-[18px]">{{props.cardClicked?.card?.name}}</h1>
        <span class="text-[12px]">{{props.cardClicked?.card?.description}}</span>
      </div>
    </div>
</template>