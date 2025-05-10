<template>
  <v-container>
    <form>
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
      <v-row>
        <v-combobox
          class="ma-2"
          :items="categories"
          v-model="articleOptions.category"
        ></v-combobox>
        <v-select
          class="ma-2"
          default="default"
          :items="['publico','oculto']"
          v-model="articleOptions.status"
        ></v-select>
      </v-row>
      <quill-editor
        class="editor"
        style="height: 500px;"
        v-model:content="articleContent"
        content-type="html"
        :options="state.editorOption"
        :disabled="state.disabled"
        @update:content="onEditorChange"
      />
      <v-btn
        class="ma-4"
        type="button"
        color="red"
        variant="tonal"
        @click="$router.go(-1)"
      >
        Cancelar
      </v-btn>

      <v-btn @click="submit" color="blue">
        Editar
      </v-btn>
    </form>
  </v-container>
</template>

<script lang="ts" setup>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import {useArticleStore} from '~/store/article_manager'
  const route = useRoute()
  const articleStore = useArticleStore()
  const articleOptions = ref({})
  const categories = ref<Array<string>>([])
  const envVariable = useRuntimeConfig()
  const articleContent = ref('')
  const state = reactive({
    content: '',
    editorOption: {
      placeholder: 'Escreva seu artigo aqui...',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image', 'video']
        ]
      },
    },
    disabled: false
  })
  const onEditorBlur = (quill) => {
    console.log('editor blur!', quill)
  }
  const onEditorFocus = (quill) => {
    state.content = quill.value.__vueParentComponent.attrs.modelValue
    console.log('editor focus!', quill.value.__vueParentComponent.attrs.modelValue)
  }
  const onEditorReady = (quill) => {
    console.log('editor ready!', quill.container.__vueParentComponent.attrs.modelValue)
    state.content = quill
  }
  const onEditorChange = (html) => {
    console.log('editor change!', html)
    articleContent.value = html
    state.content = html
  }


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
        article: state.content,
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
      articleContent.value = editingArticleResponse.article
    })
  })


</script>

<style scoped></style>