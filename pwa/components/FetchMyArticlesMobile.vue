<template>
    <v-expansion-panels v-for="(article,index) in articles" :key="index" variant="popout">
        <v-expansion-panel :title="article.title">
            <v-expansion-panel-text>
                <v-list density="compact">
                    <v-list-item>
                    <template v-slot:prepend>
                        <v-icon color="primary">mdi-tag</v-icon>
                    </template>
                    <v-list-item-title>Categoria: {{ article.category }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                    <template v-slot:prepend>
                        <v-icon color="red">mdi-heart</v-icon>
                    </template>
                    <v-list-item-title>Curtidas: {{ article.likes }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                    <template v-slot:prepend>
                        <v-icon color="blue">mdi-comment</v-icon>
                    </template>
                    <v-list-item-title>Comentários: {{ article.comments }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                    <template v-slot:prepend>
                        <v-icon color="green">mdi-eye</v-icon>
                    </template>
                    <v-list-item-title>Visualizações: {{ article.views }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <template v-slot:prepend>
                            <v-icon color="orange">mdi-information</v-icon>
                        </template>
                        <v-list-item-title>
                            Status: <span :style="{color: article.status === 'publico' ? 'green' : 'red' }">{{ article.status }}</span>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
                    <v-btn
                        class="ma-2 ml-6"
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
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup lang="ts"> 
const props = defineProps({
    articles: Array
})
</script>