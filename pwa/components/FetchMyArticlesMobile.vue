<template>
    <v-expansion-panels
        v-for="article in articles"
        :key="article.id"
      >
        <v-expansion-panel :title="article.title">
          <v-row class="ma-2" no-gutters>
            <v-expansion-panel-text>
                <p class="ma-1">Categoria: <v-chip color="primary" variant="text" density="comfortable">{{ article.category }}</v-chip></p>
                <p class="ma-1">Likes: <v-chip color="primary" variant="text" density="comfortable">{{ article.likes }}<v-icon class="ml-2">mdi-thumb-up</v-icon></v-chip></p>
                <p class="ma-1">Comentários: <v-chip color="primary" variant="text" density="comfortable">{{ article.comments }}<v-icon class="ml-2">mdi-comment-multiple</v-icon></v-chip></p>
                <p class="ma-1">Vizualizaçõess: <v-chip color="primary" variant="text" density="comfortable">{{ article.views }}<v-icon class="ml-2">mdi-eye</v-icon></v-chip></p>
                <p class="ma-1">Status: <v-chip class="text-uppercase" :color="article.status === 'publico' ? 'green' : 'red'" density="comfortable">{{ article.status }}</v-chip></p>
            </v-expansion-panel-text>
            <v-expansion-panel-text>
              Ações: 
              <v-btn
                color="primary"
                size="small"
              > Opções
                <v-menu activator="parent" location="end">
                  <v-list>
                    <v-list-item density="comfortable" style="cursor: pointer">
                      <v-list-item-title @click="deleteArticle(true,item._id)">
                        <v-icon class="ma-2" color="red">mdi-delete</v-icon>Deletar
                      </v-list-item-title>
                      <v-list-item-title @click="navigateTo(`/artigos/edicao/${item._id}`)">
                        <v-icon class="ma-2" color="blue">mdi-pencil</v-icon>Editar
                      </v-list-item-title>
                      <v-list-item-title @click="navigateTo(`/artigos/${item._id}`)">
                        <v-icon class="ma-2" color="blue">mdi-eye</v-icon>Revisar
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-expansion-panel-text>
          </v-row>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup lang="ts"> 
defineProps({
    articles: Array
})
</script>