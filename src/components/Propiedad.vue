<script setup>
defineProps({
  propiedad: {
    type: Object
  },
  price: {
    type: Function
  }
})
</script>

<template>
  <v-col cols="10" md="4">
    <v-card>
      <v-img :src="propiedad.imagen" height="" cover />

      <v-card-title class="font-weight-bold">
        {{ propiedad.titulo }}
      </v-card-title>

      <v-card-text class="text-truncate">
        {{ propiedad.Descripcion }}
      </v-card-text>

      <template v-slot:actions>
        <v-btn block="" color="primary" variant="flat"
        :to="{name: 'propiedad', params: {id: propiedad.id} }"> Informacion </v-btn>
      </template>
    </v-card>
  </v-col>
</template>
