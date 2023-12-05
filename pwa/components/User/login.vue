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
    <v-form fast-fail @submit.prevent>
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
            text-bold
            block
            border-radius="5"
            class="text-none mb-2 font-weight-black"
            color="indigo-darken-3"
            size="x-large"
            variant="flat"
            @click="$emit('login')"
          >
            Fazer o Login
          </v-btn>
        </v-col>
        <v-col cols="12" sm="10" md="10" lg="12">
          <GoogleButton/>
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
  </v-sheet>
</template>
<script lang="ts" setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useAuthStore } from '~/store/user/authStore';
const clearErrorMessages = useAuthStore().clearErrorMessages
const mobile = useDisplay()
const showPassword = ref(false)
const props = defineProps({
  user: Object,
  errorMessages: Array<string>
})
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