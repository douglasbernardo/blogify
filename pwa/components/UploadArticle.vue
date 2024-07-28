<template>
  <div>
    <v-file-input type="file" @change="handleFileUpload" />
  </div>
</template>
  
<script lang="ts" setup>
  const emit = defineEmits(['file-selected'])
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    emit('file-selected', file);
  };
</script>