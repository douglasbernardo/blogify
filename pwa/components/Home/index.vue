<template>
  <v-app id="inspire">
    <FiltersArticle @filterArticles="handleFilter"/>
    <v-main>
      <ApiLoading v-if="!api_loaded" />
      <PublicationsUpdated v-if="api_loaded && !article.filteredArticles.length"/>
      <template v-if="!article.filteredArticles.length && api_loaded" v-for="category in article.categories" :key="category">
        <v-sheet
          class="text-center ma-2 pa-2 d-inline-block"
          color="grey-lighten-2"
          height="35"
          position="relative"
          rounded="pill"
          v-text="category"
        />
        <v-slide-group
          show-arrows
          show-arrows-on-hover
        >
          <template v-if="!article.filteredArticles.length" v-for="(article, index) in filterArticles(category)">
            <v-slide-group-item>
              <Article :article="article" :index="index"></Article>
            </v-slide-group-item>
          </template>
        </v-slide-group>
      </template>
      <HomeFilteredArticles v-else :filtered_articles="article.filteredArticles" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { useArticleStore } from "~/store/article_manager";
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  const article = useArticleStore()
  const mobile = useDisplay().mobile
  const dialog = ref<boolean>(false)
  const api_loaded = ref<boolean>(false)

  const handleFilter = (filters: Object) => {
    if (filters) {
      article.filtering_articles(filters);
    }
  };
  onMounted(()=>{
    article.get_categories()
    article.get_all_articles()
  })

  watchEffect(() => {
    if(article.allArticles.length > 0){
      return api_loaded.value = true
    }
    api_loaded.value = false
  })

  // show the article by its category
  const filterArticles = ((category: any)=>{
    return article.allArticles.filter((article)=> article.category === category)
  })


</script>

<style>
#newPubBtn{
	font-family: system-ui;
}
.v-navigation-drawer{
  margin-top: 75px;
}
</style>