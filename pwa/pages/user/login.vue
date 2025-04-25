<template>
  <UserLogin
    :user="user_data"
    :error-messages="authStore.errorMessages"
    @login="login"
    @resetPass="resetPassword"
  />
</template>
<script lang="ts" setup>
import {useAuthStore} from '~/store/user/authStore'
const authStore = useAuthStore()
const email = ref()
const user_data = reactive({
  email: '',
  password: ''
})

const resetPassword = (dataEmail: string) => {
  console.log("E-mail enviado pelo dialog:", dataEmail)
  authStore.reset_password(dataEmail)
}
const login = () => {
  authStore.login_user(user_data)
}
</script>
  