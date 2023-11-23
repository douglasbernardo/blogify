<template>
  <v-sheet max-width="500" class="mx-auto ma-4 pa-4 w-100 form">
    <h4 id="changeText" text-bold class="text-center ma-2">Deseja fazer parte do Blogify?</h4>
    <v-alert
    type="info"
    class="ma-1"
    closable
    text="Bem-vindo(a) ao Blogify! Estamos empolgados para ajudá-lo(a) a compartilhar suas paixões e conhecimentos com as pessoas. Faça seu cadastro para começar a escrever sobre os temas que mais te fascinam."
    variant="tonal"
  ></v-alert>
    <v-alert
        v-if="props.user.email && !validateEmail"
        class="mb-5"
        type="error"
    >E-mail Invalido</v-alert>
    <v-alert
        v-if="props.user.confirmPassword && props.user.password !== props.user.confirmPassword"
        class="mb-5"
        type="error"
    >Senhas não batem</v-alert>
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="props.user.name"
        label="Nome"
      ></v-text-field>

      <v-text-field
        v-model="props.user.email"
        label="E-mail"
      ></v-text-field>
      <v-text-field
        v-model="props.user.password"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append-inner="showPassword = !showPassword"
        label="Senha"
      ></v-text-field>
      <v-text-field
        v-model="props.user.confirmPassword"
        :type="showPassword ? 'text' : 'password'"
        label="Confirme sua senha"
      ></v-text-field>
      <v-row justify="center" no-gutters>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-btn
          text-bold
          border-radius="5"
          block
          class="text-none mb-2 font-weight-black"
          color="indigo-darken-3"
          size="x-large"
          variant="flat"
          @click="$emit('add_user')"
        >
          Me Cadastrar
            <v-progress-circular
                v-if="loading && props.user.name
                && props.user.email && props.user.password && props.user.confirmPassword"
                class="ml-10" indeterminate
            ></v-progress-circular>
        </v-btn>
      </v-col>
      </v-row>
      <v-btn
        text-bold
        block
        @click="navigateTo('/user/login')"
        class="text-none mb-5 font-weight-black"
        color="indigo-darken-3"
        size="large"
        variant="text"
      >
        Já faço parte
      </v-btn>
    </v-form>
  </v-sheet>
</template>
<script lang="ts" setup>
const props = defineProps({
  user: Object,
  loading: Boolean
})
const showPassword = ref(false)
const validateEmail = computed(()=>{
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(props.user.email);
})
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  #changeText{
    font-size:40px;
    font-family: monospace;
  }
  .form{
    margin-top: 0;
    font-family: monospace;
  }
</style>