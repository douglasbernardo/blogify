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
        v-model="articleOptions.fontTitle"
      ></v-select>
      <span>Escreva aqui</span>
      <v-textarea v-model="articleOptions.article"/>
      <span>Escolha um fonte para seu texto</span>
      <v-select
        v-model="articleOptions.fontTitle"
      ></v-select>
      <span>Escolha a categoria</span>
      <v-combobox
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
        type="submit"
        color="red"
        variant="tonal"
        @click="navigateTo('/artigos')"
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
  const route = useRoute()
  const articleOptions = ref<object>(null)
  const submit = () => {}
  const handleFileChange = () => {}
  onMounted(async ()=>{
    await axios.get(`http://localhost:3030/article/reading/${route.params.id}`).then((res)=>{
      articleOptions.value = res.data
    })
  })
</script>