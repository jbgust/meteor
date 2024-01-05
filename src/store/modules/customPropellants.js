// initial state
import Axios from 'axios'

const state = () => ({
    customPropellants: [],
    loadingPropellant: false
})

// getters
const getters = {
    customPropellants: (state) => {
        return state.customPropellants
    },
    loadingPropellant: (state) => {
        return state.loadingPropellant
    }
}

// actions
const actions = {
    loadCustomPropellants({ commit }, showError = (message) => console.error(message)) {
        commit('setLoadingPropellant', true)
        Axios.get('/propellants')
            .then(function(response) {
                commit('setCustomPropellants', response.data._embedded.meteorPropellants)
            })
            .catch(function(error) {
                console.error(error)
                showError('Failed to retrieve propellant list')
            })
            .finally(() => commit('setLoadingPropellant', false))
    },
    deletePropellant({ dispatch }, { propellant, showError = (message) => console.error(message), successCallback = () => {} }) {
        Axios.delete(`/propellants/${propellant.id}`)
            .then(successCallback)
            .catch(function(error) {
                console.error(error)
                showError('Delete action failed')
            })
            .finally(() => dispatch('loadCustomPropellants'))
    }
}

// mutations
const mutations = {
    setCustomPropellants(state, customPropellants) {
        state.customPropellants = customPropellants
    },
    setLoadingPropellant(state, isLoading) {
        state.loadingPropellant = isLoading
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
