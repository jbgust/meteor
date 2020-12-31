// initial state
import Axios from 'axios'

const state = () => ({
    customPropellants: null
})

// getters
const getters = {
    customPropellants: (state) => {
        return state.customPropellants
    }
}

// actions
const actions = {
    loadCustomPropellants({ commit }, showError = (message) => console.error(message)) {
        Axios.get('/propellants')
            .then(function(response) {
                commit('setCustomPropellants', response.data._embedded.meteorPropellants)
            })
            .catch(function(error) {
                console.error(error)
                showError('Failed to retrieve propellant list')
            })
    },
    deletePropellant({ dispatch, commit }, { propellant, showError = (message) => console.error(message) }) {
        Axios.delete(`/propellants/${propellant.id}`)
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
