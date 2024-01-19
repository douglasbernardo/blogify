<template>
  <v-card>
    <v-card-text>
      <v-list lines="two">
        <v-list-item
          v-for="article in props.articleArray"
          class="ma-3 pa-3 rounded-lg"
          elevation="4"
          :key="article"
          :title="article.title"
          :subtitle="article.category"
          density="compact"
          :to="`/artigos/reading/${article._id}`"
        >
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  const props = defineProps({
    articleArray: {required: true}
  })
</script>