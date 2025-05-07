<template>
  <v-container>
    <v-stepper
      v-model="step"
      :mobile="mobile ? true : false"
      next-text="Próximo"
      prev-text="Voltar"
      :items="['Opções de Criação','Criação do Artigo', 'Escrevendo Artigo', 'Confirmação']"
    >
      <template v-slot:next>
        <v-btn v-if="canProceed[`step${step}`]" @click="step++">Próximo</v-btn>
      </template>
      <template v-slot:prev>
        <v-btn v-if="step > 1" @click="step--">Voltar</v-btn>
      </template>

      <template v-slot:item.1>
        <CreationArticleOptionsCreation 
          @update:selectedOption="selectedOption = $event"
          :selected-option="selectedOption"
          @update:canProceedStep1="canProceed.step1 = $event"
        />
      </template>

      <template v-slot:item.2>
        <CreationArticleOptionsArticle
          :articleTitle="articleTitle"
          @update:articleTitle="articleTitle = $event"
          :fontChosen="fontChosen.title"
          @update:fontChosen="fontChosen = $event"
          :categoryChosen="categoryChosen"
          @update:categoryChosen="categoryChosen = $event"
          :statusChosen="statusChosen"
          @update:statusChosen="statusChosen = $event"
          :fontsTitle="fontsTitle"
          :categories="categories"
          :status="status"
          @handleFileChange="handleFileChange"
          @update:canProceedStep2="canProceed.step2 = $event"
        />
      </template>

      <template v-slot:item.3>
        <CreationArticleWritingArticle
          @update:canProceedStep3="canProceed.step3 = $event"
          @update:content="contentArticle = $event"
        />
        <p>alguma coisa{{ contentArticle }}</p>
      </template>

      <template v-slot:item.4>
        <CreationArticleConfirmation @submit="submit"/>
      </template> 

    </v-stepper>
  </v-container>
</template>
<script lang="ts" setup>
  import {useArticleStore} from "~/store/article_manager";
  import { useDisplay } from "vuetify/lib/framework.mjs";
  const selectedOption = ref()
  const contentArticle = ref()
  const step = ref(1)
  const canProceed = reactive({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  })
  const articleStore = useArticleStore()
  const {mobile} = useDisplay()
  const categories = ref()
  onMounted(async () => {
    const {data} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/categories`)
    categories.value = data.value
  })
  const uploadFile = (file?: File | null) => {
    if(file){
      const formData = new FormData()
      formData.append('file',file)
      return formData
    }
    return null
  }
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
    '',
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
  const status = ref(['publico','oculto'])
  const article = ref('')
  const categoryChosen= ref('')
  const statusChosen = ref('')
  const fontChosen= ref({
    text: '',
    title: ''
  })
  const selectedFile = ref(null)
  const selectedTextFile = ref(null)
  const handleFileChange = (event: any) => {
    selectedFile.value = event.target.files[0];
  };

  const handleFileTextChange = (event: any) => {
    selectedTextFile.value = event.target.files[0];
  };
  const uploadBackgroundImage = async() => {
    const formData = new FormData();
    formData.append('image', selectedFile.value);
    let backgroundImage = null
    try {
      if(selectedFile.value){
        const {data} = await useFetch('https://api.imgbb.com/1/upload?key=42dc821a3b9fca8c0dd3764fd1061974', {
          method: 'post',
          body: formData
        });
        backgroundImage = data.value ? data.value.data.display_url : ''
      }
      return backgroundImage
    }catch(e){
      console.log(e)
    }
  }
  const submit = async () => {
    try{  
      const backgroundImage = await uploadBackgroundImage() // get the image link from the imgbb
      articleStore.add_new_article({
        backgroundImage: backgroundImage,
        title: articleTitle.value,
        titleFont: fontChosen.value.title,
        article: contentArticle.value,
        textFont: fontChosen.value.text,
        category: categoryChosen.value,
        status: statusChosen.value,
        createdBy: localStorage.getItem('user')
      })
    }catch (error) {
      console.error(error);
    }
  }
</script>

<style scoped>

</style>