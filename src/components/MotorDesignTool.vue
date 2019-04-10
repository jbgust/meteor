<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid grid-list-md fill-height>
        <v-layout row wrap>
            <v-flex d-flex lg3 md5>
                <v-card>

                    <v-toolbar card height="40px" v-if="!demo">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="exportConfig">
                                    <v-icon>save_alt</v-icon>
                                </v-btn>
                            </template>
                            <span>Save your work</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="browseFile">
                                    <v-icon>open_in_browser</v-icon>
                                </v-btn>
                            </template>
                            <span>Load your project</span>
                        </v-tooltip>

                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="$refs.helpDialog.show()">
                                    <v-icon>
                                        import_contacts</v-icon>
                                </v-btn>
                            </template>
                            <span>Documentation</span>
                        </v-tooltip>

                    </v-toolbar>

                    <v-alert
                        :value="displayImportError"
                        color="warning"
                        icon="priority_high">
                        {{errorMessage}}
                    </v-alert>

                    <div v-if="demo" style="padding: 15px 15px 0 15px;">
                        <v-btn block :to="'/motorDesign'" color="success" >Try it !</v-btn>
                    </div>

                    <input v-if="!demo" type="file" style="display: none;" ref="fileBrowser"
                           id="avatar" name="avatar" @change="loadFile" accept="application/json">
                    <solid-rocket-motor ref="form" @computation-success="loadResult" @reset="formReset"/>

                </v-card>
            </v-flex>
            <v-flex d-flex lg9 md7>
                <v-layout column wrap v-show="asResult">
                    <v-flex d-block shrink>
                        <v-card>
                            <v-toolbar card height="40px">
                                <v-toolbar-title>Motor performance</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <nozzle-design v-model="nozzleDesignValue" ref="nozzleDesign"></nozzle-design>
                                <v-btn color="info" small><v-icon @click="showPerformanceInfo = !showPerformanceInfo">{{showPerformanceInfo? 'expand_less' : 'expand_more'}}</v-icon></v-btn>
                            </v-toolbar>
                            <v-card-text v-show="showPerformanceInfo">
                                <performance-info ref="performanceResult"/>
                            </v-card-text>

                        </v-card>
                    </v-flex>
                    <v-flex d-flex>
                        <v-card>
                            <thrust-graphical-result ref="thrustGraphicalResult"/>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <help-dialog ref="helpDialog"></help-dialog>
    </v-container>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import SolidRocketMotor from './SolidRocketMotor'
import ThrustGraphicalResult from './result/ThrustGraphicalResult'
import HelpDialog from './motor/HelpDialog'
import PerformanceInfo from './result/PerformanceInfo'
import { demoForm, demoResultData } from '../modules/dataDemo'
import { importValidatorSchema } from '../modules/importValidator'
import NozzleDesign from './result/NozzleDesign'

Vue.use(Vuetify)

// see : https://www.npmjs.com/package/ajv#related-packages
const Ajv = require('ajv')

export default {
    name: 'motor-design-tool',
    components: { NozzleDesign, PerformanceInfo, ThrustGraphicalResult, SolidRocketMotor, HelpDialog },
    props: {
        demo: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            errorMessage: null,
            asResult: false,
            demoForm: Object.assign({}, demoForm),
            demoResultData: Object.assign({}, demoResultData),
            displayImportError: false,
            nozzleDesignValue: { convergenceAngle: 60, divergenceAngle: 24 },
            showPerformanceInfo: true
        }
    },
    mounted() {
        if (this.demo) {
            this.$refs.form.disabledControls(true)
            this.$refs.form.loadForm(this.demoForm)
            this.loadResult(this.demoResultData)
        }
    },
    methods: {
        browseFile() {
            this.$refs.fileBrowser.value = ''
            this.$refs.fileBrowser.click()
        },
        loadResult(data) {
            this.displayImportError = false
            this.$refs.thrustGraphicalResult.chart.data = data.thrustResults
            this.$refs.performanceResult.performance = data.performanceResult
            this.$refs.nozzleDesign.performance = data.performanceResult
            this.asResult = true
        },
        loadFile(event) {
            let ajv = new Ajv({ coerceTypes: true })

            let file = event.target.files[0]
            if (file) {
                var reader = new FileReader()
                reader.readAsText(file, 'UTF-8')
                const me = this
                reader.onload = function(evt) {
                    try {
                        let loadedConfig = JSON.parse(evt.target.result)
                        if (ajv.validate(importValidatorSchema, loadedConfig)) {
                            me.displayImportError = false
                            me.asResult = false
                            me.$refs.form.loadForm(loadedConfig.configs[0], loadedConfig.configs[0].extraConfig)
                            me.nozzleDesignValue = loadedConfig.configs[0].nozzleDesign
                            // If nextTick is not here, the form will not be valid when call runComputation()
                            Vue.nextTick(() => {
                                me.$refs.form.runComputation()
                            })
                        } else {
                            console.error('import fail', ajv.errors)
                            me.errorMessage = 'The file is not valid'
                            me.displayImportError = true
                        }
                    } catch (e) {
                        me.errorMessage = 'The file is not valid'
                        me.displayImportError = true
                    }
                }
                reader.onerror = function(evt) {
                    me.errorMessage = 'Can\'t read file'
                    me.displayImportError = true
                }
            }
        },
        exportConfig() {
            const dataToExport = {
                version: 1,
                configs: [
                    this.$refs.form.getValues()
                ]
            }

            if (dataToExport.configs[0] != null) {
                dataToExport.configs[0].nozzleDesign = this.nozzleDesignValue

                const fileContent = JSON.stringify(dataToExport)
                const fileName = 'meteor-export' + '.json'

                if (window.navigator.msSaveOrOpenBlob) {
                    const blob = new Blob([fileContent], { type: 'application/json' })
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
            } else {
                this.errorMessage = 'The form should be valid to be exported'
                this.displayImportError = true
            }
        },
        formReset() {
            this.asResult = false
            this.displayImportError = false
        }
    },
    watch: {
        demo(newValue, oldValue) {
            if (newValue !== undefined && !newValue) {
                this.asResult = false
                this.$refs.form.loadForm()
                this.$refs.form.disabledControls(false)
            }
        }
    }
}
</script>
