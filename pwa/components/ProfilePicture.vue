<template>
  <v-sheet width="300" class="mx-5 pa-5">
    <v-row class="mt-n2" justify="center" no-gutters>
      <h3 class="text-center">Foto de Perfil</h3>
      <v-icon class="ml-2">mdi-image</v-icon>
    </v-row>
    <v-file-input
      :disabled="disabled"
      type="file"
      @change="handleFileChange"
      label="Escolher Imagem"
    ></v-file-input>
    <v-progress-linear v-if="selectedFile !== null && loading" color="primary" indeterminate></v-progress-linear>
    <p v-if="uploaded && !loading" class="text-center bg-green">{{ uploaded }}</p>
    <v-btn v-if="!disabled" color="blue" @click="uploadPicture" block class="mt-2">Enviar</v-btn>
    <v-btn v-if="!isProfile" @click="$emit('close')" variant="tonal" color="blue" size="small" block class="mt-2">Fechar</v-btn>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const props = defineProps({
  disabled: {type: Boolean,required:true},
  isProfile: {type: Boolean}
})
const selectedFile = ref(null);
const loading = ref(false)
const uploaded = ref(false)

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadPicture = async () => {
  loading.value = true
  const formData = new FormData();
  formData.append('image', selectedFile.value);
  try {
    const response = await axios.post('https://api.imgbb.com/1/upload?key=42dc821a3b9fca8c0dd3764fd1061974', formData);
    if(response.data) {
      await axios.post('http://localhost:3030/upload/upload-picture', {
        email: localStorage.getItem('user'),
        urlImage: response.data.data.thumb.url,
      })
      .then((res)=>{
        console.log(res)
        setTimeout(()=>{
          loading.value = false
          uploaded.value = "Upload Feito com Sucesso"
        },2400)
      });
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
