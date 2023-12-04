<template>
  <UserSignup
    class="pa-2"
    :user="user_data"
    :error-messages="user.errorMessages"
    :loading="loading"
    @add_user="add"
  />
</template>
<script lang="ts" setup>
import { userManager } from '~/store/user/user_manager';
const user = userManager()
const loading = ref(false)
const user_data = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const add = () => {
  loading.value = true
  user.add_new_user(user_data)
}
</script>
    