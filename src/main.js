import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import NBCclient from '@salzoff/nbcclient';
import config from './config';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
console.log(config);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.$nbc = new NBCclient(config.apiUrl);
new Vue({
    render: h => h(App),
}).$mount('#app');
