<template>
    <b-container fluid>
      <b-row>
        <b-col lg="4">
          <solid-rocket-motor @computation-success="loadResult"></solid-rocket-motor>
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

Vue.use(BootstrapVue)

export default {
  name: 'app',
  components: { ThrustGraphicalResult, SolidRocketMotor },
  methods: {
    loadResult (data) {
      this.$refs.thrustGraphicalResult.chart.data = data.thrustResults
    }
  }
}
</script>

<style lang="scss">

</style>
