import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import MainView from '@/views/MainView.vue'
import PlanillasView from '@/views/PlanillasView.vue'
import ImportacionView from '@/views/ImportacionView.vue'
import useAuth from '@/store/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/planillas',
      name: 'planillas',
      component: PlanillasView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/importacion',
      name: 'importacion',
      component: ImportacionView,
      meta: {
        requireAuth: false
      }
    },
  ]
})

router.beforeEach((to,from,next) => {
  const auth = useAuth()
  const isAuth = auth.token

  if((to.meta.requireAuth) && (isAuth == null)) {
    next('login')
  }else {
    next()
  }

})

export default router
