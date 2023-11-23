<template>
  <UserSignup
      class="pa-2"
      :user="user_data"
      :loading="loading"
      @add_user="add"
  />
</template>
<script lang="ts" setup>
import {useAuthStore} from '~/store/user/authStore'
const authStore = useAuthStore()
const loading = ref(false)
const user_data = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const add = () => {
  loading.value = true
  authStore.add_new_user(user_data)
}
</script>
    