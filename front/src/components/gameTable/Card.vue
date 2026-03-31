<script setup>
const props = defineProps({
    image: {
        type: String
    },
    name: {
        type: String
    }, 
    description: {
        type: String
    }
})
</script>
<template>
        <div class="bg-gray-900 w-[240px] h-[400px] p-3 rounded-2xl space-y-2 hover:scale-105 transition-transform cursor-pointer">
            <!-- Imagem -->
            <div class="bg-black w-full h-2/5 flex justify-center items-center">
                <img :src="image" alt="" v-if="image">
                <span v-else>Sem imagem</span>
            </div>
            
            <div class="h-3/5">
                <!-- Descrição -->
                <div class="flex flex-col h-5/6">
                    <div class="flex-1 border rounded-lg p-1 overflow-auto">
                        <p class="break-words text-xs">
                        Faz tal coisa e bla bla, mas tambem faz isso e aquilo lá que é bem bacana para que o mundo continue sendo bom e ruim ao mesmo tempo fora dessa realidade material demiurgeal onde nós sofremos em um loop incessante de dor e sofrimento assim fazendo com que o mundo 
                        </p>
                    </div>
                </div>
                <!-- Atributos -->
                <div class="flex h-1/6 text-xs justify-between items-center">
                    <span>Vida: 100</span>
                    <div class="space-x-1">
                        <span>Defesa: 200</span>
                        <span>Ataque: 20</span>
                    </div>
                </div>
            </div>
        </div>
</template>