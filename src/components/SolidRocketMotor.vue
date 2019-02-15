<template>
  <v-container>
    <v-form validated>

      <motor-configuration v-model="defaultValue"/>
      <advanced-configuration v-model="defaultValue.extraConfig"/>

      <v-btn variant="primary" @click="runComputation">Submit</v-btn>
      <v-btn type="reset" variant="danger">Reset</v-btn>

      <v-dialog ref="errorModal" :width="errorDetail !== null ? '700px': '300px'" v-model="showError">

            <v-card>
                <v-card-title
                    class="headline grey lighten-2"
                    primary-title>
                    Computation failed
                </v-card-title>

                <v-card-text>
                    <p class="my-4">{{errorMessage}}</p>
                    <v-textarea readonly
                                v-show="errorDetail !== null"
                                v-model="errorDetail"
                                rows="10"/>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        flat
                        @click="showError = false">
                        Ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-form>
  </v-container>
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
                throatDiameter: 17.39,
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
