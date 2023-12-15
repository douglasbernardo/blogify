<template>
  <v-container>
    <form @submit.prevent="submit">
      <span>Imagem de Background (opcional)</span>
      <v-file-input
      type="file"
      @change="handleFileChange"
      label="Escolher Imagem"
    ></v-file-input>
      <span class="mb-3">Título</span>
      <v-text-field
          v-model="articleTitle"
        :style="fontChosen.title ? `font-family: ${fontChosen.title}` : ''"
      ></v-text-field>
      <span>Escolha um fonte para seu título</span>
      <v-select
        :items="fontsTitle"
        v-model="fontChosen.title"
      ></v-select>
      <span>Escreva aqui</span>
      <v-textarea v-model="article" :style="{fontFamily: fontChosen.text}" />
      <span>Escolha um fonte para seu texto</span>
      <v-select
        :items="fontsText"
        v-model="fontChosen.text"
      ></v-select>
      <span>Escolha a categoria</span>
      <v-combobox
        :items="categories"
        v-model="categoryChosen"
      ></v-combobox>
      <span>Status</span>
      <v-select
          :items="status"
          default="default"
          v-model="statusChosen"
      ></v-select>
      <v-btn
        class="me-4"
        type="submit"
        color="red"
        variant="tonal"
        @click="navigateTo('/artigos')"
      >
        Cancelar
      </v-btn>

      <v-btn @click="submit" class="" color="blue">
        Postar
      </v-btn>
    </form>
  </v-container>
</template>
<script lang="ts" setup>
  import Form from "~/components/User/Form.vue";
  import axios from "axios";
  import {useArticleStore} from "~/store/article_manager";
  const articleStore = useArticleStore()
  const categories = ref()
  onMounted(async () => {
    const categoriesDB = await api_call(<InterfaceAPI>{
    method: 'get',
    url: '/article/categories',
  })
    categoriesDB ? categories.value = JSON.parse(categoriesDB) : null
  })

  const fontsTitle = ref([
    'Anton',
    'Bebas Neue',
    'Vina Sans',
    'Black Ops One',
    'Bungee',
    'Rubik Mono One',
    'Viga',
    'Days One',
    'Share Tech Mono'
  ])
  const fontsText = ref([
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
  ])
  const articleTitle = ref('')
  const status = ref(['publicado','oculto'])
  const article = ref('')
  const categoryChosen= ref('')
  const statusChosen = ref('')
  const fontChosen= ref({
    text: '',
    title: ''
  })
  const selectedFile = ref(null)
  const handleFileChange = (event) => {
    selectedFile.value = event.target.files[0];
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile.value);
    try {
      if(selectedFile.value){
        const response = await axios.post('https://api.imgbb.com/1/upload?key=42dc821a3b9fca8c0dd3764fd1061974', formData);
        console.log(response)
      }
      articleStore.add_new_article({
        backgroundImage: selectedFile.value ? response.data.data.display_url : '',
        title: articleTitle.value,
        titleFont: fontChosen.value.title,
        article: article.value,
        textFont: fontChosen.value.text,
        category: categoryChosen.value,
        status: statusChosen.value,
        createdBy: localStorage.getItem('user')
      })
    } catch (error) {
      console.error(error);
    }
  }
</script>

