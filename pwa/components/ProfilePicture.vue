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

<script lang="ts" setup>
const props = defineProps({
  disabled: {type: Boolean,required:true},
  isProfile: {type: Boolean}
})
const selectedFile = ref<string | null>(null);
const loading = ref<boolean | null>(false)
const uploaded = ref<string | undefined>()

const handleFileChange = (event: any) => {
  selectedFile.value = event.target.files[0];
};

const uploadPicture = async () => {
  loading.value = true
  const formData = new FormData();
  formData.append('image', selectedFile.value);
  try {
    const {data, error} = await useFetch('https://api.imgbb.com/1/upload?key=42dc821a3b9fca8c0dd3764fd1061974',{
      method: 'post',
      body: formData
    });
    console.log('Primeiro console',data.value)
    if(data.value) {
      await useFetch(`${useRuntimeConfig().public.apiBase}/upload/upload-picture`,{
        method: 'post', 
        body: {
          email: localStorage.getItem('user'),
          imageOptions:{
            addImageUrl: data.value.data.thumb.url,
            deleteImageUrl: data.value.data.delete_url
          }
        }, 
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }).then((res) => {
        console.log('Primeiro console',res.data.value)
        if(res.data.value){
          setTimeout(()=>{
            loading.value = false
            uploaded.value = 'Upload Feito com sucesso'
          },2400)
        }else{
          uploaded.value = 'Falha no upload de imagem'
        }
      })
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
