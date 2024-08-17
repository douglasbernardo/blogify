<template>
    <v-row justify="center">
      <!-- Card azul claro -->
      <v-col cols="12" md="8">
        <v-card class="pa-4" color="blue-lighten-3" height="100px">
          <v-row no-gutters align="center" justify="space-between" class="fill-height">
            <v-col cols="5">
              <v-card class="arrow-card pa-4 d-flex align-center" color="red-darken-2" height="60px">
                <div class="text-h7 text-white font-weight-bold">
                  Busque por artigos ou aplique filtros
                </div>
              </v-card>
            </v-col>
            <v-col cols="7">
              <v-text-field
                placeholder="Pesquise por artigos...."
                append-inner-icon="mdi-magnify"
                variant='solo'
                hide-details
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
  </script>
  
<style scoped>

</style>
