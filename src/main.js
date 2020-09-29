import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from "axios";
import VueAxios from "vue-axios";
import { routes } from './routes';
import { store } from "./store/store";
import App from './App.vue';
import vuetify from './plugins/vuetify';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate/dist/vee-validate.full';
import es from 'vee-validate/dist/locale/es';
localize('es', es);

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.component('validation-provider', ValidationProvider);
Vue.component("validation-observer", ValidationObserver);

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
