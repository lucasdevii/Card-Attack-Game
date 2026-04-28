<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  userCardsDispatched: Object,
  currentCards: Array,
  cardClicked: Object,
})
const emit = defineEmits(['update:cardClicked']);

const clickInCheap = () => {
  
}
</script>
<template>
  <div class="deck-container p-3 hover:scale-105 transition-transform pointer-events-auto cursor-pointer" @click="clickInCheap">
    <div
      v-for="(card, index) in currentCards"
      :key="index"
      class="card-back animate-enter"
      :style="{
        '--final-x': `${index * -2}px`,
        '--final-y': `${index * -1}px`,
        zIndex: index,
        animationDelay: `${index * 0.1}s`
      }"
      @click="clickInCheap"
    >
      <!-- Card back design -->
      <div class="w-[100px] card bg-slate-800 border-2 border-gray-950 rounded-lg flex items-center justify-center">
        <div class="text-white text-sm font-semibold">Deck</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-back {
  position: absolute;
  transition: transform 1s ease-out;
  transform: translateX(-100vw) translateY(var(--final-y));
}

.animate-enter {
  animation: slideIn 0.7s ease-out forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(-200px) translateY(var(--final-y));
  }
  to {
    transform: translateX(var(--final-x)) translateY(var(--final-y));
  }
}
</style>