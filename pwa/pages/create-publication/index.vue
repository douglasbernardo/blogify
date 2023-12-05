<template>
  <v-container>
    <form @submit.prevent="submit">
      <span>Imagem de Background (opcional)</span>
      <v-file-input v-model="backgroundImage" type="file" accept="image/*" prepend-icon="mdi-image" variant="solo" label="File input"></v-file-input>
      <p>{{imageFormatted}}</p>
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

  import {useArticleStore} from "~/store/article_manager";
  import Form from "~/components/User/Form.vue";
  const articleStore = useArticleStore()

  const categories = ref()
  onMounted(async () => {
    const categoriesDB = await api_call('get','/article/categories')
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
  const backgroundImage = ref('')
  const imageFormatted = ref(new FormData().backgroundImage)
  const fontChosen= ref({
    text: '',
    title: ''
  })
  const handleSubtitlesUpdated = (updatedSubtitles) => {
    subtitles.value = updatedSubtitles
  }
  const submit = () => {
    const formData = new FormData()
    formData.append('backgroundImage', backgroundImage.value)
    articleStore.add_new_article({
      backgroundImage: String(formData)
      // title: String(articleTitle.value),
      // titleFont: String(fontChosen.value.title),
      // article: String(article.value),
      // textFont: String(fontChosen.value.text),
      // category: String(categoryChosen.value),
      // status: String(statusChosen.value)
    })
  };
</script>

