<template>
  <QuillEditor 
    v-model="state.content" 
    content-type="html" 
    style="height: 400px;"
    :options="state.editorOption"
    :disabled="state.disabled"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @update:content="onEditorChange"
    :article="state._content"
  />
</template>

<script lang="ts" setup>
 import { QuillEditor } from "@vueup/vue-quill";
 const emit = defineEmits([
  'update:canProceedStep3',
])
  const state = reactive({
    content: '',
    _content: '',
    editorOption: {
      placeholder: 'Escreva seu artigo aqui...',
      modules: {
        // toolbars: [
          // custom toolbars options
          // will override the default configuration
        // ],
        // other moudle options here
        // otherMoudle: {}
      },
      // more options
    },
    disabled: false
  })
  const onEditorBlur = (quill) => {
    console.log('editor blur!', quill)
  }
  const onEditorFocus = (quill) => {
    console.log('editor focus!', quill)
  }
  const onEditorReady = (quill) => {
    console.log('editor ready!', quill)
  }
  const onEditorChange = (html) => {
    console.log('editor change!', html)
    state._content = html
    emit('update:content',html)
  }

const props = defineProps({
  article: String
})

watch(() => {
  const isTitleValid = !!state._content
  emit('update:canProceedStep3', isTitleValid)
})
</script>
