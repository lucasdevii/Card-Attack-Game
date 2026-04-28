<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  userCardsDispatched: Object,
  cheap: Array,
  cardClicked: Object,
})
const emit = defineEmits(['update:cardClicked']);

const clickInCheap = () => {
  console.log('click in cheap')
  if(props.cardClicked?.card == null){
    console.log('click in cheap null')
    emit('update:cardClicked', {index: null, card: props.cheap[props.cheap.length - 1], line: 'cheap'})
    return
  }
  console.log('click in cheap not null')
  emit('update:cardClicked', {index: null, card: null, line: null});
}
</script>
<template>
  <div class="card-wrapper deck-container p-3 hover:scale-105 transition-transform pointer-events-auto cursor-pointer"  @click="clickInCheap">
    <div
      v-for="(card, index) in cheap"
      :key="index"
      class="card-back animate-enter"
      :style="{
        '--final-x': `${index * -2}px`,
        '--final-y': `${index * -1}px`,
        zIndex: index,
        animationDelay: `${index * 0.1}s`,
      }"
    >
      <!-- Card back design -->
      <div 
        :style="props.cardClicked?.card?.id === card?.id && cardClicked?.line === 'cheap' ? 'transform: rotateY(180deg) translateY(-12rem);' : ''"
        class="w-[100px] card bg-slate-800 border-2 border-gray-950 rounded-lg flex items-center justify-center transition-transform duration-300">
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