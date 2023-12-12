<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      elevation="5"
      width="200"
      location="right"
      >
      <div class="px-2">
        <v-btn 
          class="ma-2 ml-3 pa-2 bg-blue" 
          id="newPubBtn" 
          :to="useAuthStore().isAuthenticated ? '/create-publication' : '/user/login'"
          text="Nova Publicação"
        />
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
      <template v-if="article" v-for="category in article.categories" :key="category">
        <v-sheet
          class="text-center ma-4"
          color="grey-lighten-2"
          height="25"
          rounded="pill"
          v-text="category"
          width="200"
        />
        <v-slide-group
          show-arrows
          show-arrows-on-hover
        >
          <template v-for="(article, index) in filteredArticles(category)">
            <v-slide-group-item>
              <v-card class="" width="auto">
                <v-img
                  :src="article.backgroundImage"
                  class="align-center ma-4"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="300px"
                  width="400px"
                  cover
                >
                  <v-card-title class="text-white text-center" v-text="article.title"></v-card-title>
                </v-img>
                <v-card-actions>
                  <v-hover v-slot="{ isHovering, props }">
                    <v-btn 
                      v-bind="props"
                      :class="isHovering ? 'bg-blue' : 'text-blue'" 
                      size="small"
                      variant="outlined"
                      @click="doReading(article._id)"
                      >Fazer leitura</v-btn>
                  </v-hover>
                  <v-icon
                    class="ml-4" 
                    @click="iLiked(article._id,index)"
                    color="red" 
                    icon="mdi-heart"
                  ></v-icon><p class="ml-1">{{ article.likes }}</p>
                  <v-icon class="ml-4" color="orange-lighten-2">mdi-comment</v-icon><p class="ml-1">9</p>
                  <v-icon class="ml-4" color="light-blue">mdi-eye</v-icon><p class="ml-1">{{ article.views }}</p>
                </v-card-actions>
                <v-snackbar 
                  v-model="snackbarErrorLike" 
                  timeout="1200" 
                  variant="flat" 
                  color="red-darken-4" 
                  :text="likeError"
                  location="top"
                />
              </v-card>
            </v-slide-group-item>
          </template>
      </v-slide-group>
      </template>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import {useAuthStore} from "~/store/user/authStore";
  import { useArticleStore } from "~/store/article_manager";
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  const mobile = useDisplay().mobile
  const snackbarErrorLike = ref(false)
  const likeError = ref('')
  const props= defineProps({
    lastAdded: {type: Array}
  })

  const article = useArticleStore()
  onMounted(()=>{
    article.get_categories()
    article.get_all_articles()
  })
  const filteredArticles = ((category: any)=>{
    return article.allArticles.filter((article)=> article.category === category)
  })

const iLiked = async (idArticle: string, index: any) => {
  await api_call(<InterfaceAPI>{
    method: 'post', 
    url: '/like/i-liked', 
    data: {user: localStorage.getItem('user'), article: idArticle}, 
  })
  .then((res)=>{
    if(res) article.allArticles[index].likes++;
  })
  .catch((e)=>{
    if(e.response.data){
      snackbarErrorLike.value = true
      likeError.value = e.response.data.message
    }
  })
}
  const doReading = async (id: string) => {
    await api_call(<InterfaceAPI>{method: 'post', url: '/article/add-view', data: {id: id}});
    navigateTo(`/artigos/reading/${id}`)
  }
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