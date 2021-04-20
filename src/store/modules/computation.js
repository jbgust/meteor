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
    getPreviousMotorComputation: (state) => {
        return Object.assign({}, state.previousMotors[1])
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
        state.previousMotors = [state.previousMotors[1], state.previousMotors[0]]
    },
    saveCurrentMotor(state, motorConfiguration) {
        const assign = Object.assign({}, motorConfiguration)
        // TODO : améliorer ?
        assign.grainConfig = Object.assign({}, motorConfiguration.grainConfig)
        state.previousMotors = [assign, state.previousMotors[0]]
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
