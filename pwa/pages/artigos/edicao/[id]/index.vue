<template>
  <v-container>
    <form v-if="articleOptions">
      <span>Imagem de Background (opcional)</span>
      <v-file-input
      type="file"
      @change="handleFileChange"
      label="Escolher Imagem"
    ></v-file-input>
      <span class="mb-3">Título</span>
      <v-text-field
        v-model="articleOptions.title"
      ></v-text-field>
      <span>Escolha um fonte para seu título</span>
      <v-select
        :items="[
          'Anton',
          'Bebas Neue',
          'Vina Sans',
          'Black Ops One',
          'Bungee',
          'Rubik Mono One',
          'Viga',
          'Days One',
          'Share Tech Mono'
        ]"
        v-model="articleOptions.titleFont"
      ></v-select>
      <span>Escreva aqui</span>
      <v-textarea v-model="articleOptions.article"/>
      <span>Escolha um fonte para seu texto</span>
      <v-select
        :items="[
          'Roboto',
          'Roboto Condensed',
          'Kanit',
          'Barlow Condensed',
          'Sarabun',
          'Alegreya Sans',
          'Spectral',
          'Saira',
          'Crimson Pro',
          'Red Hat Text'
        ]"
        v-model="articleOptions.textFont"
      ></v-select>
      <span>Escolha a categoria</span>
      <v-combobox
        :items="categories"
        v-model="articleOptions.category"
      ></v-combobox>
      <span>Status</span>
      <v-select
        default="default"
        :items="['publicado','oculto']"
        v-model="articleOptions.status"
      ></v-select>

      <v-btn
        class="me-4"
        type="button"
        color="red"
        variant="tonal"
        @click="$router.go(-1)"
      >
        Cancelar
      </v-btn>

      <v-btn @click="submit" class="" color="blue">
        Editar
      </v-btn>
    </form>
  </v-container>
</template>

<script lang="ts" setup>
  import axios from "axios";
  import {useArticleStore} from '~/store/article_manager'
  const route = useRoute()
  const articleStore = useArticleStore()
  const articleOptions = ref<Array<object>>({})
  const categories = ref<Array<string>>([])
  const selectedFile = ref(null)
  const handleFileChange = (event) => {
    selectedFile.value = event.target.files[0];
  };

  const submit = async() => {
    if(!articleOptions.value.backgroundImage){
      const formData = new FormData();
      formData.append('image', selectedFile.value);
      const response = await axios.post('https://api.imgbb.com/1/upload?key=42dc821a3b9fca8c0dd3764fd1061974', formData);
    }
    articleStore.edit_article({
      id: articleOptions.value._id,
      backgroundImage: articleOptions.value.backgroundImage ? articleOptions.value.backgroundImage : response.data.data.display_url,
      title: articleOptions.value.title,
      titleFont: articleOptions.value.titleFont,
      article: articleOptions.value.article,
      textFont: articleOptions.value.textFont,
      category: articleOptions.value.category,
      status: articleOptions.value.status
    })
  }
  onMounted(async ()=>{
    const categoriesDB = await api_call(<InterfaceAPI>{method: 'get',url: '/article/categories',})
    categoriesDB ? categories.value = JSON.parse(categoriesDB) : null
    await axios.get(`http://localhost:3030/article/reading/${route.params.id}`).then((res)=>{
      articleOptions.value = res.data
    })
  })
</script>