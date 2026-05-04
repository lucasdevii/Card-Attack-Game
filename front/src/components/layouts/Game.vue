<script setup>
import { ref, onMounted } from 'vue';
import Table from '@/components/layouts/gameTable/Table.vue';
import ButtonWithIcon from '../ui/form/ButtonWithIcon.vue';
import { getCards } from '@/services/CardService';
import { user } from '@/composables/useAuth';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const inGame = ref(false);
const gameCards = ref([]);
const friendCode = ref('');
const dayStrike = ref(5); // Mockado

const availableGames = ref([
    // Mock data
    { id: 1, name: 'Sala 1', players: ['Player1'], status: 'Aguardando' },
    { id: 2, name: 'Sala 2', players: ['Player1', 'Player2'], status: 'Em andamento' },

]);

const createGame = () => {
    // Simular criação de jogo
    const newGame = { 
        id: Date.now(), 
        name: `Sala ${availableGames.value.length + 1}`, 
        players: [user.value?.name || 'Você'], 
        status: 'Aguardando' };
    availableGames.value.push(newGame);
    joinGame(newGame);
};

const joinGame = async (game) => {
    // Simular entrada no jogo
    inGame.value = true;
    // Buscar cartas para o jogo
    try {
        const cards = await getCards();
        gameCards.value = cards.slice(0, 10); // Pegar primeiras 10 cartas como exemplo
    } catch (error) {
        console.error('Erro ao buscar cartas:', error);
        gameCards.value = []; // Fallback
    }
};

const joinFriendGame = () => {
    // Simular entrada no jogo do amigo
    if (friendCode.value) {
        // Mock: Criar um jogo com amigo
        const friendGame = { id: Date.now(), name: `Jogo com ${friendCode.value}`, players: [user.value?.name || 'Você', friendCode.value], status: 'Em andamento' };
        joinGame(friendGame);
    }
};

const leaveGame = () => {
    inGame.value = false;
    gameCards.value = [];
};
</script>

<template>
    <div class="h-screen flex bg-slate-950 text-slate-100">
        <!-- Procurar Jogo -->
        <div v-if="!inGame" class="flex flex-col w-full">
            <!-- Informações do Usuário -->
            <div class="w-full p-5 bg-slate-900 border-r border-slate-700">
                <div class="">
                <p class="text-sm text-slate-400">Email: {{ user?.email || 'email@example.com' }}</p>
                </div>
                <div class="text-center">
                <h4 class="text-sm font-medium text-slate-300">Day Strike</h4>
                <p class="text-2xl font-bold text-indigo-400">{{ dayStrike }} dias consecutivos</p>
                </div>
            </div>

            <!-- Procurar Jogo -->
            <div class="w-full p-5">
                <h1 class="text-2xl font-bold mb-5">Procurar Jogo</h1>
                <div class="flex gap-4">
                    <!-- Jogos Disponíveis -->
                    <div class="flex-1 flex flex-col justify-between p-5 border border-slate-700 rounded-md bg-slate-800">
                        <div class="w-60">
                            <button class="button-primary" @click="createGame">Jogar</button>
                        </div>
                        <div class=" space-y-3">
                            <h1 class="text-2xl text-gold font-semibold">ELO: {{ user?.elo || 1000 }}</h1>
                        </div>
                    </div>

                    <!-- Jogar com Amigos -->
                    <div class="flex-1 p-5 border border-slate-700 rounded-md bg-slate-800">
                        <h2 class="text-lg font-semibold mb-4">Juntar-se</h2>
                        <input v-model="friendCode" type="text" placeholder="Código do amigo ou ID" class="w-full p-2.5 mb-2.5 border border-slate-600 rounded bg-slate-700 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none">
                        <button @click="joinFriendGame" class="button-primary" :disabled="!friendCode">Entrar</button>
                        <p class="text-xs text-slate-400 mt-1">Compartilhe seu código: {{ user?.id || 'SeuID' }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mesa de Jogo -->
        <div v-else class="relative w-full bg-slate-950">
        <button @click="leaveGame" class="absolute top-2.5 left-2.5 bg-red-500 hover:bg-red-600 text-white px-2.5 py-1.5 border-none rounded cursor-pointer z-10 transition-colors">Voltar à Procura</button>
        <Table :cards="gameCards" />
        </div>
    </div>
</template>

<style scoped>
/* Estilos reutilizáveis ou custom podem ser adicionados aqui se necessário */

.create-game-btn, .join-friend-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.join-friend-btn:disabled {
  cursor: not-allowed;
}

.friend-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.friend-note {
  font-size: 12px;
  color: #666;
}

.game-list {
  margin-top: 20px;
}

.game-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 3px;
}
</style>