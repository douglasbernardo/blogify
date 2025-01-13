<template>
  <v-card-title>
    <span class="text-h5">Configurações de perfil</span>
  </v-card-title>
  <v-card-text>
    <v-container>
      <v-alert 
        v-if="user.errorMessages.length"
        prominent
        type="error" 
        icon="$error"
        :text="user.errorMessages[0]"
        variant="outlined"
        closable 
        @click:close="user.errorMessages=[]"
      />
      <v-alert 
        v-if="user.updated_message"
        prominent
        type="success" 
        icon="$success"
        :text="user.updated_message"
        variant="outlined"
        closable 
        @click:close="user.updated_message=''"
      />
      <v-row>
        <v-switch
          :label="updateAllData ? 'Editando': 'Editar Todos'"
          v-model="updateAllData"
          color="blue"
          inset
        />
      </v-row>
      <v-row v-if="user?.userConfigData">
        <v-col>
          <v-hover v-slot:default="{isHovering, props}">
            <v-card v-bind="props" width="250" class="rounded-pill">
              <v-img 
                :src="user.userConfigData && user.userConfigData?.imageOptions?.addImageUrl ?
                user.userConfigData?.imageOptions?.addImageUrl : 'https://as2.ftcdn.net/v2/jpg/01/86/29/31/1000_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg'" 
                alt="Profile Picture"
              >
                <v-btn style="margin-top: 6rem;margin-left: 6.5rem;" v-if="isHovering" icon="mdi-pencil" @click="updateImage = true"></v-btn>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
        <v-dialog
          v-model="updateImage"
          width="auto"
          persistent
        >
          <ProfilePicture @close="updateImage=false"/>
        </v-dialog>
        <v-col cols="12">
          <v-text-field
            v-if="!loggedWithGoogle"
            :disabled="!updateAllData"
            label="Nome"
            v-model="user.userConfigData.name"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-if="!loggedWithGoogle"
            :disabled="!updateAllData"
            v-model="user.userConfigData.email"
            label="E-mail"
            required
          />
        </v-col>
        <v-alert
          class="ml-4"
          v-if="updateAllData && !loggedWithGoogle"
          density="compact"
          closable
          variant="outlined"
          type="warning"
          max-width="900"
          title="Alterar senha"
          text="Se você optar por editar sua senha, ela será automaticamente atualizada para a nova versão escolhida por você."
        />
        <v-col cols="12">
          <v-text-field
            v-if="!loggedWithGoogle"
            :disabled="!updateAllData"
            label="Senha"
            v-model="pass"
            type="password"
            required
          />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row>
          <v-btn
            :disabled="!updateAllData"
            color="blue-darken-1"
            variant="flat"
            @click="edit"
            text="Salvar"
          />
          <v-col cols="12" md="12" sm="12" lg="12">
            <v-btn
              color="red-darken-1"
              variant="text"
              class="ml-n5"
              size="small"
              @click="dialogDeleteAccount=!dialogDeleteAccount"
              text="Excluir minha conta"
            />
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
  const authStore = useAuthStore()
  const user = userManager()
  const pass = ref('')
  const dialogDeleteAccount = ref(false)
  const updateImage = ref(false)
  const updateAllData = ref(false)

  const loggedWithGoogle = computed(()=>{
    return JSON.parse(String(localStorage.getItem('fromGoogle'))) ? true : false
  })

  onBeforeUnmount(() => user.updated_message = '')

  onMounted(()=>{
    user.get_user()
  })
  const deleteAcc = () => {
    dialogDeleteAccount.value = false
    user.delete_account(String(localStorage.getItem('user')))
  }
  const edit = () => {
    user.edit_user({
      currentEmail: localStorage.getItem('user'),
      name: user.userConfigData.name,
      email: user.userConfigData.email,
      password: pass.value
    })
  }
</script>