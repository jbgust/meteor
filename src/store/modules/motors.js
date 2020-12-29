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
    loadMotors({ commit }) {
        Axios.get('/motors')
            .then(function(response) {
                commit('setMotors', response.data._embedded.motors)
            })
            .catch(function(error) {
                console.error(error)
            })
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
