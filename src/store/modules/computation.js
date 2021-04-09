const state = () => ({
    previousComputation: null,
    currentComputation: null,
    compareWithPrevious: false,
    previousMotors: []
})

// getters
const getters = {
    previousComputation: (state) => {
        return state.previousComputation
    },
    previousMotors: (state) => {
        return state.previousMotors
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
    switchResults(state) {
        const lastComputation = state.currentComputation
        state.currentComputation = state.previousComputation
        state.previousComputation = lastComputation
    },
    saveCurrentMotor(state, motorConfiguration) {
        state.previousMotors = [motorConfiguration, state.previousMotors[0]]
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
