import Vue from 'vue'
import App from './App.vue'

import router from './Router.js';
<<<<<<< HEAD
import store from './store/store';
=======
>>>>>>> network_2

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/scss/index.scss';

Vue.use(BootstrapVue);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
<<<<<<< HEAD
  store,
=======
>>>>>>> network_2
}).$mount('#app')
