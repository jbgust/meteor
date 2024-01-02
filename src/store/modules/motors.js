// initial state
import Axios from 'axios'

const state = () => ({
    motors: []
})

// getters
const getters = {
    motors: (state) => {
        return state.motors
    }
}

// actions
const actions = {
    loadMotors({ commit }, showError = (message) => console.error(message)) {
        Axios.get('/motors')
            .then(function(response) {
                commit('setMotors', response.data._embedded.motors)
            })
            .catch(function(error) {
                console.error(error)
                showError('Failed to retrieve motor list')
            })
    },
    deleteMotor({ dispatch }, { motor, showError = (message) => console.error(message) }) {
        Axios.delete(`/motors/${motor.id}`)
            .catch(function(error) {
                console.error(error)
                showError('Delete action failed')
            })
            .finally(() => dispatch('loadMotors'))
    }
}

// mutations
const mutations = {
    setMotors(state, motors) {
        state.motors = motors
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
