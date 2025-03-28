<template>
    <v-expansion-panels
        v-for="article in articles"
        :key="article.id"
      >
        <v-expansion-panel :title="article.title">
            <v-expansion-panel-text>
                <v-row class="ma-2">
                    <v-card max-width="425">
                        <v-list lines="one">
                            <v-list-item title="Categoria?">
                                <template v-slot:subtitle>
                                    <span>Seu artigo faz parte da categoria de: <v-chip density="comfortable">{{ article.category }}</v-chip></span>
                                </template>
                            </v-list-item>
                            <v-list-item title="Likes">
                                <template v-slot:subtitle>
                                    <span class="">Seu artigo conta com <v-chip density="comfortable">{{ article.likes }}</v-chip> likes</span>
                                </template>
                            </v-list-item>
                            <v-list-item title="Comentários">
                                <template v-slot:subtitle>
                                    <span class="">Seu artigo conta com <v-chip density="comfortable">{{ article.comments }}</v-chip> comentários</span>
                                </template>
                            </v-list-item>
                            <v-list-item title="Vizualizações">
                                <template v-slot:subtitle>
                                    <span class="">Seu artigo conta com <v-chip density="comfortable">{{ article.views }}</v-chip> vizualizações</span>
                                </template>
                            </v-list-item>
                            <v-list-item title="Status">
                                <template v-slot:subtitle>
                                    <span class="">Está com o status de <v-chip density="comfortable">{{ article.status }}</v-chip></span>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-card>
                    <v-btn
                        class="ma-2"
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
                </v-row>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup lang="ts"> 
defineProps({
    articles: Array
})
</script>