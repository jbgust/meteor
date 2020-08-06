// initial state
import Axios from 'axios'
const TOKEN_STORAGE_KEY = 'token'

const state = () => ({
    token: null
})

// getters
const getters = {
    isLogged: (state) => {
        return !!state.token
    }
}

// actions
const actions = {
    loadToken({ commit }) {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY)
        if (token) {
            commit('setToken', JSON.parse(token))
            Axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token).accessToken}`
        }
    },
    saveToken({ commit, state }, token) {
        commit('setToken', token)
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token))
        Axios.defaults.headers.common['Authorization'] = `Bearer ${state.token.accessToken}`
    },
    clearToken({ commit }) {
        commit('setToken', null)
        localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
}

// mutations
const mutations = {
    setToken(state, token) {
        state.token = token
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
