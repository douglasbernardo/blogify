<template>
  <v-row justify="center">
    <!-- Card azul claro -->
    <v-col cols="12" md="8">
      <v-card class="pa-6 rounded-xl elevation-2" color="orange-darken-1" height="auto">
        <v-row no-gutters align="center" justify="space-between" class="fill-height">
          <!-- Card com texto -->
          <v-col cols="4">
            <div class="d-flex align-center pa-2" style="height: 100%;">
              <span class="search-text text-h6 font-weight-medium font-weight-bold">
                Busque por artigos ou aplique filtros
              </span>
            </div>
          </v-col>
          
          <!-- Campo de pesquisa -->
          <v-col cols="5">
            <v-text-field
              placeholder="Pesquise por artigos..."
              append-inner-icon="mdi-magnify"
              variant="solo"
              hide-details
              class="elevation-1"
              color="grey lighten-5"
            />
          </v-col>

          <!-- Botão de filtro -->
          <v-col cols="3" class="d-flex justify-end">
            <v-btn icon color="grey darken-1">
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ModernSearchComponent',
};
</script>

<style scoped>
.text-h6 {
  font-size: 1.25rem; /* Tamanho de fonte moderno */
}
.search-text{
  font-family: 'Bungee Spice';
}

.rounded-xl {
  border-radius: 16px; /* Borda arredondada mais moderna */
}

.v-text-field {
  border-radius: 8px;
}

.pa-6 {
  padding: 24px !important;
}
</style>

