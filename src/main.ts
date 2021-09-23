import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

new Vue({
    created: function() { Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL },
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')
