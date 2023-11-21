<script setup>
import { useField, useForm } from 'vee-validate' //usefiel atar y validar y mostrar errores
import { loginSchema as validationSchema } from '../validation/loginSchema'
import { useAuthStore } from '../stores/auth'

const { handleSubmit } = useForm({ validationSchema }) //composable retorna todo en un objeto

const auth = useAuthStore()

const email = useField('email')
const password = useField('password')

/*const submit = handleSubmit((values) => {
        console.log(values)
        auth.login(values.email, values.password)
       
    })*/
const submit = handleSubmit((values) => {
  if (values.email && values.password) {
    auth.login(values.email, values.password)
  } else {
    console.error('El campo de correo electrónico o contraseña está vacío.')
    //   mensaje de error 
  }
})
</script>


<template>
  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3"> Iniciar sesión </v-card-title>
    <v-card-subtitle class="text-h5 py-5"> Inicia sesión con tu cuenta </v-card-subtitle>

    <v-alert v-if="auth.hasError" class="my-5" type="error" :title="auth.errorMsg"></v-alert>

    <v-form class="mt-5">
      <v-text-field
        type="email"
        label="Email"
        bg-color="lime-lighten-4"
        v-model="email.value.value"
      />
      <v-text-field
        type="password"
        label="Password"
        bg-color="lime-lighten-4"
        v-model="password.value.value"
      />

      <v-btn block color="red-accent-4" @click="submit"> Iniciar sesión </v-btn>
       <p class="mt-2 py-3">¿No tienes una cuenta? <router-link to="/registro">Regístrate</router-link></p>
    </v-form>
  </v-card>
</template>
