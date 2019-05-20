import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import jQuery from 'jquery';
import BootstrapVue from 'bootstrap-vue'
import 'popper.js';
import './assets/styles/app.scss';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'



window.$ = window.jQuery = jQuery;

Vue.use(BootstrapVue)
Vue.use(Vuetify, {
  iconfont: 'mdi'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')