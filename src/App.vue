<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
</script>
<template>
  <v-app>
    <v-main class="text-center">
      <!-- Agregar la clase text-center para centrar -->
      <v-app-bar app color="teal-darken-4">
        <v-btn :to="{ name: 'home' }" class="ml-4">Bienes raices</v-btn>
        <v-spacer></v-spacer>
        <div v-if="auth.isAuth">
          <v-btn :to="{ name: 'admin-propiedades' }" class="mr-4">Admin</v-btn>
          <v-btn class="mr-4" @click="auth.logout">Cerrar sesión</v-btn>
        </div>
        <div v-else>
          <v-btn :to="{ name: 'home' }" class="mr-4">Home</v-btn>
          <v-btn :to="{ name: 'login' }" class="mr-4">Iniciar sesión</v-btn>
        </div>
      </v-app-bar>

      <RouterView />
    </v-main>

    <v-footer app class="bg-teal-darken-4 text-white pt-1 pb-1">
      <v-container>
        <div class="text-center">
          <div class="">
            <strong class="text-h6">Síguenos en las redes sociales:</strong>
          </div>
          <v-btn icon href="https://www.facebook.com/" class="mr-2">
            <v-icon color="indigo darken-4">mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon href="https://www.instagram.com/" class="mr-2">
            <v-icon color="pink darken-3">mdi-instagram</v-icon>
          </v-btn>
          <v-btn icon href="https://www.twitter.com/">
            <v-icon color="light-blue darken-3">mdi-twitter</v-icon>
          </v-btn>
        </div>

        <div class="mt-2">
          <p>&copy; {{ new Date().getFullYear() }} Software1</p>
        </div>
        <v-btn icon to="/nosotros" class="ml-auto">
          <!-- Adjust "to" attribute based on your router setup -->
          <v-icon color="yellow">mdi-information</v-icon>
          <!-- Adjust the icon as needed -->
        </v-btn>
      </v-container>
    </v-footer>
  </v-app>
</template>