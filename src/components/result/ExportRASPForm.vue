<template>
        <v-btn id="btnShowRASPExport" class="pr-4" small @click="show">
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
                                            <v-text-field id="motorDiameter" label="Motor diameter:" v-model="config.motorDiameter" :rules="motorDiameterRules" :suffix="units.lengthUnit"/>
                                            <v-text-field id="motorLength" label="Motor length:" :rules="motorLengthRules" :suffix="units.lengthUnit" v-model="config.motorLength"/>
                                            <v-text-field id="motorWeight" label="Motor weight:" :rules="massRules" :suffix="units.massUnit" v-model="config.motorWeight"/>
                                            <v-text-field id="delay" label="Delay:"  suffix="s" persistent-hint :hint="delayHint" :rules="delayRules" v-model="config.delay"/>
                                        </v-form>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="$refs.helpDialog.show()">Help</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn @click="close">Close</v-btn>
                            <v-btn id="btnExportRASP" v-if="isLogged" @click="exportRASP" :loading="computationInProgress" color="primary">Export</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <help-dialog ref="helpDialog"></help-dialog>
            </v-layout>
        </v-btn>
</template>

<script>

import Axios from 'axios'
import { greaterThanRule, regexValidator, requiredValidator } from '../../modules/formValidationRules'
import HelpDialog from '../motor/HelpDialog'
import { mapGetters } from 'vuex'
import { SI_UNITS } from '@/modules/computationUtils.mjs'
const delayHintMessage = 'This is the list of available delays, separated by dashes. If the motor has an ejection charge but no delay use "0" and if it has no ejection charge at all use "P" (plugged).'
export default {
    name: 'export-rasp',
    components: { HelpDialog },
    props: {
        units: Object
    },
    data() {
        return {
            config: {},
            dialog: false,
            safeKN: false,
            computationRequest: null,
            motorDiameterRules: [],
            motorLengthRules: [],
            massRules: [],
            delayHint: delayHintMessage,
            computationInProgress: false,
            delayRules: [requiredValidator('Field is required'), regexValidator(/^([0-9]+|P)(-([0-9]+|P))*$/g, `Invalid format. ${delayHintMessage}`)]
        }
    },
    computed: {
        ...mapGetters('computation', ['currentComputation']),
        ...mapGetters('authentication', ['isLogged'])
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
        setComputationRequest(grainType, request) {
            this.computationRequest = Object.assign({}, request)
            this.massRules = greaterThanRule(Number(this.units.type === SI_UNITS ? this.currentComputation.performanceResult.grainMass / 1000 : this.currentComputation.performanceResult.grainMass))
            this.motorDiameterRules = greaterThanRule(Number(request.chamberInnerDiameter))
            this.motorLengthRules = greaterThanRule(Number(request.chamberLength))
            this.safeKN = this.currentComputation.performanceResult.safeKN
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
                    projectName: motorName || 'default',
                    safeKN: this.safeKN
                }
                this.computationInProgress = true
                const me = this
                Axios.post('/export/rasp', exportRequest)
                    .then(function(response) {
                        me.computationInProgress = false
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
                    .catch(function(error) {
                        me.computationInProgress = false
                        alert('Export fail due to unknown error')
                        console.error(error)
                    })
            }
        }
    }
}
</script>

<style scoped>

</style>
