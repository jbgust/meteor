<template>
    <v-container>
        <v-form ref="formJSRM">

            <motor-configuration v-model="formValue" @resetValidation="$refs.formJSRM.resetValidation()" :units="units" ref="motorConfiguration"/>
            <advanced-configuration ref="advanceSettings" v-model="extraConfig" @reset="resetConfig" :units="units"/>

            <div class="text-center" v-if="!disabledButtons">
                <v-btn class="mr-4" @click="reset">Reset</v-btn>
                <v-btn class="mr-4" @click="$refs.advanceSettings.show()">
                    <v-icon dark id="btnAdvancedSettings">mdi-cog</v-icon>
                </v-btn>
                <v-btn class="mr-4" @click="runComputation" color="primary" :loading="loading" >Submit</v-btn>
            </div>

            <v-dialog ref="errorModal" max-width="700px" v-model="showError">

                <v-card>
                    <v-card-title
                        class="headline grey lighten-2"
                        primary-title>
                        Computation failed
                    </v-card-title>

                    <v-card-text class="mt-5">
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
        <v-overlay :value="loading">
            <v-col>
                <div class="text-center">
                    <v-progress-circular indeterminate size="64" width="6"></v-progress-circular>
                </div>
                <div class="text-center mt-30">Computation in progress ...</div>
            </v-col>
        </v-overlay>
    </v-container>
</template>

<script>

import Axios from 'axios'
import AdvancedConfiguration from './motor/AdvancedConfiguration'
import MotorConfiguration from './motor/MotorConfiguration'
import { defaultAdvanceConfig } from '../modules/dataDemo'
import { isCustomPropellant } from '../modules/customPropellant'
import { C_SLOT, END_BURNER, FINOCYL, HOLLOW, MOON_BURNER, ROD_TUBE, STAR } from '../modules/grainsConstants'

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
        getGrainType() {
            return this.formValue.grainType
        },
        runComputation() {
            const component = this
            let url = '/compute'
            let request
            let grainCheck = true
            if (this.getGrainType() === HOLLOW) {
                grainCheck = this.checkMotorDimensions()
            } else if (this.getGrainType() === FINOCYL) {
                grainCheck = true
                url += '/finocyl'
            } else if (this.getGrainType() === STAR) {
                grainCheck = true
                url += '/star'
            } else if (this.getGrainType() === END_BURNER) {
                grainCheck = true
                url += '/endburner'
            } else if (this.getGrainType() === MOON_BURNER) {
                grainCheck = true
                url += '/moonburner'
            } else if (this.getGrainType() === C_SLOT) {
                grainCheck = true
                url += '/cslot'
            } else if (this.getGrainType() === ROD_TUBE) {
                grainCheck = true
                url += '/rodtube'
            }
            request = this.buildRequest()

            if (this.$refs.formJSRM.validate() && grainCheck) {
                this.loading = true
                Axios.post(url, request)
                    .then(function(response) {
                        component.$emit('computation-success', response.data, request)
                        component.loading = false
                    })
                    .catch(function(error) {
                        component.loading = false

                        if (!(error.response && error.response.status === 401)) {
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
                        }
                    })
            }
        },
        checkMotorDimensions() {
            if (this.formValue.chamberLength < this.formValue.grainConfig.segmentLength * this.formValue.grainConfig.numberOfSegment) {
                this.errorDetail = `The 'combustion chamber length' should be >= 'grain segment length' times 'number of segment'. Otherwise your grain configuration will not fit into your motor. Increase your combustion chamber length and/or decrease : grain segment length, number of segment.`
                this.showError = true
                return false
            }
            return true
        },

        buildExport() {
            if (this.$refs.formJSRM.validate()) {
                let request = Object.assign({ }, this.formValue)
                request.extraConfig = Object.assign({}, this.extraConfig)
                request.measureUnit = this.units.type
                delete request.measureUnit
                if (isCustomPropellant(this.formValue.propellantId)) {
                    request.customPropellant = this.formValue.propellantId
                    delete request.propellantId
                } else {
                    request.propellantType = this.formValue.propellantId
                    delete request.propellantId
                }
                return request
            } else {
                return null
            }
        },
        buildRequest() {
            if (this.$refs.formJSRM.validate()) {
                let request = Object.assign({ }, this.formValue)
                request.extraConfig = Object.assign({}, this.extraConfig)
                request.measureUnit = this.units.type
                delete request.grainType
                request = Object.assign(request, request.grainConfig)
                delete request.grainConfig
                if (isCustomPropellant(this.formValue.propellantId)) {
                    request.customPropellant = this.formValue.propellantId
                    delete request.propellantId
                } else {
                    request.propellantType = this.formValue.propellantId
                    delete request.propellantId
                }

                request.grainType = this.getGrainType()

                return request
            } else {
                return null
            }
        },
        loadForm(formData = {}, extraConfig = this.getDefaultAdvanceConfig()) {
            this.extraConfig = extraConfig
            this.formValue = formData
            this.$refs.formJSRM.resetValidation()
        },
        getMotorName() {
            if (this.formValue.name) {
                return this.formValue.name
            }
            return 'Meteor-simulation'
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
