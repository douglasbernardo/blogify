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
  import {useArticleStore} from '~/store/article_manager'
  const route = useRoute()
  const articleStore = useArticleStore()
  const articleOptions = ref({})
  const categories = ref<Array<string>>([])
  const envVariable = useRuntimeConfig()
  const selectedFile = ref(null)
  const handleFileChange = (event: any) => {
    selectedFile.value = event.target.files[0];
  };

  const submit = async () => {
    let response = null;

    if (!articleOptions.value.backgroundImage) {
      const formData = new FormData();
      formData.append('image', selectedFile.value);
      try {
        response = await useFetch('https://api.imgbb.com/1/upload?key=42dc821a3b9fca8c0dd3764fd1061974',{
          method: 'post',
          body: formData
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    try {
      console.log(response?.data.value)
      const backgroundImage = response ? response.data.value.data.display_url : articleOptions.value.backgroundImage;

      await articleStore.edit_article({
        id: articleOptions.value._id,
        backgroundImage,
        title: articleOptions.value.title,
        titleFont: articleOptions.value.titleFont,
        article: articleOptions.value.article,
        textFont: articleOptions.value.textFont,
        category: articleOptions.value.category,
        status: articleOptions.value.status,
      })

    } catch (error) {
      console.error('Error editing article:', error);
    }
  }

  onMounted(async() => {
    const {data, error} = await useAsyncData('article-edit', async () => {
      const [categoriesResponse, editingArticleResponse] = await Promise.all([
        $fetch<string[]>(`${envVariable.public.apiBase}/article/categories`),
        $fetch<object>(`${envVariable.public.apiBase}/article/reading/${route.params.id}`),
      ])
      categories.value = categoriesResponse, 
      articleOptions.value = editingArticleResponse
    })
  })
</script>