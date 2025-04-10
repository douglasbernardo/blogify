<template>
  <form @submit.prevent="">
    <v-row>
      <v-col cols="12" sm="12" lg="8">
        <span class="mb-3">Título</span>
        <v-text-field
          v-model="localTitle"
          @update:model-value="emit('update:articleTitle', $event)"
          :style="localFontChosen ? `font-family: ${localFontChosen}` : ''"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <span>Escolha um fonte para seu título</span>
        <v-select
          :items="fontsTitle"
          v-model="localFontChosen"
          @update:model-value="emit('update:fontChosen', $event)"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="10" lg="8">
        <span>Escolha uma Categoria</span>
        <v-combobox
          :items="categories"
          v-model="localcategoryChosen"
          @update:model-value="emit('update:categoryChosen', $event)"
        ></v-combobox>
      </v-col>
      <v-col cols="12" sm="10" lg="4">
        <span>Status</span>
        <v-select
          :items="status"
          v-model="localstatusChosen"
          @update:model-value="emit('update:statusChosen', $event)"
        ></v-select>
      </v-col>
    </v-row>
    <span>Imagem de Background (opcional)</span><br>
    <p style="color: grey">Tamanho ideal: 630x340, Outros tamanhos podem não ficar ajustado corretamente!</p>
    <v-file-input
      type="file"
      label="Escolher Imagem"
    ></v-file-input>
  </form>
</template>

<script lang="ts" setup>
const props = defineProps({
  articleTitle: String,
  fontChosen: String,
  categoryChosen: String,
  statusChosen: String,
  fontsTitle: Array,
  categories: Array,
  status: Array
})

const localTitle = ref(props.articleTitle)
const localFontChosen = ref(props.fontChosen)
const localcategoryChosen = ref(props.categoryChosen)
const localstatusChosen = ref(props.statusChosen)

const emit = defineEmits([
  'update:articleTitle',
  'update:fontChosen',
  'update:categoryChosen',
  'update:statusChosen',
  'update:canProceedStep2'
])

watch(
  [localTitle, localFontChosen, localcategoryChosen, localstatusChosen],
  () => {
    const isTitleValid = !!localTitle.value
    const isFontValid = !!localFontChosen.value
    const isCategoryValid = !!localcategoryChosen.value
    const isStatusValid = !!localstatusChosen.value

    const isValid = isTitleValid && isFontValid && isCategoryValid && isStatusValid

    emit('update:canProceedStep2', isValid)
  }
)

</script>
