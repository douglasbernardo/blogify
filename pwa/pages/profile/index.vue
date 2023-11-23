<template>
  <v-container class="pa-0">
    <v-row class="ma-2 pa-2">
      <v-col cols="12" md="10" sm="10" lg="4">
        <v-card class="bg-blue" height="300" width="300"></v-card>
      </v-col>
      <v-col cols="12" md="12" sm="12" lg="4">
        <v-card class="bg-blue" height="300" width="300"></v-card>
      </v-col>
      <v-col cols="9" md="4" sm="5">
        <v-card class="bg-blue" height="300" width="300"></v-card>
      </v-col>
      <v-col cols="4" sm="5">
        <v-card class="bg-blue" height="300" width="300"></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const drawer = ref(false)
</script>