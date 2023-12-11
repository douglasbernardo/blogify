<template>
    <v-card-title>
      <span class="text-h5">Configurações de perfil</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-switch
          v-if="!useAuthStore().loggedWithGoogle"
          :label="switchd ? 'Editando': 'Editar'"
          v-model="switchd"
          color="blue"
          inset
        ></v-switch>
        <v-row>
          <v-col>
            <v-img :src="user.userConfigData.urlImage" width="200" alt="Profile Picture"></v-img>
          </v-col>
          <v-col cols="9">
            <ProfilePicture :is-profile="true" :disabled="!switchd"/>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :disabled="!switchd"
              label="Nome"
              v-model="user.userConfigData.name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :disabled="!switchd"
              v-model="user.userConfigData.email"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-alert
            v-if="switchd"
            density="compact"
            closable
            type="warning"
            width="200"
            title="Alterar senha"
            text="Se você optar por editar sua senha, ela será automaticamente atualizada para a nova versão escolhida por você."
          ></v-alert>
          <v-col cols="12">
            <v-text-field
              :disabled="!switchd"
              label="Senha"
              v-model="pass"
              type="password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
      <v-row>
        <v-btn
          :disabled="!switchd"
          color="blue-darken-1"
          variant="flat"
          @click="edit"
        >
          Salvar
        </v-btn>
        <v-col cols="12" md="12" sm="12" lg="12">
          <v-btn
            color="red-darken-1"
            variant="flat"
            class="ml-n3"
            size="small"
            @click="dialogDeleteAccount=!dialogDeleteAccount"
          >
            Excluir minha conta
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
      </v-container>
    </v-card-text>
  <v-dialog 
    v-model="dialogDeleteAccount" 
    persistent 
    width="auto"
    transition="dialog-top-transition"
  >
    <DeleteAccount @cancel="dialogDeleteAccount=false" @delete="deleteAcc"/>
  </v-dialog>
</template>
<script lang="ts" setup>
import {userManager} from "~/store/user/user_manager";
import DeleteAccount from "~/components/Configuration/DeleteAccount.vue";
import {useAuthStore} from "~/store/user/authStore";
const user = userManager()
const switchd = ref(false)
const pass = ref('')
const dialogDeleteAccount = ref(false)
onMounted(()=>{
  user.get_user()
})

const deleteAcc = () => {
  dialogDeleteAccount.value = false
  user.delete_account(localStorage.getItem('user'))
}
const edit = () => {
  user.edit_user({
    currentEmail:  localStorage.getItem('user'),
    name: user.userConfigData.name,
    email: user.userConfigData.email,
    password: pass.value
  })
}
</script>