import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import customPropellants from '@/store/modules/customPropellants'
import motors from '@/store/modules/motors'
import computation from '@/store/modules/computation'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        authentication,
        customPropellants,
        motors,
        computation
    },
    strict: process.env.NODE_ENV !== 'production'
})
