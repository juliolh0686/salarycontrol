import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
//import MainView from '@/views/MainView.vue'
import PlanillasView from '@/views/PlanillasView.vue'
import ImportacionView from '@/views/ImportacionView.vue'
import DashboardView from '@/views/DashboardView.vue'
import NoabonosView from '@/views/NoabonosView.vue'
import RepnoabonosView from '@/views/RepnoabonosView.vue'
import AutorizaciondescuentoView from '@/views/AutorizaciondescuentoView.vue'
import DeclaracionView from '@/views/DeclaracionView.vue'
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
      component: DashboardView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/planillas',
      name: 'planillas',
      component: PlanillasView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/importacion',
      name: 'importacion',
      component: ImportacionView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/noabonos',
      name: 'noabonos',
      component: NoabonosView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/repnoabonos',
      name: 'repnoabonos',
      component: RepnoabonosView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/autorizaciondesc',
      name: 'autorizaciondesc',
      component: AutorizaciondescuentoView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/declaracion',
      name: 'declaracion',
      component: DeclaracionView,
      meta: {
        requireAuth: true
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
