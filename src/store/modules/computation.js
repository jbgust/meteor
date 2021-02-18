const state = () => ({
    previousComputation: null,
    currentComputation: null
})

// getters
const getters = {
    previousComputation: (state) => {
        return state.previousComputation
    },
    currentComputation: (state) => {
        return state.currentComputation
    }
}

// mutations
const mutations = {
    setCurrentComputation(state, currentComputation) {
        state.previousComputation = Object.assign({}, state.currentComputation)
        state.currentComputation = currentComputation
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
