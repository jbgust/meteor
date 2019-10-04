<template>
        <v-btn class="pr-4" small @click="show">
            <v-icon left>mdi-file-export-outline</v-icon>
            RASP export
            <v-layout row justify-center>
                <v-dialog scrollable v-model="dialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title
                            class="headline grey lighten-2"
                            primary-title>
                            RASP export
                        </v-card-title>
                        <v-card-text>
                            <v-layout column>
                                <v-flex>
                                    <div style="padding: 10px;">
                                        <v-form ref="exportRaspForm" class="mr-5 ml-5">
                                            <v-text-field id="motorDiameter" label="Motor diameter:" v-model="config.motorDiameter" :rules="greaterThanRules" :suffix="units.lengthUnit"/>
                                            <v-text-field id="motorLength" label="Motor length:" :rules="greaterThanRules" :suffix="units.lengthUnit" v-model="config.motorLength"/>
                                            <v-text-field id="motorWeight" label="Motor weight:" :rules="greaterThanRules" :suffix="units.massUnit" v-model="config.motorWeight"/>
                                            <v-text-field id="delay" label="Delay:" hint="psiLabel" :rules="delayRules" :persistent-hint="true"  v-model="config.delay"/>
                                        </v-form>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="close">Close</v-btn>
                            <v-btn @click="exportRASP" color="primary">Download</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </v-btn>
</template>

<script>

import Axios from 'axios'
import { greaterThanRule, regexValidator, requiredValidator } from '../../modules/formValidationRules'

export default {
    name: 'export-rasp',
    props: {
        units: Object
    },
    data() {
        return {
            config: {},
            dialog: false,
            computationRequest: null,
            greaterThanRules: greaterThanRule(0),
            delayRules: [requiredValidator('Field is required'), regexValidator(/^([0-9]+|P)(-([0-9]+|P))*$/g, 'Invalid format. This is the list of available delays, separated by dashes. If the motor has an ejection charge but no delay use "0" and if it has no ejection charge at all use "P" (plugged).')]
        }
    },
    methods: {
        show() {
            this.dialog = true
        },
        close() {
            this.$refs.exportRaspForm.reset()
            this.dialog = false
        },
        download() {
        },
        isFormValid() {
            return this.$refs.exportRaspForm ? this.$refs.exportRaspForm.validate() : true
        },
        setComputationRequest(request) {
            this.computationRequest = Object.assign({}, request)
        },
        exportRASP() {
            if (this.isFormValid()) {
                let fileName = 'meteor-RASP' + '.eng'
                let motorName = this.computationRequest.name
                if (motorName != null) {
                    fileName = 'meteor-RASP_' + motorName + '.eng'
                }

                const exportRequest = {
                    computationRequest: this.computationRequest,
                    delay: this.config.delay,
                    motorDiameter: this.config.motorDiameter,
                    motorLength: this.config.motorLength,
                    motorWeight: this.config.motorWeight,
                    projectName: motorName || 'default'
                }
                Axios.post('/export/rasp', {}, { data: exportRequest })
                    .then(function(response) {
                        const fileContent = response.data

                        if (window.navigator.msSaveOrOpenBlob) {
                            const blob = new Blob([fileContent], { type: 'text/plain' })
                            window.navigator.msSaveOrOpenBlob(blob, fileName)
                        } else {
                            var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(fileContent)
                            var downloadAnchorNode = document.createElement('a')
                            downloadAnchorNode.setAttribute('href', dataStr)
                            downloadAnchorNode.setAttribute('download', fileName)
                            document.body.appendChild(downloadAnchorNode) // required for firefox
                            downloadAnchorNode.click()
                            downloadAnchorNode.remove()
                        }
                    })
            }
        }
    }
}
</script>

<style scoped>

</style>
