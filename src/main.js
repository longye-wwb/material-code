import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import axois from "./config/axios";
import Datef from "./config/date";
import 'element-ui/lib/theme-chalk/index.css';
import Cookie from "./config/util/cookie.js";
import "./assets/css/index.css";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$postserver = axois;
Vue.prototype.$dateFormater = Datef;
Vue.prototype.$cookie = Cookie;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')