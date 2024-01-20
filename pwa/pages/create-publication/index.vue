<template>
  <v-container>
    <v-stepper
      next-text="Próximo"
      prev-text="Voltar"
      :items="['Opções de Criação', 'Criação do Artigo', 'Confirmação']"
      >
      <template v-slot:item.1>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title class="headline">Olá!</v-card-title>
              <v-card-text>
                Gostaríamos de saber como você prefere começar o seu artigo. Oferecemos duas opções:
              </v-card-text>
              <v-row align="center">
                <v-col>
                  <v-radio-group v-model="selectedOption">
                    <v-radio label="Usar um aplicativo externo" value="externo"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col>
                  <span>Se você já tem um aplicativo de edição de texto, como o Microsoft Word, Google Docs ou outro de sua escolha, pode optar por criar o artigo por lá. Posteriormente, você pode fazer o upload do arquivo final aqui.</span>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col>
                  <v-radio-group v-model="selectedOption">
                    <v-radio label="Usar a plataforma Curious Mind" value="integrada"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col>
                  <span>Se preferir, também oferecemos a opção de criar e editar o artigo diretamente em nossa plataforma. Isso pode facilitar a colaboração e o acompanhamento do progresso.</span>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.2>
        <form @submit.prevent="submit">
          <span>Imagem de Background (opcional)</span>
          <v-file-input
          type="file"
          @change="handleFileChange"
          label="Escolher Imagem"
        ></v-file-input>
        <span v-if="selectedOption === 'externo'">Arquivo com o texto</span>
        <v-file-input
          v-if="selectedOption === 'externo'"
          type="file"
          @change="handleFileChange"
          label="Seu arquivo"
        ></v-file-input>
          <div v-if="selectedOption === 'integrada'">
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
          </div>
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
        </form>
      </template>
      <template v-slot:item.3>
        <v-card
          class="mx-auto"
          max-width="450"
          title="Confirme se irá realizar a criação"
          text="Update your weak or re-used passwords with Password Checkup. It's free and only takes a few minutes. Click the Take Checkup button to get started."
        >

          <template v-slot:actions>
            <v-btn height="48" @click="navigateTo('/artigos')">
              Cancelar
            </v-btn>

            <v-btn
              class="flex-grow-1"
              height="48"
              color="blue"
              variant="tonal"
              @click="submit"
            >
              Postar
            </v-btn>
          </template>
        </v-card>
    </template>
  </v-stepper>
  </v-container>
</template>
<script lang="ts" setup>
  import Form from "~/components/User/Form.vue";
  import {useArticleStore} from "~/store/article_manager";
  const answeredAboutCreation = ref(false)
  const selectedOption = ref()
  const articleStore = useArticleStore()
  const categories = ref()
  onMounted(async () => {
    const {data} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/categories`)
    categories.value = data.value
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
  const handleFileChange = (event: any) => {
    selectedFile.value = event.target.files[0];
  };

  const submit = async () => {
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
      articleStore.add_new_article({
        backgroundImage: backgroundImage,
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