import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing/Landing.vue'
import Login from '../views/Auth/Login/Login.vue'
import Register from '../views/Auth/Register/Register.vue'
import ForgotPassword from '../views/Auth/ForgotPassword/ForgotPassword.vue'
import ResetPassword from '../views/Auth/ResetPassword/ResetPassword.vue'
import Room from '../views/Room/Room.vue'
import Profile from '../views/Profile/Profile.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { requiresVisitor: true }
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: { requiresVisitor: true }
  },
  {
    path: '/room',
    name: 'Room',
    component: Room,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/room'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
