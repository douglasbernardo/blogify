<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field
      v-model="firstName"
      label="Nome"
      :rules="firstNameRules"
    ></v-text-field>

    <v-text-field
      v-model="lastName"
      label="E-mail"
      :rules="lastNameRules"
    ></v-text-field>
    <v-text-field
      v-model="lastName"
      label="Senha"
      :rules="lastNameRules"
    ></v-text-field>
    <v-text-field
      v-model="lastName"
      label="Confirme sua senha"
      :rules="lastNameRules"
    ></v-text-field>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="2" lg="12">
        <v-btn
        text-bold
        border-radius="5"
        block
        class="text-none mb-2 font-weight-black"
        color="indigo-darken-3"
        size="x-large"
        variant="flat"
      >
        Me Cadastrar
      </v-btn>
    </v-col>
    <v-col cols="12" sm="10" md="10" lg="12">
      <v-btn
        text-bold
        block
        border-radius="5"
        append-icon="mdi-google"
        class="text-none font-weight-black"
        color="indigo-darken-3"
        size="x-large"
        variant="tonal"
        >
          Cadastro com Google
        </v-btn>
      </v-col>
    </v-row>
    <v-btn
      text-bold
      block
      @click="navigateTo('/auth/login')"
      class="text-none mb-5 font-weight-black"
      color="indigo-darken-3"
      size="large"
      variant="text"
    >
      Já faço parte
    </v-btn>
  </v-form>
</template>