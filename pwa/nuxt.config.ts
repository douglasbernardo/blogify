export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:false,
  css: ['vuetify/lib/styles/main.sass','@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
  app:{
    head:{
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { 
          rel: 'icon',
          type: 'image/x-icon',
          href: 'cerebro.png'
        }
      ]
    }
  },
  webpack:{
    loaders: {
      vue: {
        hotReload: true
      }
    }
  },
  runtimeConfig:{
    public:{
      apiBase: process.env.API_URL,
    }
  },
  modules:[
    '@pinia/nuxt',
    'nuxt-vue3-google-signin',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    "@nuxtjs/color-mode"
  ],
  googleFonts: {
    families: {
      Nosifer:true,
      Anton:true,
      Bungee:true,
      Viga:true,
      'Bebas+Neue':true,
      'Vina+Sans':true,
      'Black+Ops+One':true,
      'Rubik+Mono+One':true,
      'Days+One':true,
      'Share+Tech+Mono':true,
      Roboto: true,
      'Roboto Condensed':true,
      'Kanit':true,
      'Barlow Condensed':true,
      'Sarabun':true,
      'Alegreya Sans':true,
      'Spectral':true,
      'Saira':true,
      'Crimson Pro':true,
      'Red Hat Text':true,
      'Bungee Spice': true,
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
    }
  },
  googleSignIn:{
    clientId:'335638704279-dg7t8s2qnmrogjkj3lkfo6jbfste7417.apps.googleusercontent.com',
  }
})