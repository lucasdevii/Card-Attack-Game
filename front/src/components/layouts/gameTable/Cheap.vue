<script setup>
import Card from '@/components/ui/cards/Card.vue';
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
    emit('update:cardClicked', {index: props.cheap.length - 1, card: props.cheap[props.cheap.length - 1], line: 'cheap'})
    return
  }
  console.log('click in cheap not null')
  emit('update:cardClicked', {index: null, card: null, line: null});
}
</script>
<template>
  <div class="card-wrapper deck-container p-3 pointer-events-auto cursor-pointer"  @click="clickInCheap">
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
      <div
        :class="[
          'card-3d w-22',
          props.cardClicked?.card?.id === card?.id && props.cardClicked?.line === 'cheap' ? 'is-flipped' : ''
        ]"
        class="w-24"
      >
        <div class="card-face card-face-front w-full h-full bg-slate-800 border-2 border-gray-950 rounded-lg flex items-center justify-center">
          <div class="text-white text-sm font-semibold">Cards</div>
        </div>
        <Card :cardInfo="card" class="card-face card-face-back"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-back {
  position: absolute;
  transform: translateX(-100vw) translateY(var(--final-y));
  perspective: 1000px;
}

.card-3d {
  aspect-ratio: 5/7;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  transform-origin: center;

}

.card-3d.is-flipped {
  transform: translateY(-12rem) rotateY(180deg);
  z-index: 40;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  pointer-events: none;
}

.card-face-back {
  transform: rotateY(180deg);
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