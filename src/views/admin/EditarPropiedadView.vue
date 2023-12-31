<script setup>
import { watch } from 'vue' //para asignar valores de la bd a propiedad
import { useRoute, useRouter } from 'vue-router'
import { useDocument, useFirestore } from 'vuefire'
import { doc, updateDoc } from 'firebase/firestore'
import { useField, useForm } from 'vee-validate'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import useImage from '@/composables/useImage'
import useLocationMap from '@/composables/useLocationMap' //para reutilizar
import { validationSchema } from '@/validation/propiedadSchema'

const items = [1, 2, 3, 4, 5]

const { url, uploadImage, image } = useImage()
const { zoom, center, pin } = useLocationMap()

const { handleSubmit } = useForm({ validationSchema })

const titulo = useField('titulo')
const imagen = useField('imagen')
const Precio = useField('Precio')
const Habitaciones = useField('Habitaciones')
const Baños = useField('Baños')
const Garages = useField('Garages')
const Descripcion = useField('Descripcion')

const route = useRoute()
const router = useRouter()

//obtener la propiedad a editar
const db = useFirestore()
const docRef = doc(db, 'propiedades', route.params.id)
const propiedad = useDocument(docRef)

watch(propiedad, (propiedad) => {
  titulo.value.value = propiedad.titulo
  Precio.value.value = propiedad.Precio
  Habitaciones.value.value = propiedad.Habitaciones
  Baños.value.value = propiedad.Baños
  Garages.value.value = propiedad.Garages
  Descripcion.value.value = propiedad.Descripcion
  center.value = propiedad.ubicacion
})

const submit = handleSubmit(async values => {
  const { imagen, ...propiedad } = values
  if (image.value) {
    const data = {
      ...propiedad,
      imagen: url.value,
      ubicacion: center.value
    }
    await updateDoc(docRef, data)
  } else {
    const data = {
      ...propiedad,
      ubicacion: center.value
    }
    await updateDoc(docRef, data)
  }

  router.push({name: 'admin-propiedades'})

})
</script>


<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="mt-5">
      <h1 class="text-h4 font-weight-bold">Editar Propiedad</h1>
    </v-card-title>
    <v-card-subtitle>
      <p class="text-h5">Edita los detalles de la propiedad</p>
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
        label="Titulo"
        class="mb-5"
      ></v-text-field>

      <v-file-input
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        accept="image/jpeg"
        prepend-icon="mdi-camera"
        label="Fotografía"
        class="mb-5"
        @change="uploadImage"
      ></v-file-input>

      <div class="my-5">
        <p class="font-weight-bold">Imagen Actual:</p>
        <img v-if="image" class="w-50" :src="image" />
        <img v-else class="w-50" :src="propiedad?.imagen" />
      </div>

      <v-text-field
        v-model="Precio.value.value"
        :error-messages="Precio.errorMessage.value"
        label="Precio"
        class="mb-5"
      ></v-text-field>

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
      ></v-textarea>

      <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
      <div class="pb-10">
        <div style="height: 600px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="green" block @click="submit"> Guardar Cambios </v-btn>
    </v-form>
  </v-card>
</template>
