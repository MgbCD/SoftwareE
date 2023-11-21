<script setup>
import {watch} from 'vue'
import { useRoute } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import  useLocationMap  from '../composables/useLocationMap'
import usePropiedades from '../composables/usePropiedades'

const { zoom, center } = useLocationMap()

const { price } = usePropiedades()

const route = useRoute()
const db = useFirestore()
const docRef = doc(db, 'propiedades', route.params.id)
const propiedad = useDocument(docRef)

watch (propiedad, (propiedad)=>{
  center.value= propiedad.ubicacion
})

</script>
<template>
  <v-card>
    <v-card-title class="text-h5 font-weight-bold">
      {{ propiedad?.titulo }}
    </v-card-title>

    <v-row>
      <v-col>
        <v-img :src="propiedad?.imagen" height="300" contain />
      </v-col>
    </v-row>

    <v-row class="bg-blue-grey-lighten-5">
      <v-col>
        <v-card-text>
          Baños:
          <span class="font-weight-bold">{{ propiedad?.Baños }}</span>
        </v-card-text>
      </v-col>

      <v-col>
        <v-card-text>
          Habitaciones:
          <span class="font-weight-bold">{{ propiedad?.Habitaciones }}</span>
        </v-card-text>
      </v-col>

      <v-col>
        <v-card-text>
          Garages:
          <span class="font-weight-bold">{{ propiedad?.Garages }}</span>
        </v-card-text>
      </v-col>

      <v-col>
        <v-card-text>
          Precio:
          <span class="font-weight-bold">{{ price(propiedad?.Precio) }}</span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <div class="text-pre-wrap py-10">
          {{ propiedad?.Descripcion }}
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="py-10" style="height: 600px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center"  />

            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>