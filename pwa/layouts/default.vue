<template>
  <v-layout>
    <v-app-bar height="75" class="bg-black">
      <v-btn v-if="authStore.isAuthenticated" :icon="drawer ? 'mdi-menu-close' : 'mdi-menu-open'" @click="drawer=!drawer"></v-btn>
      <v-app-bar-title @click="navigateTo('/')" style="cursor: pointer;">Curious Mind</v-app-bar-title>
      <v-btn v-if="!authStore.isAuthenticated" style="font-family: 'Bungee Spice';" text="Login" class="login-btn mx-8 text-white" variant="tonal" to="/user/login"/>
    </v-app-bar>
    <v-navigation-drawer
      app
      temporary
      class="mt-n2"
      v-if="authStore.isAuthenticated"
      v-model="drawer"
    >
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          :title="authStore.userName || userStore.userName"
          subtitle="Logado"
        >
          <template #prepend>
            <v-avatar size="46">
               <v-img 
                :src="user.userConfigData && user.userConfigData?.imageOptions?.addImageUrl ?
                user.userConfigData?.imageOptions?.addImageUrl : 'https://as2.ftcdn.net/v2/jpg/01/86/29/31/1000_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg'" 
                alt="Profile Picture"
              ></v-img>
            </v-avatar>
          </template>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list density="comfortable" nav>
        <v-list-item @click="navigateTo('/')" prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
        <v-list-item @click="navigateTo('/profile')" prepend-icon="mdi-account" title="Minha Conta" value="account"></v-list-item>
        <v-list-item @click="navigateTo('/artigos')" prepend-icon="mdi-sticker-text" title="Meus Artigos" value="users"></v-list-item>
        <v-list-item @click="navigateTo('/atividades')" prepend-icon="mdi-ticket" title="Suas Atividades" value="users"></v-list-item>
        <v-list-item @click="logout()" prepend-icon="mdi-logout" title="Logout" value="Logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div class="text-center">
        <v-dialog
          v-model="dialogPicture"
          width="auto"
          persistent
        >
          <ProfilePicture @close="dialogPicture=false"/>
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
import { useArticleStore } from '~/store/article_manager';

const mobile = useDisplay()
const dialog = ref(false)
const dialogPicture = ref(false)
const drawer = ref(false)
const authStore = useAuthStore()
const userStore = userManager()
const user = userManager()
const isRouteDifferent = computed(() => {
  return useRoute().fullPath !== '/';
})
const show = ref(false)

onMounted(()=>{
  userStore.get_user();
})

const logout = () => {
  //userStore.userConfigData.imageOptions.addImageUrl = null
  authStore.logout()
}

</script>
<style scoped>
.v-app-bar-title{
	font-size: 30px;
	font-family: 'Bungee Spice';
}
</style>