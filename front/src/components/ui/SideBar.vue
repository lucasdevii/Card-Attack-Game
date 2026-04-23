<script setup>
import { user } from '@/composables/useAuth';
import { ref, watch } from 'vue';
import { faUserGroup, faGamepad, faGear, faChevronLeft, faChevronRight, faSearch, faMoon } from '@fortawesome/free-solid-svg-icons';
import ButtonWithIcon from './form/ButtonWithIcon.vue';
import CardsDeck from './icons/CardsDeck.vue';
import Icon from './Icon.vue';

const isExpanded = ref(true);
const isDarkMode = ref(true);

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

</script>
<template>
    <div :class="isExpanded ? 'w-60' : 'w-15'" class="fixed left-0 top-0 h-full bg-slate-950 text-slate-100 shadow-2xl shadow-slate-950/30 transition-all duration-300">
        <div class="relative flex h-full flex-col justify-between">
            <button @click="toggleSidebar" class="absolute -right-4 top-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 shadow-lg shadow-black/20 transition-colors hover:bg-slate-700">
                <Icon :icon="isExpanded ? faChevronLeft : faChevronRight" class="h-4 w-4" />
            </button>

            <div class="space-y-3 px-4 pt-5">
                <div class="flex items-center justify-between hover:bg-slate-800 cursor-pointer rounded-3xl">
                    <div class="flex items-center gap-3 p-2">
                        <div class="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                            <span class="text-lg font-bold">{{ user.name[0] }}</span>
                        </div>
                        <div v-if="isExpanded" class="space-y-1">
                            <p class="text-lg font-semibold">{{ user.name }}</p>
                            <p class="text-xs text-slate-400">Informações</p>
                        </div>
                    </div>
                </div>


                <div class="space-y-3">
                    <ButtonWithIcon text="Jogar" :icon="faGamepad" :collapsed="!isExpanded" active />
                    <ButtonWithIcon text="Baralhos" :icon="CardsDeck" :collapsed="!isExpanded" />
                    <ButtonWithIcon text="Comunidade" :icon="faUserGroup" :collapsed="!isExpanded" />
                </div>
            </div>

            <div class="space-y-4 px-4 pb-6">
                <ButtonWithIcon text="Configurações" :icon="faGear" :collapsed="!isExpanded" />


                    <div class="flex items-center gap-3">
                        <div class="flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-800">
                            <Icon :icon="faMoon" class="h-4 w-4 text-slate-300" />
                        </div>
                        <div v-if="isExpanded" class="flex-1">
                            <p class="text-sm font-semibold">Modo escuro</p>
                        </div>
                        <button @click="toggleDarkMode" class="relative h-7 w-14 rounded-full bg-slate-800 transition-colors" :class="isDarkMode ? 'bg-indigo-500' : 'bg-slate-700'" v-if="isExpanded">
                            <span class="absolute left-0 top-0 h-7 w-7 rounded-full bg-white shadow-lg transition-transform" :class="isDarkMode ? 'translate-x-7' : 'translate-x-0'"></span>
                        </button>
                    </div>
            </div>
        </div>
    </div>
</template>