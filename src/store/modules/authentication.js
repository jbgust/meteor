// initial state
import Axios from 'axios'
import { decodeToken, isTokenValid } from '@/modules/utils.mjs'


export const TOKEN_STORAGE_KEY = 'accessToken-1'

const state = () => ({
    accessToken: null
})

// getters
const getters = {
    isLogged: (state) => {
        return isTokenValid(state.accessToken)
    },
    isDonator: (state) => {
        const decodedToken = decodeToken(state.accessToken)
        const isDonator = decodedToken ? decodedToken.donator : false
        return isDonator
    }
}

// actions
const actions = {
    loadToken({ commit }) {
        const accesstoken = localStorage.getItem(TOKEN_STORAGE_KEY)
        if (accesstoken) {
            commit('setToken', accesstoken)
            Axios.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`
        }
    },
    saveToken({ commit, state }, tokenInJSON) {
        commit('setToken', tokenInJSON.accessToken)
        localStorage.setItem(TOKEN_STORAGE_KEY, '' + tokenInJSON.accessToken)
        Axios.defaults.headers.common['Authorization'] = `Bearer ${tokenInJSON.accessToken}`
    },
    clearToken({ commit }) {
        commit('setToken', null)
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        delete Axios.defaults.headers.common.Authorization
    }
}

// mutations
const mutations = {
    setToken(state, token) {
        state.accessToken = token
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
