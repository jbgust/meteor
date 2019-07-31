<template>
    <v-container>
        <v-form ref="formJSRM">

            <motor-configuration v-model="formValue" :units="units" ref="motorConfiguration"/>
            <advanced-configuration ref="advanceSettings" v-model="extraConfig" @reset="resetConfig" :units="units"/>

            <v-btn v-if="!disabledButtons" @click="runComputation" color="primary" :loading="loading" >Submit</v-btn>
            <v-btn v-if="!disabledButtons" @click="reset">Reset</v-btn>
            <v-btn v-if="!disabledButtons" @click="$refs.advanceSettings.show()">
                <v-icon dark>settings</v-icon>
            </v-btn>

            <v-dialog ref="errorModal" max-width="700px" v-model="showError">

                <v-card>
                    <v-card-title
                        class="headline grey lighten-2"
                        primary-title>
                        Computation failed
                    </v-card-title>

                    <v-card-text>
                        <v-textarea readonly outline
                                    v-show="errorDetail == null"
                                    v-model="errorMessage"/>

                        <v-textarea readonly outline
                                    :label="errorMessage"
                                    v-show="errorDetail !== null"
                                    v-model="errorDetail"/>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="secondary"
                            @click="$emit('showDocumentation')">
                            Read documentation
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click="showError = false">
                            Close
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
import { defaultAdvanceConfig } from '../modules/dataDemo'
import { getCustomPropellant, isCustomPropellant } from '../modules/customPropellant'

export default {
    name: 'solid-rocket-motor',
    components: { MotorConfiguration, AdvancedConfiguration },
    data() {
        return {
            formValue: { },
            extraConfig: this.getDefaultAdvanceConfig(),
            errorMessage: null,
            errorDetail: null,
            showError: false,
            disabledButtons: false,
            loading: false
        }
    },
    props: {
        units: Object
    },
    methods: {
        resetConfig() {
            this.extraConfig = this.getDefaultAdvanceConfig()
        },
        getDefaultAdvanceConfig() {
            return Object.assign({}, defaultAdvanceConfig)
        },
        runComputation() {
            const component = this
            if (this.$refs.formJSRM.validate() && this.checkMotorDimensions()) {
                this.loading = true
                Axios.post('/compute', {}, { data: this.buildRequest() })
                    .then(function(response) {
                        component.$emit('computation-success', response.data)
                        component.loading = false
                    })
                    .catch(function(error) {
                        component.loading = false

                        if (error.response && error.response.data) {
                            component.errorMessage = error.response.data.message
                        } else {
                            component.errorMessage = 'Computation failed due to unknown error'
                        }

                        component.errorDetail = null
                        if (error.response && error.response.data && error.response.data.detail != null) {
                            component.errorDetail = error.response.data.detail
                            console.error(error.response.data.detail)
                        }
                        component.showError = true
                    })
            }
        },
        checkMotorDimensions() {
            if (this.formValue.chamberLength < this.formValue.segmentLength * this.formValue.numberOfSegment) {
                this.errorDetail = `The 'combustion chamber length' should be >= 'grain segment length' times 'number of segment'. Otherwise your grain configuration will not fit into your motor. Increase your combustion chamber length and/or decrease : grain segment length, number of segment.`
                this.showError = true
                return false
            }
            return true
        },
        buildRequest() {
            if (this.$refs.formJSRM.validate()) {
                const request = Object.assign({}, this.formValue)
                request.extraConfig = Object.assign({}, this.extraConfig)
                request.measureUnit = this.units.type

                if (isCustomPropellant(this.formValue.propellantType)) {
                    request.customPropellant = getCustomPropellant('CUSTOM_propellant')
                }

                return request
            } else {
                return null
            }
        },
        loadForm(formData = {}, extraConfig = this.getDefaultAdvanceConfig()) {
            if (isCustomPropellant(formData.propellantType)) {
                this.$refs.motorConfiguration.loadPropellant(formData.customPropellant)
            }

            this.extraConfig = extraConfig
            this.formValue = formData
            this.$refs.formJSRM.resetValidation()
        },
        reset() {
            this.formValue = {}
            this.extraConfig = this.getDefaultAdvanceConfig()
            this.$refs.formJSRM.resetValidation()
            this.$emit('reset')
        },
        disabledControls(disabled) {
            this.disabledButtons = disabled
        }
    }
}
</script>
