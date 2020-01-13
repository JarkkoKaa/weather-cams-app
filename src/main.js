import Vue from "vue";
import App from "./App.vue";
// import bootstrap Vue css files
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// import bootstrap Vue
import { BootstrapVue } from "bootstrap-vue";

import store from './store'
Vue.config.productionTip = false;

new Vue({
  BootstrapVue,
  store,
  render: h => h(App)
}).$mount("#app");
