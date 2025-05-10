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
  />
</template>

<script lang="ts" setup>
 import { QuillEditor } from "@vueup/vue-quill";
 import '@vueup/vue-quill/dist/vue-quill.snow.css';

 const emit = defineEmits([
  'update:canProceedStep3',
])
  const state = reactive({
    content: '',
    _content: '',
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

watch(() => {
  const isArticleValid = !!state._content
  emit('update:canProceedStep3', isArticleValid)
})
</script>
