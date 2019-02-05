<template>
    <b-container fluid>
      <b-row>
        <b-col lg="4">
          <solid-rocket-motor @computation-success="loadResult"/>
          <performance-info ref="performanceResult"/>
        </b-col>
        <b-col>
          <thrust-graphical-result ref="thrustGraphicalResult"/>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import SolidRocketMotor from './components/SolidRocketMotor'
import ThrustGraphicalResult from './components/ThrustGraphicalResult'
import PerformanceInfo from './components/PerformanceInfo'

Vue.use(BootstrapVue)

export default {
  name: 'app',
  components: { PerformanceInfo, ThrustGraphicalResult, SolidRocketMotor },
  methods: {
    loadResult (data) {
      this.$refs.thrustGraphicalResult.chart.data = data.thrustResults
      this.$refs.performanceResult.performance = data.performanceResult
    }
  }
}
</script>

<style lang="scss">

</style>
