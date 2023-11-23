<template>
<v-card>
  <v-card-title class="bg-blue-grey">
    Deseja realmente deletar sua conta?
  </v-card-title>
  <v-card-text>
    <v-icon>mdi-information</v-icon>
      Caso delete não haverá como retomar com ela, somente criando outra
  </v-card-text>
  <v-card-actions>
    <v-btn
        color="red"
        variant="flat"
        @click="$emit('delete')"
    >
      Deletar
    </v-btn>
    <v-btn
        variant="text"
        @click="$emit('cancel')"
    >
      cancelar
    </v-btn>
  </v-card-actions>
</v-card>
</template>
<script setup lang="ts">
</script>