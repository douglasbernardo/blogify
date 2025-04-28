<template>
  <v-sheet max-width="500" class="mx-auto ma-4 pa-4 w-100 form">
    <h4 id="changeText" text-bold class="text-center ma-2">Bem vindo(a) ao BLOGIFY</h4>
    <v-alert
    type="info"
    class="ma-1"
    closable
    text="Faça o login para continuar compartilhando suas paixões e conhecimentos com as pessoas."
    variant="tonal"
  ></v-alert>
    <v-form @submit.prevent="$emit('login')">
      <v-alert
        v-if="errorMessages?.length"
        v-for="(error, index) in errorMessages"
        :key="index"
        closable
        :text="error"
        icon="$error"
        type="error"
        variant="tonal"
        @click:close="clearErrorMessages"
      />
      <v-text-field
        v-model="user.email"
        label="E-mail"
        :rules="lastNameRules"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        label="Senha"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="!showPassword ? 'password' : 'text'"
        @click:append-inner="showPassword=!showPassword"
        :rules="lastNameRules"
      ></v-text-field>

      <v-row justify="center" no-gutters>
        <v-col cols="12" sm="12" md="2" lg="12">
          <v-btn
            type="submit"
            text-bold
            block
            border-radius="5"
            class="text-none mb-2 font-weight-black"
            color="indigo-darken-3"
            size="x-large"
            variant="flat"
          >
            Fazer o Login
          </v-btn>
        </v-col>
        <v-col>
          <GoogleButton/>
        </v-col>
        <v-col cols="5">
          <v-btn
            @click="forgotPasswordDialog=!forgotPasswordDialog"
            class="text-none"
            color="indigo-darken-4"
            variant="text"
          >
            Esqueceu a senha ?
          </v-btn>
        </v-col>
      </v-row>
      <v-btn
        text-bold
        block
        border-radius="5"
        @click="navigateTo('/user/signup')"
        class="text-none mb-5 font-weight-black"
        color="indigo-darken-2"
        size="large"
        variant="text"
      >
        Ainda não faz parte ?
      </v-btn>
    </v-form>
    <v-dialog v-model="forgotPasswordDialog" width="400">
      <v-card class="rounded-xl ma-2">
        <div v-if="authStore.emailSent">
          <v-alert
            closable
            prominent
            :text="`Foi enviado um e-mail para ${emailForgotPass}, verifique e redefina sua senha`"
            icon="$success"
            type="success"
            variant="tonal"
            @click:close="authStore.emailSent = false"
          />
        </div>
        <div v-if="authStore.errorMessagesResetPass.length">
          <v-alert
            v-for="(error, index) in authStore.errorMessagesResetPass"
            :key="index"
            closable
            :text="error"
            icon="$error"
            type="error"
            variant="tonal"
            @click:close="authStore.clearErrorMessagesResetPass"
          />
        </div>
        <v-card-title class="text-center">Esqueceu a senha? Redefina</v-card-title>
        <div class="ma-2 pa-2 mt-5">
          <span>Seu e-mail:</span>
          <v-text-field v-model="emailForgotPass" hint="Entre com o e-mail que você usa o CURIOUS MIND"></v-text-field>
          <v-card-actions>
            <v-btn color="indigo-darken-2" block variant="flat" @click="$emit('resetPass',emailForgotPass)">Enviar</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
<script lang="ts" setup>
import { useAuthStore } from '~/store/user/authStore';
defineProps({
  user: Object,
  errorMessages: Array<string>
})
const authStore = useAuthStore()
const clearErrorMessages = useAuthStore().clearErrorMessages
const forgotPasswordDialog = ref(false)
const emailForgotPass = ref('')
const showPassword = ref(false)
</script>
    
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  #changeText{
    font-size:40px;
    font-family: monospace;
  }
  .form{
    margin-top: 5rem;
    font-family: monospace;
  }
</style>