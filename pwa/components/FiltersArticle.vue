<template>
  <v-card 
    class="pa-3 mx-auto card-background rounded-b-xl"
    :class="mobile ? 'w-100' : 'w-66'"
  >
    <v-row>
      <!-- Campo de pesquisa -->
      <v-col>
        <v-text-field
          v-model="query"
          placeholder="Pesquise por artigos..."
          append-inner-icon="mdi-magnify"
          variant="solo"
          hide-details
          class="elevation-1 ma-2"
          @input="fetchSearchResults"
          color="grey lighten-5"
        />
      </v-col>
      <!-- Botão de filtro -->
      <v-col cols="3">
        <v-btn @click="dialogFilter = !dialogFilter" class="ma-2" icon color="grey darken-1">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
  <v-dialog
    v-model="dialogFilter"
    width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-filter"
        text="Crie filtros para melhorar a busca pelos artigos que queira ler."
        title="Criação de Filtros"
      >
        <template v-slot>
          <p class="bg-red ma-2 text-center">{{messageError}}</p>
          <div class="ma-4">
            <v-select
              v-model="categoriesChosen"
              :items="article.categories"
              chips
              label="Categorias"
              multiple
            ></v-select>
            <v-select
              v-model="dataChosen"
              :items="['Semana Passada','Mês Passado','Ano Passado']"
              chips
              label="Filtrar por data"
            ></v-select>
            <v-select
              v-model="authorsChosen"
              :items="authorsNames"
              chips
              multiple
              label="Filtrar por Autor"
            ></v-select>
          </div>
          <v-btn @click="applyCategories" class="bg-green ma-2">Aplicar Filtros</v-btn>
          <v-btn @click="cleanFilters" class="bg-pink ma-2">Limpar Filtros</v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
  import { useArticleStore } from "~/store/article_manager";
  import { useDisplay } from "vuetify/lib/framework.mjs";

  const props = defineProps({
    user: {required:true}
  })
  const emit = defineEmits(['filterArticles'])
  const dialogFilter = ref(false)
  const article = useArticleStore()
  const dialog = ref<boolean>(false)
  const categoriesChosen = ref<Array<string>>([])
  const dataChosen = ref<string>()
  const authorsChosen = ref<Array<string>>([])
  const messageError = ref<string>()
  const {mobile} = useDisplay()

  const filters = reactive<{ categories: string[], data: string, authors: string[] }>({
    categories: categoriesChosen,
    data: dataChosen,
    authors: authorsChosen
  })
  const applyCategories = (()=>{
    const hasFilters = [categoriesChosen.value.length, dataChosen.value?.length, authorsChosen.value.length]
      .some((filter) => Boolean(filter))
    if(!hasFilters){
      messageError.value = 'Preencha pelo menos um filtro'
      setTimeout(()=> messageError.value = undefined,3000)
    }else{
      emit('filterArticles', filters)
    }
  })

  const query = ref("")
  const fetchSearchResults = async () => {
    try{
      await useArticleStore().search_article(query);
    }catch(error){
      console.log('Erro ao buscar artigos', error)
    }
  }

  const cleanFilters = (() => {
    categoriesChosen.value = []
    dataChosen.value = undefined
    authorsChosen.value = []
  })

  onMounted(()=>{
    article.get_categories(),
    article.get_authors()
  })

  const authorsNames = computed(()=>{
    return article.authors.map((author)=> author?.name)
  })

</script>

<style scoped>
.card-background{
  background-image: url('/searchBackground.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white; /* Ajusta a cor do texto para garantir legibilidade */
}
</style>

