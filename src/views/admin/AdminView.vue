<script setup>
import usePropiedades from '../../composables/usePropiedades'

const { propiedadesCollection, price, deleteItem } = usePropiedades()

console.log(propiedadesCollection)
</script>


<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold py-10">Panel de administración</h2>

  <v-btn color="green" variant="flat" :to="{ name: 'nueva-propiedad' }"> Nueva propiedad </v-btn>

  <v-card class="mx-auto mt-10" flat>
    <v-list>
      <v-list-item v-for="propiedad in propiedadesCollection" :key="propiedad.id">
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <img width="200" :src="propiedad.imagen" />
          </v-list-item-media>
        </template>
        <v-list-item-title class="text-left">{{ propiedad.titulo }}</v-list-item-title>
        <v-list-item-title class="text-left">{{ price(propiedad.Precio) }}</v-list-item-title>

        <template v-slot:append>
          <v-btn
            color="primary"
            variant="flat"
            class="mr-2"
            :to="{ name: 'editar-propiedad', params: { id: propiedad.id } }"
          >
            Editar
          </v-btn>
          <v-btn color="red-darken-3" variant="flat" @click="deleteItem(propiedad.id, propiedad.imagen)"> Eliminar </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>


