<template>
  <b-card>
    <b-form validated>
        <div class="form-container">
              <motor-configuration v-model="defaultValue"/>
              <advanced-configuration v-model="defaultValue.extraConfig"/>
        </div>

      <b-button variant="primary" @click="runComputation">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>

      <b-modal ref="errorModal" :size="errorDetail !== null ? 'lg': 'sm'" v-model="showError" centered
               title="Computation failed">
        <p class="my-4">{{errorMessage}}</p>
        <b-form-textarea disabled
                         v-show="errorDetail !== null"
                         v-model="errorDetail"
                         :max-rows="10"/>
      </b-modal>

    </b-form>
  </b-card>
</template>

<script type="text/ecmascript-6">

import Axios from 'axios'
import AdvancedConfiguration from './motor/AdvancedConfiguration'
import MotorConfiguration from './motor/MotorConfiguration'

export default {
    name: 'solid-rocket-motor',
    components: { MotorConfiguration, AdvancedConfiguration },
    data() {
        return {
            defaultValue: {
                throatDiameter: 17.3985248919802,
                outerDiameter: 69,
                coreDiameter: 20,
                segmentLength: 115,
                numberOfSegment: 4,
                outerSurface: 'INHIBITED',
                endsSurface: 'EXPOSED',
                coreSurface: 'EXPOSED',
                propellantType: 'KNDX',
                chamberInnerDiameter: 75,
                chamberLength: 470,
                extraConfig: {
                    densityRatio: 0.95,
                    nozzleErosionInMillimeter: 0,
                    combustionEfficiencyRatio: 0.95,
                    ambiantPressureInMPa: 0.101,
                    erosiveBurningAreaRatioThreshold: 6,
                    erosiveBurningVelocityCoefficient: 0,
                    nozzleEfficiency: 0.85,
                    nozzleExpansionRatio: null,
                    optimalNozzleDesign: true
                }
            },
            errorMessage: null,
            errorDetail: null,
            showError: false
        }
    },
    methods: {
        runComputation() {
            const component = this
            Axios.post('/compute', {}, { data: this.defaultValue })
                .then(function(response) {
                    component.$emit('computation-success', response.data)
                })
                .catch(function(error) {
                    component.errorMessage = error.response.data.message
                    component.errorDetail = error.response.data.detail
                    component.showError = true
                })
        }
    }
}
</script>

<style scoped>
    .form-container {
        max-height: 600px;
        overflow: auto;
    }
</style>
