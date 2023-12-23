<template>
  <v-card
    class="mx-auto my-8"
    max-width="344"
    elevation="16"
  >
    <v-card-item>
      <v-card-title>
        Carregando Dados......
      </v-card-title>
    </v-card-item>

    <v-card-text>
      Aguarde enquanto os dados estão sendo carregados!
    </v-card-text>
    <v-progress-circular
      class="ma-3 pa-5"
      model-value="100"
      color="red-darken-2"
      indeterminate
      size="25"
    ></v-progress-circular>
  </v-card>
</template>