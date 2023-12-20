<template>
<v-card max-width="550">
  <v-card-title class="bg-primary">
    Deseja realmente deletar sua conta?
  </v-card-title>
  <v-card-text>
    <v-icon color="warning">mdi-information</v-icon>
    Se você optar por excluir sua conta, não será possível recupera-lá posteriormente, e todos os artigos que você criou também serão apagados.
  </v-card-text>
  <v-card-actions class="ma-2">
    <v-btn
      color="primary"
      variant="flat"
      size="large"
      @click="$emit('cancel')"
    >
      Cancelar
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      variant="text"
      color="red"
      @click="dialog3=!dialog3"
    >
      Deletar
    </v-btn>
  </v-card-actions>
  <v-dialog
    v-model="dialog3"
    width="350"
  >
    <v-card class="text-center">
      <v-card-title class="bg-primary">
        <span>Deletar conta</span>
      </v-card-title>
      <v-card-text>
        <span>Deletar minha conta e todos os artigos criados por mim</span>
      </v-card-text>
      <v-card-actions class="mt-5">
        <v-btn
          color="primary"
          variant="flat"
          @click="$router.go(-1)"
        >
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          variant="text"
          size="small"
          @click="$emit('delete')"
        >
          Sim, tenho certeza
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-card>
</template>
<script setup lang="ts">
const dialog3 = ref(false)
</script>