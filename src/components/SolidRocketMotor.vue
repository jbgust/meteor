<template>
    <v-container>
        <v-form ref="formJSRM">

            <motor-configuration v-model="formValue"/>
            <advanced-configuration ref="advanceSettings" v-model="formValue.extraConfig" @reset="resetConfig"/>

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
            formValue: { extraConfig: this.getDefaultAdvanceConfig() },
            errorMessage: null,
            errorDetail: null,
            showError: false
        }
    },
    methods: {
        resetConfig() {
            this.formValue.extraConfig = this.getDefaultAdvanceConfig()
        },
        getDefaultAdvanceConfig() {
            // TODO : a déporter dans un fichier.mjs déjà présent dans dataDemo.mjs
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
                Axios.post('/compute', {}, { data: this.formValue })
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
        loadForm(formData) {
            this.formValue = formData
        },
        reset() {
            this.$refs.formJSRM.reset()
        }
    }
}
</script>
