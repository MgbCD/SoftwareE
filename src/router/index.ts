import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import path from 'path'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/propiedades/:id',
      name: 'propiedad',
      component: () => import('../views/PropiedadView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import('../views/NotFoundView.vue')
    },
    //{
      //path: "/transactional",
      //name: "transactional",
      //component: () => import('../views/TransactionalView.vue')
    //},
    {
      path: "/registro",
      name: "registro",
      component: () => import('../views/RegistroView.vue')
    },
    {
      path: "/nosotros",
      name: "nosotro",
      component: () => import('../views/NosotrosView.vue')
    },


    { //rutas anidadas todo lo que pertenece a admin
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true }, //afecta a los hijos
      children: [
        {
          path: '/admin/propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue'),
          meta: { requiresAuth: true }, //afecta a los hijos
        },
        {
          path: '/admin/nueva',
          name: 'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue'),
          meta: { requiresAuth: true }, //afecta a los hijos
        },
        {
          path: '/admin/editar/:id', //inyeccion de id para saber cual estamos editando
          name: 'editar-propiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue'),
          meta: { requiresAuth: true }, //afecta a los hijos
        }
      ]
    }


  ]
})
//guard de navegacion
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requiresAuth) {
    //comprobar autenticado

    try {
      await authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({ name: 'login' })
    }

  } else {
    //no esta protegido, se muestra
    next()
  }
})

function authenticateUser() {
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //onserver observa si está autemticado y notifica unsubscribe no escucha mas cambios, solo una vez 
      unsubscribe()
      if (user) {
        resolve(user)
      } else {
        reject()
      }
    })


  })
}
export default router
