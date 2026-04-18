<script setup>
import { ref } from 'vue';
import { faEnvelope, faKey, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { cadaster } from '@/services/AuthService.js'
import InputWithIcon from '@/components/ui/InputWithIcon.vue';


const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const errorValidation = ref({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
})

const sendInfos = async () => {
  try{
      await cadaster({
        name: name.value,
        email: email.value,
        password: password.value,
        passwordConfirmation: passwordConfirmation.value
      });
  }catch (err) {
      const errors = err.response?.data?.errors?.fieldErrors;

      if (errors) {
        errorValidation.value = {
          name: errors.name?.[0] || "",
          email: errors.email?.[0] || "",
          password: errors.password?.[0] || "",
          passwordConfirmation: errors.passwordConfirmation?.[0] || ""
        };
      }
  }

}

</script>

<template>
  <div class="min-h-screen flex">
    <div class="flex-1 bg-gradient-to-br from-slate-900 to-black flex justify-center items-center flex-col">
      <h1 class="mb-4 text-xl font-bold">CADASTRO</h1>
      <div class="w-[420px] bg-slate-800 rounded-2xl px-4 py-8 shadow-xl flex flex-col">
        <!-- Nome -->
        <div>
          <InputWithIcon 
            type="text" 
            :icon="faUserTag" 
            placeholder="Nome"
            v-model:value="name"
          />  
          <span class="text-red-500 text-xs block min-h-[14px]">{{ errorValidation.name }}</span>
        </div>

        <!-- Email -->
        <div class="mt-4">
          <InputWithIcon 
            type="email" 
            :icon="faEnvelope" 
            placeholder="Email"
            v-model:value="email"
          />  
          <span class="text-red-500 text-xs block min-h-[14px]">{{ errorValidation.email }}</span>     
        </div>
           
        <!-- Senha -->
        <div class="mt-4">
          <InputWithIcon 
            type="password" 
            :icon="faKey" 
            placeholder="Senha"
            v-model:value="password"
          />                
          <span class="text-red-500 text-xs block min-h-[14px]">{{ errorValidation.password }}</span>
        </div>

        <!-- Repetir senha -->
        <div class="mt-4">
          <InputWithIcon 
            type="password" 
            :icon="faKey" 
            placeholder="Repetir Senha"
            v-model:value="passwordConfirmation"
          />
          <span class="text-red-500 text-xs block min-h-[14px]" >{{ errorValidation.passwordConfirmation }}</span>
        </div>
        <button 
          class="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
          @click="sendInfos()"
        >
          Criar conta
        </button>
        <div class="flex justify-end w-full mt-2">
            <span class="text-xs cursor-pointer">Já tenho uma conta</span>
        </div>
      </div>

    </div>
  </div>
</template>
