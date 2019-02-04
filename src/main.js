import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Axios from 'axios'

Axios.defaults.baseURL = 'http://jbise.lyon.tennaxia.org:8090'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
