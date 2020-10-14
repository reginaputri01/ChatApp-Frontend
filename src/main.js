import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_API_MAP,
    libraries: 'places'
  }
})
Vue.use(VueGeolocation)
Vue.use(VueToast, {
  position: 'bottom-right'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
