<template>
<v-card>
  <v-card-title class="bg-primary">
    Deseja realmente deletar sua conta?
  </v-card-title>
  <v-card-text>
    <v-icon>mdi-information</v-icon>
      Caso delete não haverá como retomar com ela, somente criando outra
  </v-card-text>
  <v-card-actions class="ma-2">
    <v-btn
      color="green"
      variant="flat"
      size="small"
      @click="$emit('cancel')"
    >
      Cancelar
    </v-btn>
    <v-btn
      variant="text"
      color="red"
      @click="$emit('delete')"
    >
      Deletar
    </v-btn>
  </v-card-actions>
</v-card>
</template>
<script setup lang="ts">
</script>