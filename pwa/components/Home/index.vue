<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      elevation="3"
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
          v-model="filterCategories"
          :items="article.categories"
          chips
          label="Categorias"
          multiple
          @update:model-value="filteringChosenCategories"
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
      <v-card
        v-if="!api_loaded"
        class="mx-auto my-8"
        max-width="344"
        elevation="16"
      >
        <v-card-item>
          <v-card-title>
            Carregando Dados......
          </v-card-title>
        </v-card-item>

        <v-card-text>
          Aguarde enquanto os dados estão sendo carregados!
        </v-card-text>
        <v-progress-linear
          model-value="80"
          color="red-darken-2"
          indeterminate
          rounded
        ></v-progress-linear>
      </v-card>
      <template v-if="!article.filteredArticles.length" v-for="category in article.categories" :key="category">
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
          <template v-for="(article, index) in filterArticles(category)">
            <v-slide-group-item>
              <v-card class="pa-2 ma-2" width="auto">
                <v-img
                  :src="article.backgroundImage ? article.backgroundImage : 'no-image-article.avif'"
                  class="align-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="300px"
                  width="350px"
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
                  <v-icon class="ml-4" color="orange-lighten-2">mdi-comment</v-icon><p class="ml-1">{{ article.comments }}</p>
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
      <template v-if="article.filteredArticles">
        <v-row v-if="article.filteredArticles">
          <v-col v-for="(filtered,index) in article.filteredArticles" :key="index" cols="12" md="4">
            <v-card class="pa-2 ma-2" width="auto">
              <v-img
                :src="filtered.backgroundImage ? filtered.backgroundImage : 'no-image-article.avif'"
                class="align-center"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
                width="350px"
                cover
              >
                <v-card-title class="text-white text-center" v-text="filtered.title"></v-card-title>
              </v-img>
              <v-card-actions>
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn 
                    v-bind="props"
                    :class="isHovering ? 'bg-blue' : 'text-blue'" 
                    size="small"
                    variant="outlined"
                    @click="doReading(filtered._id)"
                    >Fazer leitura</v-btn>
                </v-hover>
                <v-icon
                  class="ml-4" 
                  @click="iLiked(filtered._id,index)"
                  color="red" 
                  icon="mdi-heart"
                ></v-icon><p class="ml-1">{{ filtered.likes }}</p>
                <v-icon class="ml-4" color="orange-lighten-2">mdi-comment</v-icon><p class="ml-1">{{ filtered.comments }}</p>
                <v-icon class="ml-4" color="light-blue">mdi-eye</v-icon><p class="ml-1">{{ filtered.views }}</p>
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
          </v-col>
        </v-row>
      </template>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import {useAuthStore} from "~/store/user/authStore";
  import { useArticleStore } from "~/store/article_manager";
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  const mobile = useDisplay().mobile
  const snackbarErrorLike = ref<boolean>(false)
  const likeError = ref('')
  const dialog = ref<boolean>(false)
  const api_loaded = ref<boolean>(false)
  const filterCategories = ref<Array<string>>([])
  const props= defineProps({
    lastAdded: {type: Array}
  })

  const article = useArticleStore()

  onMounted(()=>{
    article.get_categories()
    article.get_all_articles().then(() => api_loaded.value = true)
  })

  const filterArticles = ((category: any)=>{
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

  const filteringChosenCategories = async() => {
    if(filterCategories.value.length){
      article.filter_by_categories(filterCategories)
    }
  }
</script>

<style>
#newPubBtn{
	font-family: system-ui;
}
.v-navigation-drawer{
  margin-top: 75px;
}
</style>