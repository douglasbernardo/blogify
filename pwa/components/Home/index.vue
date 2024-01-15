<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      elevation="3"
      width="200"
      location="right"
      >
      <div class="px-2">
        <v-btn 
          class="ma-2 ml-3 pa-2 bg-orange-lighten-1" 
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
      <ApiLoading v-if="!api_loaded" />
      <PublicationsUpdated v-if="api_loaded"/>
      <template v-if="!article.filteredArticles.length && api_loaded" v-for="category in article.categories" :key="category">
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
              <Article :article="article" :index="index"></Article>
            </v-slide-group-item>
          </template>
        </v-slide-group>
      </template>
      <HomeFilteredArticles v-if="article.filteredArticles" :filtered_articles="article.filteredArticles" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import {useAuthStore} from "~/store/user/authStore";
  import { useArticleStore } from "~/store/article_manager";
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  const article = useArticleStore()
  const mobile = useDisplay().mobile
  const dialog = ref<boolean>(false)
  const api_loaded = ref<boolean>(false)
  const filterCategories = ref<Array<string>>([])
  const fetchArticles = async () => {
    await article.get_all_articles()
  }

  onMounted(()=>{
    article.get_categories()
    fetchArticles()
  })

  watchEffect(() => {
    if(article.allArticles.length > 0){
      return api_loaded.value = true
    }
    api_loaded.value = false
  })

  const filterArticles = ((category: any)=>{
    return article.allArticles.filter((article)=> article.category === category)
  })

  const filteringChosenCategories = async() => {
    filterCategories.value.length 
      ? article.filter_by_categories(filterCategories.value) : article.filteredArticles = []
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