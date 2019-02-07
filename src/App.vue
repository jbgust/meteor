<template>
    <b-container fluid>
      <b-row>
        <b-col cols="*">
          <solid-rocket-motor @computation-success="loadResult"/>
        </b-col>
        <b-col cols="*">
          <performance-info v-show="asResult" ref="performanceResult"/>
        </b-col>
        <b-col>
          <thrust-graphical-result v-show="asResult" ref="thrustGraphicalResult"/>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import SolidRocketMotor from './components/SolidRocketMotor'
import ThrustGraphicalResult from './components/result/ThrustGraphicalResult'
import PerformanceInfo from './components/result/PerformanceInfo'

Vue.use(BootstrapVue)

export default {
    name: 'app',
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

<style lang="scss">

</style>
