<template>
  <v-sheet width="300" class="mx-5 pa-5">
    <v-row class="mt-n2" justify="center" no-gutters>
      <h3 class="text-center">Foto de Perfil</h3>
      <v-icon class="ml-2">mdi-image</v-icon>
    </v-row>
    <v-form fast-fail @submit.prevent>
      <v-file-input
        @change="uploadPicture"
        label="Escolher Imagem"
      ></v-file-input>
      <v-btn type="submit" color="blue" block class="mt-2">Enviar</v-btn>
      <v-btn type="submit" @click="$emit('close')" variant="tonal" color="blue" size="small" block class="mt-2">Fechar</v-btn>
    </v-form>
  </v-sheet>
</template>
<script lang="ts" setup>
const uploadPicture = (e: any) => {
  console.log(e.target.files[0])
}
</script>