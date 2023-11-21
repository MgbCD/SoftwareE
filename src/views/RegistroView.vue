<template>
  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3"> Registro de cliente </v-card-title>
    <v-card-subtitle class="text-h5 py-5"> Crea tu información por favor </v-card-subtitle>

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
      <v-text-field
        type="password"
        label="Confirm Password"
        bg-color="lime-lighten-4"
        v-model="confirmPassword.value.value"
      />

      <v-btn block color="red-accent-4" @click="registerUser">Crear usuario</v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import { loginSchema as validationSchema } from '../validation/loginSchema'
import { useAuthStore } from '../stores/auth'

const { handleSubmit } = useForm({ validationSchema })
const auth = useAuthStore()
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('password')

const registerUser = () => {
  if (email.value.valid && password.value.valid && confirmPassword.value.valid) {
    if (password.value.value === confirmPassword.value.value) {
      auth.register(email.value.value, password.value.value);
    } else {
      console.error('Las contraseñas no coinciden');
    }
  } else {
    console.error('Por favor, complete todos los campos correctamente.');
  }
}
</script>