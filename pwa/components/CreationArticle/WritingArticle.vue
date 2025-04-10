<template>
  <v-container>
    <form @submit.prevent="">
      <div v-if="selectedOption === 'externo'">
        <span>Arquivo com o texto</span>
        <v-file-input
        type="file"
        @change=""
        label="Escolher Texto"
      ></v-file-input>
        <!-- <UploadArticle v-model="fileText" @file-selected="uploadFile" /> -->
        {{ selectedTextFile }}
      </div>
      <div v-else>
        <span>Escreva aqui</span>
        <v-btn class="ma-2" variant="outlined" size="small" @click="tipsToWrite=true"  prepend-icon="mdi-lightbulb-question">Dicas</v-btn>
        <v-textarea 
          v-model="localArticle" 
          :style="localFontChosen ? `font-family: ${localFontChosen}`: 'sans-serif'"
          @update:model-value="emit('update:article', $event)"
        />
        <span>Escolha um fonte para seu texto</span>
        <v-select
          :items="fontsText"
          v-model="localFontChosen"
          @update:model-value="emit('update:fontChosen', $event)"
        ></v-select>
      </div>
    </form>
    <v-dialog 
      transition="dialog-top-transition"
      width="auto" 
      v-model="tipsToWrite"
    >
      <v-card max-width="600px" class="mx-auto pa-4">
        <v-card-title class="d-flex align-center">
          Como eu posso escrever o meu artigo?
          <v-tooltip text="Dicas para formatação" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" class="ms-2" color="primary">mdi-help-circle</v-icon>
            </template>
          </v-tooltip>
        </v-card-title>
        <v-card-subtitle>Use os seguintes comandos para formatar seu artigo:</v-card-subtitle>
        <v-card-text>
          <v-list density="compact">
            <v-list-item>
              <v-icon color="primary" class="me-2">mdi-format-header-2</v-icon>
              <strong>Subtítulo:</strong> <code>((texto))</code>
            </v-list-item>
            <v-list-item>
              <v-icon color="primary" class="me-2">mdi-format-bold</v-icon>
              <strong>Negrito:</strong> <code>**texto**</code>
            </v-list-item>
            <v-list-item>
              <v-icon color="primary" class="me-2">mdi-format-list-bulleted</v-icon>
              <strong>Lista:</strong> <code>(.texto)</code>
            </v-list-item>
            <v-list-item>
              <v-icon color="primary" class="me-2">mdi-image</v-icon>
              <strong>Imagem:</strong> <code>(%https://dd.com.br/Gl.jpg)</code>
            </v-list-item>
            <v-list-item>
              <v-icon color="primary" class="me-2">mdi-link</v-icon>
              <strong>Link:</strong> <code>[texto](link)</code>
            </v-list-item>
            <v-list-item>
              <v-icon color="primary" class="me-2">mdi-palette</v-icon>
              <strong>Cor:</strong> <code>($Perigo)[red]</code>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="tipsToWrite = false">Entendi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
	</v-container>
</template>

<script lang="ts" setup>

const tipsToWrite = ref(false)
const props = defineProps({
  selectedOption: String,
  fontsText: Array,
  fontChosen: String,
  article: String
})

const localArticle = ref(props.article)
const localFontChosen = ref(props.fontChosen)

const emit = defineEmits([
  'update:article',
  'update:fontChosen',
  'update:canProceedStep3'
])


watch([localArticle, localFontChosen], () => {
    const isTitleValid = !!localArticle.value
    emit('update:canProceedStep3', isTitleValid)
  }
)


</script>
