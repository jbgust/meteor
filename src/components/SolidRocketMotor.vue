<template>
    <v-container>
        <v-form ref="formJSRM">

            <motor-configuration v-model="formValue"/>
            <advanced-configuration ref="advanceSettings" v-model="extraConfig" @reset="resetConfig"/>

            <v-btn v-if="!disabledButtons" @click="runComputation" color="primary">Submit</v-btn>
            <v-btn v-if="!disabledButtons" @click="reset">Reset</v-btn>
            <v-btn v-if="!disabledButtons" @click="$refs.advanceSettings.show()">
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
import { defaultAdvanceConfig } from '../modules/dataDemo'

export default {
    name: 'solid-rocket-motor',
    components: { MotorConfiguration, AdvancedConfiguration },
    methods: {
        resetConfig() {
            this.extraConfig = this.getDefaultAdvanceConfig()
        },
        getDefaultAdvanceConfig() {
            return Object.assign({}, defaultAdvanceConfig)
        },
        runComputation() {
            const component = this
            if (this.$refs.formJSRM.validate()) {
                Axios.post('/compute', {}, { data: this.getValues() })
                    .then(function(response) {
                        component.$emit('computation-success', response.data)
                    })
                    .catch(function(error) {
                        component.errorMessage = error.response.data.message
                        component.errorDetail = error.response.data.detail
                        component.showError = true
                    })
            }
        },
        getValues() {
            if (this.$refs.formJSRM.validate()) {
                const request = Object.assign({}, this.formValue)
                request.extraConfig = Object.assign({}, this.extraConfig)
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
        reset() {
            this.formValue = {}
            this.extraConfig = this.getDefaultAdvanceConfig()
            this.$refs.formJSRM.resetValidation()
            this.$emit('reset')
        },
        disabledControls(disabled) {
            this.disabledButtons = disabled
        }
    },
    data() {
        return {
            formValue: { },
            extraConfig: this.getDefaultAdvanceConfig(),
            errorMessage: null,
            errorDetail: null,
            showError: false,
            disabledButtons: false
        }
    }
}
</script>
