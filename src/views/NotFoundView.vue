<template>
  <v-container fluid class="not-found-container">
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-icon class="error-icon" size="200" color="error darken-4" @click="startBouncing">mdi-emoticon-sad-outline</v-icon>
        <h1 class="headline">404 - Página no encontrada</h1>
        <p class="subtext py-6"> Estás como en davivienda, en el lugar equivocado</p>
        <v-btn color="error" dark @click="goHome">Volver a la página de inicio</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PageNotFound',
  methods: {
    goHome() {
      this.$router.push({ name: 'home' }); // Reemplaza 'inicio' con la ruta de tu página de inicio
    },
    startBouncing() {
      const icon = document.querySelector('.error-icon');
      if (icon) {
        icon.classList.add('bounce-animation');
        setTimeout(() => {
          icon.classList.remove('bounce-animation');
        }, 2000);
      }
    }
  }
}
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  background-color: #111; /* Fondo negro profundo */
  color: #fff; /* Texto en blanco para contraste */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error-icon {
  font-size: 200px;
  cursor: pointer; /* Hace que la cara sea clickeable */
}

.headline {
  font-size: 48px;
  margin: 20px 0;
}

.subtext {
  font-size: 24px;
}

.bounce-animation {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}
</style>