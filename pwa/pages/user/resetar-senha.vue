<template>
  <v-container>
    <v-sheet class="mx-auto" width="300">
      <h3 class="text-center ma-2">Crie sua nova senha</h3>
      <v-alert 
        class="ma-2" 
        v-if="authStore.passReset.passChanged" 
        icon="$success"
        type="success"
        variant="tonal"
        closable
      >{{ authStore.passReset.message }}</v-alert>
      <v-form fast-fail @submit.prevent>
        <v-alert 
          class="ma-2" 
          v-if="messageError" 
          @click:close="messageError=''"
          icon="$error"
          type="error"
          variant="tonal"
          closable
        >{{ messageError }}</v-alert>
        <v-text-field
          v-model="password"
          label="Senha"
          :type="!showPass ? 'password' : 'text'"
          :append-inner-icon="!showPass ? 'mdi-eye-closed' : 'mdi-eye-outline'"
          @click:append-inner="showPass=!showPass"
        />
        <v-text-field
          v-model="confirmPass"
          :type="!showPass ? 'password' : 'text'"
          label="Confirme sua senha"
        />
        <v-btn class="mt-2 rounded-xl" color="blue" type="submit" block @click="resetPass">Enviar</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore } from '~/store/user/authStore'
  const authStore = useAuthStore()
  const route = useRoute()
  const router = useRouter()
  const password = ref()
  const confirmPass = ref()
  const showPass = ref(false)
  const messageError = ref()

  const resetPass = async () => {
    messageError.value = ''
    if(!password.value || !confirmPass.value){
      messageError.value = 'As senhas não podem ser vazios'
      return 
    }
    if(password.value !== confirmPass.value){
      messageError.value = 'As senhas não batem'
      return 
    }
    try {
      await authStore.reset_my_password(route.query.token, password.value)
      setTimeout(()=>{
        router.push('/user/login')
      },4000)
    } catch (e) {
      messageError.value = 'Não foi possível redefinir a senha. Tente novamente.';
    }
  }

</script>
