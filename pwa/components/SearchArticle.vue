<template>
  <v-row justify="center">
    <!-- Card azul claro -->
    <v-col cols="12" md="8">
      <v-card class="pa-6 rounded-xl elevation-2 card-background" color="orange-darken-1" height="auto">
        <v-row no-gutters align="center" justify="space-between" class="fill-height">
          <!-- Card com texto -->
          <v-col cols="4">
            <div class="d-flex align-center pa-2" style="height: 100%;">
              <span class="search-text text-h6 font-weight-medium font-weight-bold">
                Busque por artigos ou aplique filtros
              </span>
            </div>
          </v-col>
          
          <!-- Campo de pesquisa -->
          <v-col cols="5">
            <v-text-field
              placeholder="Pesquise por artigos..."
              append-inner-icon="mdi-magnify"
              variant="solo"
              hide-details
              class="elevation-1"
              color="grey lighten-5"
            />
          </v-col>

          <!-- Botão de filtro -->
          <v-col cols="3" class="d-flex justify-end">
            <v-btn @click="dialogFilter = !dialogFilter" class="ma-2" icon color="grey darken-1">
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn :to="props.user ? '/create-publication' : '/user/login'" class="ma-2" icon color="grey darken-1">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog
    v-model="dialogFilter"
    width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-filter"
        text="Crie filtros para ter uma melhor busca dos artigos que queira ler."
        title="Criação de Filtros"
      >
        <template v-slot>
          <div class="ma-4">
            <v-select
              v-model="filterCategories"
              :items="article.categories"
              chips
              label="Categorias"
              multiple
              @update:model-value="filteringChosenCategories"
            ></v-select>
            <v-select
              :items="['Semana Passada','Mês Passado','Ano Passado']"
              chips
              label="Filtrar por data"
            ></v-select>
            <v-select
              :items="['Douglas B','Marcos','Breno','João','Lepo','teste','só teste']"
              chips
              multiple
              label="Filtrar por Autor"
            ></v-select>
          </div>
        </template>
      </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useArticleStore } from "~/store/article_manager";
import { useAuthStore } from "~/store/user/authStore";

const props = defineProps({
  user: {required:true}
})
const dialogFilter = ref(false)
  const article = useArticleStore()
  const dialog = ref<boolean>(false)
  const filterCategories = ref<Array<string>>([])
  const fetchArticles = async () => {
    await article.get_all_articles()
  }

  onMounted(()=>{
    article.get_categories()
    fetchArticles()
  })

  const filterArticles = ((category: any)=>{
    return article.allArticles.filter((article)=> article.category === category)
  })

  const filteringChosenCategories = async() => {
    filterCategories.value.length 
      ? article.filter_by_categories(filterCategories.value) : article.filteredArticles = []
  }

</script>

<style scoped>
.text-h6 {
  font-size: 1.25rem; /* Tamanho de fonte moderno */
}
.search-text{
  font-family: 'Bungee Spice';
}

.rounded-xl {
  border-radius: 16px; /* Borda arredondada mais moderna */
}

.v-text-field {
  border-radius: 8px;
}

.pa-6 {
  padding: 24px !important;
}
.card-background{
  background-image: url('/searchBackground.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white; /* Ajusta a cor do texto para garantir legibilidade */
}
</style>

