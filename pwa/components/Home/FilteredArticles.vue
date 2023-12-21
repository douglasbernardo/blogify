<template v-if="articles_filtered">
  <v-row>
    <v-col v-for="(filtered,index) in filtered_articles" :key="index" cols="12" md="4">
      <v-card class="pa-2 ma-2" width="auto">
        <v-img
          :src="filtered.backgroundImage ? filtered.backgroundImage : 'no-image-article.avif'"
          class="align-center"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
          width="350px"
          cover
        >
          <v-card-title class="text-white text-center" v-text="filtered.title"></v-card-title>
        </v-img>
        <v-card-actions>
          <v-hover v-slot="{ isHovering, props }">
            <v-btn 
              v-bind="props"
              :class="isHovering ? 'bg-blue' : 'text-blue'" 
              size="small"
              variant="outlined"
              @click="doReading(filtered._id)"
              >Fazer leitura</v-btn>
          </v-hover>
          <v-icon
            class="ml-4" 
            @click="iLiked(filtered._id,index)"
            color="red" 
            icon="mdi-heart"
          ></v-icon><p class="ml-1">{{ filtered.likes }}</p>
          <v-icon class="ml-4" color="orange-lighten-2">mdi-comment</v-icon><p class="ml-1">{{ filtered.comments }}</p>
          <v-icon class="ml-4" color="light-blue">mdi-eye</v-icon><p class="ml-1">{{ filtered.views }}</p>
        </v-card-actions>
        <v-snackbar 
          v-model="snackbarErrorLike" 
          timeout="1200" 
          variant="flat" 
          color="red-darken-4" 
          :text="likeError"
          location="top"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  const props = defineProps({
    filtered_articles: {type: Array, required: true}
  })
</script>