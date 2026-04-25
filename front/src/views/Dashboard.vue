<script setup>
import Cards from '@/components/layouts/Cards.vue';
import {getCards} from '@/services/CardService.js';
import GameTable from '@/components/layouts/GameTable.vue';
import SideBar from '@/components/ui/SideBar.vue';
import { onMounted, ref } from 'vue';

// Lógica para controle de seções e sidebar
const sideIsExpanded = ref(true);
const sections = {
    'game' : 1,
    'decks' : 2,
    'community' : 3,
    'config' : 4
}
const currentSection = ref(sections.game);

// REQUISIÇÕES
const cards = ref([]);

onMounted(async () => {
    cards.value = await getCards();
    console.log(cards.value)
})
</script>
<template>
    <div class="flex h-screen w-screen bg-slate-900">
        <SideBar 
            class="z-40" 
            :sections="sections" 
            v-model:currentSection="currentSection"
            v-model:sideIsExpanded="sideIsExpanded"
        />
        <div 
            class="flex-1 duration-300 transition-all overflow-x-hidden"
            :class="sideIsExpanded? 'pl-60':'pl-20'"
        >
            <GameTable v-if="currentSection == sections.game" :cards="cards"/>
            <Cards v-if="currentSection == sections.decks" :cards="cards"/>
        </div>
    </div>
</template>