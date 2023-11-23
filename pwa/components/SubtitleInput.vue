<!-- SubtitleInput.vue -->
<template>
  <v-textarea rows="7" v-model="inputText" @input="handleInput" :style="{fontFamily: fontChosen}"></v-textarea>
</template>

<script lang="ts" setup>
const props = defineProps(['subtitles','fontChosen','inputText'])
const emits = defineEmits(['subtitles-updated'])

const inputText = ref('')

const extractSubtitles = () => {
  const lines = inputText.value.split('\n')
  const extractedSubtitles = []

  lines.forEach((line) => {
    const match = line.match(/^##\s*(.*)/)
    if (match) {
      extractedSubtitles.push(match[1])
    }
  })

  return extractedSubtitles
};

const handleInput = () => {
  const subtitles = extractSubtitles()
  emits('subtitles-updated', subtitles)
}
</script>
