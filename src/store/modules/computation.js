const state = () => ({
    previousComputation: null,
    currentComputation: null,
    compareWithPrevious: false,
    useAsRef: false,
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
    },
    useAsRef: (state) => {
        return state.useAsRef
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
        if (state.useAsRef) {
            state.previousMotors[0] = state.previousMotors[1]
        } else {
            state.previousMotors = [state.previousMotors[1], state.previousMotors[0]]
            state.previousComputation = lastComputation
        }
    },
    saveCurrentMotor(state, motorConfiguration) {
        const assign = Object.assign({}, motorConfiguration)
        // TODO : améliorer ?
        assign.grainConfig = Object.assign({}, motorConfiguration.grainConfig)
        state.previousMotors = [assign, state.previousMotors[0]]
    },
    setPreviousComputation(state, previousComputation) {
        if (!state.useAsRef) {
            state.previousComputation = previousComputation
        }
    },
    setCompareWithPrevious(state, compareWithPrevious) {
        state.compareWithPrevious = compareWithPrevious
        if (!compareWithPrevious) {
            state.useAsRef = false
        }
    },
    toggleUseAsRef(state) {
        state.useAsRef = !(state.useAsRef)
        if (state.useAsRef) {
            state.previousComputation = state.currentComputation
            state.previousMotors[1] = state.previousMotors[0]
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
