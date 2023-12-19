// import Vue from 'vue'
// import App from './App.vue'
// import Axios from 'axios'
// import vuetify from './plugins/vuetify'
// import store from './store'
//
// Vue.config.productionTip = false
//
// new Vue({
//     created: function() { Axios.defaults.baseURL = process.env.VITE_METEOR_BACKEND_BASE_URL },
//     vuetify,
//     store,
//     render: h => h(App)
// }).$mount('#app')


// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
app.mount('#app')

