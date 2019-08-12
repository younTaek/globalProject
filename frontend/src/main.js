import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AOS from 'aos';
import axios from 'axios'

import 'aos/dist/aos.css'; 

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(BootstrapVue)
AOS.init();

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})