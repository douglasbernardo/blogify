<script setup lang="ts">
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";
import {useAuthStore} from "~/store/user/authStore";
const handleLoginSuccess = (response: CredentialResponse) => {
  useAuthStore().login_google(String(response.credential))
};
const handleLoginError = () => {
  console.error("Login failed");
};

</script>

<template>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
</template>
