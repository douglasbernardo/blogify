<template>
  <v-container>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">&nbsp;
        Meus Blogs
        <v-btn class="ma-2" @click="navigateTo('/create-publication')" append-icon="mdi-plus" color="blue">Novo</v-btn>
        <v-spacer></v-spacer>

        <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            density="compact"
            label="Pesquisar"
            single-line
            flat
            hide-details
            variant="solo-filled"
        ></v-text-field>
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table
          v-model:search="search"
          :items="articleStore.articles"
          :headers="headers"
          :items-length="articleStore.articles.length"
      >
        <template v-slot:item.rating="{ item }">
          <v-rating
            :model-value="item.rating"
            color="orange-darken-2"
            density="compact"
            size="small"
            readonly
          ></v-rating>
        </template>
        <template v-slot:item.status="{ item }">
          <div class="text-end">
            <v-chip
              :color="item.status === 'publicado' ? 'green' : 'red'"
              :text="item.status"
              class="text-uppercase"
              variant="elevated"
              size="small"
            ></v-chip>
          </div>
        </template>
        <template v-slot:item.actions="{item}">
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

          <v-dialog
            v-model="dialog"
            width="auto"
          >
            <v-card>
              <v-card-title class="bg-blue">
                Deseja deletar este artigo?
              </v-card-title>
              <v-card-text>
                Tem certeza que deseja deletar? Esta ação não pode ser desfeita.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" variant="flat" @click="dialog = false">Cancelar</v-btn>
                <v-btn color="red" @click="deleting">Deletar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
  import axios from "axios";
  import {useArticleStore} from "~/store/article_manager";

  const articleStore = useArticleStore()
  const search = ref('')
  const loading = ref(true)
  const headers = ref([
    { key: 'title', title: 'Nome' },
    { key: 'category', title: 'Categoria' },
    { key: 'likes', title: 'Likes' },
    { key: 'comments.length', title: 'Comentários' },
    { key: 'views', title: 'Visualizações' },
    { key: 'status', title: 'Status', align: 'end' },
    { key: 'actions', title: 'Acões', align: 'end', sortable: false },
  ])
  const dialog = ref(false)
  const id = ref('')
  const fetchArticles = () => {
    articleStore.my_articles(String(localStorage.getItem('user')))
  }
  onMounted( ()=>{
    fetchArticles()
  })
  const deleteArticle = (isOpen:boolean, idC:string) => {
    dialog.value = true
    id.value = idC
  }
  const deleting = () => {
    articleStore.delete_article({ email: localStorage.getItem('user'), id: id.value })
    dialog.value = false
    fetchArticles()
  }
</script>