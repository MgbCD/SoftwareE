<script setup>
import { useForm, useField } from 'vee-validate'
import { useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'
import { validationSchema, imageSchema } from '../../validation/propiedadSchema'
import { collection, addDoc } from 'firebase/firestore'
import useImage from '../../composables/useImage' //composable
import useLocationMap from '../../composables/useLocationMap' //composable
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

const items = [1, 2, 3, 4, 5]
const { url, uploadImage, image } = useImage()
const { zoom, center, pin } = useLocationMap()

const router = useRouter()
const db = useFirestore()

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema
  }
})

const titulo = useField('titulo')
const imagen = useField('imagen')
const Precio = useField('Precio')
const Habitaciones = useField('Habitaciones')
const Baños = useField('Baños')
const Garages = useField('Garages')
const Descripcion = useField('Descripcion')

const submit = handleSubmit(async (values) => {
  const { imagen, ...propiedad } = values

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, 'propiedades'), {
    ...propiedad,
    imagen: url.value,
    ubicacion: center.value
  })
  if (docRef.id) {
    router.push({ name: 'admin-propiedades' })
  }
})
</script>


<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3"> Nueva propiedad </v-card-title>
    <v-card-subtitle class="text-h5 py-5">
      Crea una nueva propiedad llenando el formulario
    </v-card-subtitle>
    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Titulo para publicar tu propiedad"
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
      />
      <v-file-input
        accept="image/jpeg"
        label="adjunta la imagen"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        @change="uploadImage"
      />
      <div v-if="image" class="my-5">
        <p class="font-weight-bold">Imagen Propiedad:</p>
        <img class="w-50" :src="image" />
      </div>
      <v-text-field
        class="mb-5"
        label="Precio"
        v-model="Precio.value.value"
        :error-messages="Precio.errorMessage.value"
      />
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Habitaciones"
            class="mb-5"
            :items="items"
            v-model="Habitaciones.value.value"
            :error-messages="Habitaciones.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Baños"
            class="mb-5"
            :items="items"
            v-model="Baños.value.value"
            :error-messages="Baños.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Garages"
            class="mb-5"
            :items="items"
            v-model="Garages.value.value"
            :error-messages="Garages.errorMessage.value"
          />
        </v-col>
      </v-row>
      <v-textarea
        class="mb-5"
        label="Descripcion"
        v-model="Descripcion.value.value"
        :error-messages="Descripcion.errorMessage.value"
      />
      <h2 class="font-weight-bold text-center my-5">Ubicacion de la propiedad</h2>
      <div class="pb-10">
        <div style="height: 600px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker
              :lat-lng="center"
              draggable
              @moveend="pin"
             />

            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
      </div>
      <v-btn class="" color="green" block="" @click="submit"> Agregar propiedad</v-btn>
    </v-form>
  </v-card>
</template>
