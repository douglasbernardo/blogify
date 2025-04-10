<template>
    <v-card
        class="mx-auto"
        max-width="500"
        elevation="5"
        title="Confirme a criação do Artigo"
    >
        <v-card-text>
        Tem certeza de que deseja postar este artigo? Após a postagem, as informações serão compartilhadas com a comunidade. Revise o conteúdo e as configurações antes de confirmar. Ao postar, você confirma que o conteúdo é de sua autoria e segue nossos Termos de Serviço. Clique em POSTAR para prosseguir ou em VOLTAR para fazer alterações. Agradecemos por contribuir!
        </v-card-text>
        <template v-slot:actions>
        <v-btn height="48" @click="navigateTo('/artigos')">
            Cancelar
        </v-btn>

        <v-btn
            class="flex-grow-1"
            height="48"
            color="blue"
            variant="tonal"
            @click="$emit('submit')"
        >
            Postar
        </v-btn>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
const emit = defineEmits(['submit'])
</script>