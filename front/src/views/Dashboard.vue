<script setup>
import Cards from '@/components/layouts/Cards.vue';
import GameTable from '@/components/layouts/GameTable.vue';
import SideBar from '@/components/ui/SideBar.vue';
import { ref } from 'vue';

const sections = {
    'game' : 1,
    'decks' : 2,
    'community' : 3,
    'config' : 4
}
const currentSection = ref(sections.game);

const sideIsExpanded = ref(true);
</script>
<template>
    <div class="flex h-screen w-screen">
        <SideBar 
            class="z-40" 
            :sections="sections" 
            v-model:currentSection="currentSection"
            v-model:sideIsExpanded="sideIsExpanded"
        />
        <div 
            class="flex-1 duration-300 transition-all overflow-hidden"
            :class="sideIsExpanded? 'pl-60':'pl-20'"
        >
            <GameTable v-if="currentSection == sections.game"/>
            <Cards v-if="currentSection == sections.decks"/>
        </div>
    </div>
</template>