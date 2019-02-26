<template>
    <v-container>
        <v-form ref="formJSRM">

            <motor-configuration v-model="defaultValue"/>
            <advanced-configuration ref="advanceSettings" v-model="defaultValue.extraConfig" @reset="resetConfig"/>

            <v-btn @click="runComputation" color="primary">Submit</v-btn>
            <v-btn @click="reset">Reset</v-btn>
            <v-btn @click="$refs.advanceSettings.show()">
                <v-icon dark>settings</v-icon>
            </v-btn>

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

<script>

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
                extraConfig: this.getdefaultAdvanceConfig()
            },
            errorMessage: null,
            errorDetail: null,
            showError: false
        }
    },
    methods: {
        resetConfig() {
            this.defaultValue.extraConfig = this.getdefaultAdvanceConfig()
        },
        getdefaultAdvanceConfig() {
            return {
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
        runComputation() {
            const component = this
            if (this.$refs.formJSRM.validate()) {
                Axios.post('/compute', {}, { data: this.defaultValue })
                    .then(function(response) {
                        component.$emit('computation-success', response.data)
                    })
                    .catch(function(error) {
                        console.log(error)
                        component.errorMessage = error.response.data.message
                        component.errorDetail = error.response.data.detail
                        component.showError = true
                    })
            }
        },
        reset() {
            this.$refs.formJSRM.reset()
        }
    }
}
</script>
