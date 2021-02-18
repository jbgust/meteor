const state = () => ({
    previousComputation: null,
    currentComputation: null,
    compareWithPrevious: false
})

// getters
const getters = {
    previousComputation: (state) => {
        return state.previousComputation
    },
    currentComputation: (state) => {
        return state.currentComputation
    },
    compareWithPrevious: (state) => {
        return state.compareWithPrevious
    }
}

// mutations
const mutations = {
    setCurrentComputation(state, currentComputation) {
        state.currentComputation = currentComputation
    },
    setPreviousComputation(state, previousComputation) {
        state.previousComputation = previousComputation
    },
    setCompareWithPrevious(state, compareWithPrevious) {
        state.compareWithPrevious = compareWithPrevious
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
