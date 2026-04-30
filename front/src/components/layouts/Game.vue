<template>
  <div class="flex h-screen bg-slate-950 text-slate-100">
    <!-- Procurar Jogo -->
    <div v-if="!inGame" class="flex w-full">
      <!-- Informações do Usuário -->
      <div class="w-64 p-5 bg-slate-900 border-r border-slate-700">
        <div class="mb-5">
          <h3 class="text-lg font-semibold">{{ user?.name || 'Usuário' }}</h3>
          <p class="text-sm text-slate-400">Email: {{ user?.email || 'email@example.com' }}</p>
        </div>
        <div class="text-center">
          <h4 class="text-sm font-medium text-slate-300">Day Strike</h4>
          <p class="text-2xl font-bold text-indigo-400">{{ dayStrike }} dias consecutivos</p>
        </div>
      </div>

      <!-- Procurar Jogo -->
      <div class="flex-1 p-5">
        <h1 class="text-2xl font-bold mb-5">Procurar Jogo</h1>
        <div class="flex gap-5">
          <!-- Jogos Disponíveis -->
          <div class="flex-1 p-5 border border-slate-700 rounded-md bg-slate-800">
            <h2 class="text-lg font-semibold mb-4">Jogos Disponíveis</h2>
            <button @click="createGame" class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 border-none rounded cursor-pointer mb-5 transition-colors">Criar Novo Jogo</button>
            <div class="mt-5 space-y-3">
              <div v-for="game in availableGames" :key="game.id" class="border border-slate-600 p-3 cursor-pointer bg-slate-700 rounded hover:bg-slate-600 transition-colors" @click="joinGame(game)">
                <p class="font-semibold"><strong>{{ game.name }}</strong></p>
                <p class="text-sm text-slate-400">Jogadores: {{ game.players.length }}/4</p>
                <p class="text-sm text-slate-400">Status: {{ game.status }}</p>
              </div>
              <p v-if="availableGames.length === 0" class="text-slate-400">Nenhum jogo disponível. Crie um novo!</p>
            </div>
          </div>

          <!-- Jogar com Amigos -->
          <div class="flex-1 p-5 border border-slate-700 rounded-md bg-slate-800">
            <h2 class="text-lg font-semibold mb-4">Jogar com Amigos</h2>
            <input v-model="friendCode" type="text" placeholder="Código do amigo ou ID" class="w-full p-2.5 mb-2.5 border border-slate-600 rounded bg-slate-700 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none">
            <button @click="joinFriendGame" class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 border-none rounded cursor-pointer mb-5 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors" :disabled="!friendCode">Entrar no Jogo do Amigo</button>
            <p class="text-xs text-slate-400">Compartilhe seu código: {{ user?.id || 'SeuID' }}</p>
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

<script setup>
import { ref, onMounted } from 'vue';
import Table from '@/components/layouts/gameTable/Table.vue';
import { getCards } from '@/services/CardService';
import { user } from '@/composables/useAuth';

const inGame = ref(false);
const gameCards = ref([]);
const friendCode = ref('');
const dayStrike = ref(5); // Mockado

const availableGames = ref([
  { id: 1, name: 'Sala 1', players: ['Player1'], status: 'Aguardando' },
  { id: 2, name: 'Sala 2', players: ['Player1', 'Player2'], status: 'Em andamento' },
  // Mock data
]);

const createGame = () => {
  // Simular criação de jogo
  const newGame = { id: Date.now(), name: `Sala ${availableGames.value.length + 1}`, players: [user.value?.name || 'Você'], status: 'Aguardando' };
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