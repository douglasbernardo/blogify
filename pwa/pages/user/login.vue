<template>
  <UserLogin
      :user="user_data"
      @login="login"
  />
</template>
<script lang="ts" setup>
import {useAuthStore} from '~/store/user/authStore'
const authStore = useAuthStore()
const user_data = reactive({
  email: '',
  password: ''
})

const login = () => {
  authStore.login_user(user_data)
}
</script>
  