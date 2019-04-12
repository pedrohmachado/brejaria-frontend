import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import jQuery from 'jquery';
import BootstrapVue from 'bootstrap-vue'
import 'popper.js';
import './assets/styles/app.scss';

window.$ = window.jQuery = jQuery;

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')