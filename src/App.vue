<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <v-app>
    <v-main class="text-center">
      <!-- Agregar la clase text-center para centrar -->
      <v-app-bar app color="teal-darken-4">
        <v-btn :to="{ name: 'home' }" class="ml-4">Bienes raices-Taller3</v-btn>
        <v-spacer></v-spacer>
        <v-btn :to="{ name: 'home' }" class="mr-4">Home</v-btn>
        <v-btn :to="{ name: 'login' }" class="mr-4">Iniciar sesión</v-btn>
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
      </v-container>
    </v-footer>
  </v-app>
</template>