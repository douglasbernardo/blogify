<template>
  <v-card>
    <v-toolbar
      dark
      color="primary"
    >
      <v-btn
        icon
        dark
        @click="useRouter().go(-1)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Minha Conta</v-toolbar-title>
    </v-toolbar>
    <configuration/>
  </v-card>
</template>