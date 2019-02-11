<template>
    <v-container fluid fill-height>
        <v-layout row wrap>
            <v-flex xs3 >
                <solid-rocket-motor @computation-success="loadResult"/>
            </v-flex>
            <v-flex xs9>
                <performance-info v-show="asResult" ref="performanceResult"/>
                <thrust-graphical-result v-show="asResult" ref="thrustGraphicalResult"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import SolidRocketMotor from './SolidRocketMotor'
import ThrustGraphicalResult from './result/ThrustGraphicalResult'
import PerformanceInfo from './result/PerformanceInfo'

Vue.use(Vuetify)

export default {
    name: 'motor-design-tool',
    components: { PerformanceInfo, ThrustGraphicalResult, SolidRocketMotor },
    data() {
        return {
            asResult: false
        }
    },
    methods: {
        loadResult(data) {
            this.$refs.thrustGraphicalResult.chart.data = data.thrustResults
            this.$refs.performanceResult.performance = data.performanceResult
            this.asResult = true
        }
    }
}
</script>
