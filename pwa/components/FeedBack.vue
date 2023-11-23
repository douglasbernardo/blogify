<template>
  <v-sheet max-width="500" class="mx-5 pa-5">
    <v-row class="mt-n2" justify="center" no-gutters>
      <h3 class="text-center">Feed Back</h3>
      <v-icon class="ml-2">mdi-comment-quote</v-icon>
    </v-row>
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="firstName"
        label="Nome"
        :rules="firstNameRules"
      ></v-text-field>

      <v-textarea
        v-model="lastName"
        label="Como podemos melhorar?"
        :rules="lastNameRules"
      ></v-textarea>

      <v-btn type="submit" color="blue" block class="mt-2">Enviar</v-btn>
      <v-btn type="submit" @click="$emit('close')" variant="tonal" color="blue" size="small" block class="mt-2">Fechar</v-btn>
    </v-form>
  </v-sheet>
</template>
<script lang="ts" setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
const mobile = useDisplay().mobile
</script>