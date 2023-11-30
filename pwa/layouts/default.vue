<template>
  <v-layout>
    <v-app-bar height="75" class="bg-black">
      <v-btn v-if="authStore.isAuthenticated" :icon="drawer ? 'mdi-menu-close' : 'mdi-menu-open'" @click="drawer=!drawer"></v-btn>
      <v-app-bar-title @click="navigateTo('/')" style="cursor: pointer;">Blogify</v-app-bar-title>
      <v-icon v-if="mobile.mobile && useRoute().fullPath == '/'" class="arrow-right d-sm-none" size="x-large">mdi-arrow-left-thick</v-icon>
    </v-app-bar>
    <v-navigation-drawer
        app
        temporary="true"
        class="mt-n2"
        v-if="authStore.isAuthenticated"
        v-model="drawer"
    >
      <template v-slot:prepend>
        <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            :title="authStore.userName || userStore.userName"
            subtitle="Logado"
        ></v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list density="comfortable" nav>
        <v-list-item @click="navigateTo('/')" prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
        <v-list-item @click="dialog=true" prepend-icon="mdi-account" title="Minha Conta" value="account"></v-list-item>
        <v-list-item @click="navigateTo('/artigos')" prepend-icon="mdi-sticker-text" title="Meus Artigos" value="users"></v-list-item>
        <v-list-item @click="navigateTo('/profile')" prepend-icon="mdi-ticket" title="Suas Atividades" value="users"></v-list-item>
        <v-list-item @click="authStore.logout()" prepend-icon="mdi-logout" title="Logout" value="Logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="auto"
        >
          <Configuration @close="dialog=false"/>
        </v-dialog>
      </div>
      <slot/>
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import {useRoute} from 'vue-router'
import {useAuthStore} from '~/store/user/authStore'
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { userManager } from '~/store/user/user_manager';
const mobile = useDisplay()
const dialog = ref(false)
const drawer = ref(false)
const authStore = useAuthStore()
const userStore = userManager()
const isRouteDifferent = computed(() => {
  return useRoute().fullPath !== '/';
})
</script>
<style scoped>
.v-app-bar-title{
	font-size: 30px;
	font-family: 'Nosifer', sans-serif;
}
.arrow-right{
  margin-right: 30px;
  animation: jump 2s infinite;
}
@keyframes jump {
  0%,20%,50%,80%,100% {
    transform: translateX(0); 
  }
  40% {
    transform: translateX(-10px);
  }
  60% {
    transform: translateX(-40px);
  }
}
</style>