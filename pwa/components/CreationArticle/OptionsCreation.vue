<template>
  <div>
    <v-row v-if="!mobile">
      <v-col>
        <v-card>
          <v-card-title class="headline">Olá!</v-card-title>
          <v-card-text>
            Gostaríamos de saber como você prefere começar o seu artigo. Oferecemos duas opções:
          </v-card-text>
          <v-row align="center">
            <v-col>
              <v-radio-group v-model="localSelected">
                <v-radio label="Usar um aplicativo externo" value="externo"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <span>Se você já tem um aplicativo de edição de texto, como o Microsoft Word, Google Docs ou outro de sua escolha, pode optar por criar o artigo por lá. Posteriormente, você pode fazer o upload do arquivo final aqui.</span>
            </v-col>
            </v-row>
            <v-row align="center">
            <v-col>
              <v-radio-group v-model="localSelected">
                <v-radio label="Usar a plataforma Curious Mind" value="integrada"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <span>Se preferir, também oferecemos a opção de criar e editar o artigo diretamente em nossa plataforma. Isso pode facilitar a colaboração e o acompanhamento do progresso.</span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
      <v-card v-else class="pa-4" elevation="2">
        <v-card-title class="headline">Olá!</v-card-title>
        <v-card-text class="mb-6">
          Gostaríamos de saber como você prefere começar o seu artigo. Oferecemos duas opções:
        </v-card-text>
        <v-radio-group v-model="localSelected">
          <v-card-text class="text-body-2 grey--text">
            Você pode criar seu artigo em outro app, como Word ou Google Docs, e depois enviar o arquivo aqui.
          </v-card-text>
          {{ localSelected }}
          <v-radio
            label="Usar um aplicativo externo"
            value="externo"
          ></v-radio>
          <v-card-text class="text-body-2 grey--text">
            Ou se preferir crie e edite o artigo direto aqui na plataforma, facilitando a colaboração e acompanhamento.
          </v-card-text>
          <v-radio
            label="Usar a plataforma Curious Mind"
            value="integrada"
          ></v-radio>
      </v-radio-group>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
const {mobile} = useDisplay()
const props = defineProps({
  selectedOption: String
})

const localSelected = ref(props.selectedOption)
const emit = defineEmits([
  'update:selectedOption',
  'update:canProceedStep1'
])

watch(localSelected, (val) => {
  emit('update:selectedOption', val)
  emit('update:canProceedStep1', !!val) // só true se tiver valor
})
</script>
