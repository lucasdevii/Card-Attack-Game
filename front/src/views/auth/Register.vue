<script setup>
import { ref } from 'vue';
import { faEnvelope, faKey, faUserTag } from '@fortawesome/free-solid-svg-icons';
import InputWithIcon from '@/components/ui/InputWithIcon.vue';
import { cadaster } from '@/services/AuthService.js'

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const sendInfos = async () => {
  const res = await cadaster({
    name: name.value,
    email: email.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value
  });
  console.log(res)
}

</script>

<template>
  <div class="min-h-screen flex">
    <div class="flex-1 bg-gradient-to-br from-slate-900 to-black flex justify-center items-center flex-col">
      <h1 class="mb-4 text-xl font-bold">CADASTRO</h1>
      <div class="w-[420px] bg-slate-800 rounded-2xl px-6 py-12 shadow-xl flex flex-col gap-4">
        <!-- Email -->
        <InputWithIcon 
          type="text" 
          :icon="faUserTag" 
          placeholder="Nome"
          v-model:value="name"
        />  
        <!-- Email -->
        <InputWithIcon 
          type="email" 
          :icon="faEnvelope" 
          placeholder="Email"
          v-model:value="email"
        />  
        
        <!-- Senha -->
        <InputWithIcon 
          type="password" 
          :icon="faKey" 
          placeholder="Senha"
          v-model:value="password"
        />                

        <!-- Repetir senha -->
        <InputWithIcon 
          type="password" 
          :icon="faKey" 
          placeholder="Repetir Senha"
          v-model:value="passwordConfirmation"
        />

        <button 
          class="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
          @click="sendInfos()"
        >
          Criar conta
        </button>
        <div class="flex justify-end w-full">
            <span class="text-xs cursor-pointer">Já tenho uma conta</span>
        </div>
      </div>

    </div>
  </div>
</template>
