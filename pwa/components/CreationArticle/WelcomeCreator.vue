<template>
  <v-card>
    <v-card-title class="headline">Olá, {{ userName }}</v-card-title>
    <v-card-text>
      Este é o seu espaço para compartilhar ideias, histórias ou conhecimentos com o mundo.
      Use os recursos disponíveis para escrever com liberdade e criatividade.
      Quando estiver pronto, comece a escrever e mostre ao mundo o que você tem a dizer!
    </v-card-text>
    <v-card-actions>
      <v-btn class="bg-primary" @click="$emit('startStep2')">COMEÇAR</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
const userName = ref(localStorage.getItem('name'))

const emit = defineEmits([
  'startStep2'
])

</script>
