<script setup>
import { faVoicemail } from '@fortawesome/free-solid-svg-icons';
import InputWithIcon from '@/components/ui/InputWithIcon.vue';


</script>
<template>
    <div class="min-h-screen flex">
        <div class="flex-1 bg-gradient-to-br from-slate-900 to-black flex justify-center items-center">
            <div class="w-[800px] h-[400px] bg-stone-800/10 rounded-2xl p-5">
                <div class="flex flex-col">
                    <input type="text" placeholder="Name" id="name" value="" class="text-black input-primary">
                </div>
                <div class="flex flex-col">
                    <input type="email" placeholder="Exemple123@gmail.com" id="email" value="" class="text-black input-primary">
                </div>
                <div class="flex flex-col">
                    <input type="text" placeholder="Password" id="password" value="" class="text-black input-primary">
                </div>
                <!-- Repetir senha -->
                <InputWithIcon type="text" :icon="faVoicemail" placeholder="Repetir Senha"/>
            </div>
        </div>
    </div>
</template>

