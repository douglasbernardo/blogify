<template>
  <form @submit.prevent="">
    <v-row>
      <v-col cols="12" sm="12" lg="12">
        <span class="mb-3">Título</span>
        <span class="ml-4 text-grey">Esse título será mostrado no card principal</span>
        <v-text-field
          v-model="localTitle"
          @update:model-value="emit('update:articleTitle', $event)"
        ></v-text-field>
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
      @change="$emit('handleFileChange',$event)"
    ></v-file-input>
  </form>
</template>

<script lang="ts" setup>
const props = defineProps({
  articleTitle: String,
  categoryChosen: String,
  statusChosen: String,
  fontsTitle: Array,
  categories: Array,
  status: Array
})

const localTitle = ref(props.articleTitle)
const localcategoryChosen = ref(props.categoryChosen)
const localstatusChosen = ref(props.statusChosen)

const emit = defineEmits([
  'handleFileChange',
  'update:articleTitle',
  'update:categoryChosen',
  'update:statusChosen',
  'update:canProceedStep2'
])

watch(
  [localTitle, localcategoryChosen, localstatusChosen],
  () => {
    const isTitleValid = !!localTitle.value
    const isCategoryValid = !!localcategoryChosen.value
    const isStatusValid = !!localstatusChosen.value

    const isValid = isTitleValid && isCategoryValid && isStatusValid

    emit('update:canProceedStep2', isValid)
  }
)

</script>
