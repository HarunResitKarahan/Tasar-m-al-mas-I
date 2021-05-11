import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/cssfiles/Home_css/navbar.css'
import '@/cssfiles/Home_css/home.css'
import '@/cssfiles/Home_css/register.css'
import '@/cssfiles/Home_css/bigscreen.css'
import '@/cssfiles/Home_css/middlefield.css'
import '@/cssfiles/Home_css/footer.css'
import '@/cssfiles/Tests_css/quiz.css'
import '@/cssfiles/Profile_css/profile.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
