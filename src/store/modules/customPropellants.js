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
    loadCustomPropellants({ commit }) {
        Axios.get('/propellants')
            .then(function(response) {
                commit('setCustomPropellants', response.data._embedded.meteorPropellants)
            })
            .catch(function(error) {
                console.error(error)
            })
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
