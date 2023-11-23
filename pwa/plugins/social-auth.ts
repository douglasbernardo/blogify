import {createSocialAuthProvider} from 'vue-social-auth'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = ({
    providers: {
      google:{
        clientId: '335638704279-dg7t8s2qnmrogjkj3lkfo6jbfste7417.apps.googleusercontent.com',
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
