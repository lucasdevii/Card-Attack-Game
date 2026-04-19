<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { login } from '@/services/AuthService';
import InputWithIcon from '../../components/ui/form/InputWithIcon.vue';

const router = useRouter();

const email = ref("");
const password = ref("");

const validationBase = {
    email: "",
    password: "",
}

const errorValidation = ref({...validationBase});

const handleLogin = async () => {
    try {
        errorValidation.value = {...validationBase};
        
        const res = await login({
            email: email.value,
            password: password.value
        });
        console.log(res);
    } catch (err) {
        const errors = err.response?.data?.errors?.fieldErrors;

        if (errors) {
            errorValidation.value = {
                email: errors.email?.[0] || "",
                password: errors.password?.[0] || "",
            };
        }
    }
}
const handleRegister = () => {
    router.push("/register");
}
</script>
<template>
    <div class="min-h-screen flex">
        <div class="flex-1 bg-gradient-to-br from-slate-900 to-black flex justify-center items-center flex-col">
            <h1 class="mb-4 text-xl font-bold">LOGIN</h1>
            <div class="w-[420px] bg-slate-800 rounded-2xl px-4 py-8 shadow-black shadow-xl flex flex-col">
                <!-- Email -->
                <div>
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

                <button 
                class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                @click="handleLogin"
                >
                Entrar
                </button>

                <p class="mt-4 text-sm text-gray-400">
                Não tem uma conta? 
                <span @click="handleRegister" class="text-blue-500 hover:underline cursor-pointer">Cadastre-se</span>
                </p>
            </div>
        </div>
    </div>
</template>