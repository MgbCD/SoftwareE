import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const authUser = ref(null)
  const router = useRouter()

  const errorMsg = ref('')
  const errorCodes = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user
      }
    })
  })

  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        authUser.value = user
        router.push({ name: 'login' });
      })
      .catch((error) => {
        console.error(error);
        errorMsg.value = errorCodes[error.code];
      });
  }

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        authUser.value = user
        router.push({ name: 'admin-propiedades' });
      })
      .catch((error) => {
        console.error(error);
        errorMsg.value = errorCodes[error.code];
      });
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null
        router.push({ name: 'login' });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const hasError = computed(() => {
    return errorMsg.value
  })

  const isAuth = computed(() => {
    return authUser.value
  })

  return {
    register,
    login,
    logout,
    hasError,
    isAuth,
  }
})