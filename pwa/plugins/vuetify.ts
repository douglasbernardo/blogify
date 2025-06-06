// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    theme:{
      defaultTheme: 'light'
    },
    ssr: false,
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})