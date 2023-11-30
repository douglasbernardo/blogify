<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      elevation="5"
      width="200"
      location="right"
      >
      <div class="px-2">
          <v-btn class="ma-2 ml-3 pa-2 bg-blue" id="newPubBtn" :to="useAuthStore().isAuthenticated ? '/create-publication' : '/user/login'">Nova Publicação</v-btn>
        <v-divider class="my-6"></v-divider>
        <v-row class="ma-2">
          <p>Filtro</p>
          <v-icon>mdi-filter</v-icon>
        </v-row>
        <v-select
          :items="categories"
          chips
          label="Categorias"
          multiple
        ></v-select>
      </div>
      <v-btn @click="dialog=!dialog" size="small" elevation="5" location="end" class="ml-7" color="purple" variant="outlined">Enviar FeedBacks</v-btn>
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          location="center"
          justify="d-flex justify-center"
          :width="mobile ? '500 ': '650'"
        >
          <FeedBack @close="dialog=false"/>
        </v-dialog>
      </div>
    </v-navigation-drawer>

    <v-main>
      <PublicationsUpdated/>
      <v-sheet
        class="mx-auto pa-2 pt-6"
        color="grey-lighten-4"
      >
        <v-sheet
          color="grey-lighten-2"
          height="24"
          rounded="pill"
          width="150"
        >
          <p class="ma-2 font-weight-bold">Meio Ambiente</p>
        </v-sheet>

        <v-slide-group show-arrows>
          <v-slide-group-item
            v-for="n in 5"
            :key="n"
          >
            <template v-for="card in cards2">
              <v-card class="ma-4" width="275">
                <v-img
                  :src="card.src"
                  class="align-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="300px"
                  cover
                >
                  <v-card-title class="text-white text-center" v-text="card.title"></v-card-title>
                </v-img>

                <v-card-actions>
                  <v-hover v-slot="{ isHovering, props }">
                    <v-btn 
                    v-bind="props"
                    :class="isHovering ? 'bg-blue' : 'text-blue'" 
                    size="small"
                    variant="outlined"
                    >Fazer leitura</v-btn>
                  </v-hover>
                  <v-spacer></v-spacer>
                  <v-icon class="ma-1" color="red">mdi-heart</v-icon><p>{{ card.likes.toLocaleString('pt-br') }}</p>
                  <v-icon class="ma-2" color="blue">mdi-comment</v-icon><p>{{ card.comments.toLocaleString('pt-br') }}</p>
                </v-card-actions>
              </v-card>
            </template>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
      <v-sheet
        class="mx-auto pa-2 pt-6"
        color="grey-lighten-4"
      >
        <v-sheet
          color="grey-lighten-2"
          height="24"
          rounded="pill"
          width="150"
        >
          <p class="ma-2 font-weight-bold">Tecnologia</p>
        </v-sheet>

        <v-slide-group show-arrows>
          <v-slide-group-item
            v-for="n in 5"
            :key="n"
          >
            <template v-for="card in cards">
              <v-card class="ma-4" width="275">
                <v-img
                  :src="card.src"
                  class="align-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="300px"
                  cover
                >
                  <v-card-title class="text-white text-center" v-text="card.title"></v-card-title>
                </v-img>

                <v-card-actions>
                  <v-hover v-slot="{ isHovering, props }">
                    <v-btn 
                    v-bind="props"
                    :class="isHovering ? 'bg-blue' : 'text-blue'" 
                    size="small"
                    variant="outlined"
                    >Fazer leitura</v-btn>
                  </v-hover>
                    <v-spacer></v-spacer>
                  <v-icon class="ma-1" color="red">mdi-heart</v-icon><p>{{ card.likes.toLocaleString('pt-br') }}</p>
                  <v-icon class="ma-2" color="blue">mdi-comment</v-icon><p>{{ card.comments.toLocaleString('pt-br') }}</p>
                </v-card-actions>
              </v-card>
            </template>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import {useAuthStore} from "~/store/user/authStore";

  const cards = [
		{ title: 'O início das IAS', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', likes: 2345, comments:45 },
		{ title: 'O começo de tudo', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', likes: 2100,comments:49 },
		{ title: 'Oque é PWA?', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', likes: 100,comments:82 },
	]

	const cards2 = [
		{ title: 'A importancia da amazonia', src: 'https://static.smg.edu.br/wp-content/uploads/2022/06/Eventos-1920-%C3%97-1080-px-7.png', likes: 2300, comments: 45 },
		{ title: 'o meio ambiente', src: 'https://www.hydro.com/globalassets/04-sustainability/sustainability-new/environmentptbr.jpg?quality=85&width=1036&rmode=crop&rsampler=bicubic&rxy=0.47,0.45&compand=true', likes: 1100, comments: 95 },
		{ title: 'a amazonia para o mundo', src: 'https://s2-g1.glbimg.com/pOAUi3_YnNy6MnKUKynFaxRzPtM=/0x0:1000x666/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/J/t/DS69d6TTqAd9iB7F98Lg/1.jpg', likes: 2000, comments: 24 },
	]

  const categories = [
    'Tecnologia',
    'Meio Ambiente',
    'Política',
    'Cinema',
    'Religião'
  ]
  import { useDisplay } from 'vuetify/lib/framework.mjs';
const mobile = useDisplay().mobile
const dialog = ref(false)
</script>

<style>
#newPubBtn{
	font-family: system-ui;
}
.v-navigation-drawer{
  margin-top: 75px;
}
</style>