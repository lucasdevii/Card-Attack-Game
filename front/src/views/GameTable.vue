<script setup>
import Card from '@/components/gameTable/Card.vue';
import { ref } from 'vue';
const currentCards = ref([[],[],[]]) 
</script>
<template>
    <div class="w-screen h-screen relative overflow-y-hidden">
        <div class="absolute bottom-[-150px] w-full flex justify-center space-x-4">
            <div @click="selectCard(index)" v-for="(card, index) in currentCards" :key="index">
               <Card/>
            </div>
            
        </div>
    </div>
</template>