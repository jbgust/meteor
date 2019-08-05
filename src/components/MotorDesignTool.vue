<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid grid-list-md fill-height>
        <v-layout row wrap>
            <v-flex d-flex lg3 md5>
                <v-card>
                    <v-app-bar flat height="40px" v-if="!demo">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="exportConfig" text>
                                    <v-icon>mdi-cloud-download</v-icon>
                                </v-btn>
                            </template>
                            <span>Save your work</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="browseFile" text>
                                    <v-icon>mdi-file-upload</v-icon>
                                </v-btn>
                            </template>
                            <span>Load your project</span>
                        </v-tooltip>
                        <v-divider
                            class="mx-2"
                            vertical
                        ></v-divider>
                        <v-btn-toggle
                            v-model="unitSelected" mandatory>
                            <div>
                                Units:
                                <v-btn value="SI" text>
                                    SI
                                </v-btn>
                                <v-btn value="IMPERIAL" text>
                                    IMPERIAL
                                </v-btn>
                            </div>
                        </v-btn-toggle>

                        <v-spacer></v-spacer>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="$refs.helpDialog.show()">
                                    <v-icon id="btnHelp">mdi-book-open-variant</v-icon>
                                </v-btn>
                            </template>
                            <span>Documentation</span>
                        </v-tooltip>

                    </v-app-bar>

                    <v-alert
                        :value="displayImportError"
                        color="warning"
                        icon="mdi-alert-box-outline">
                        {{errorMessage}}
                    </v-alert>

                    <v-alert
                        :value="displayUnitInfo"
                        type="info"
                    >
                        Changing unit <b>doesn't convert values</b> in the form. Please check your values even in <b>advanced settings</b> and your <b>custom propellant</b>.
                    </v-alert>

                    <div v-if="demo" style="padding: 15px 15px 0 15px;">
                        <v-btn block :to="'/motorDesign'" color="success" >Try it !</v-btn>
                    </div>

                    <input v-if="!demo" type="file" style="display: none;" ref="fileBrowser"
                           id="avatar" name="avatar" @change="loadFile" accept="application/json">
                    <solid-rocket-motor ref="form" :units="units" @computation-success="loadResult" @reset="formReset" @showDocumentation="$refs.helpDialog.show()"/>

                </v-card>
            </v-flex>
            <v-flex d-flex lg9 md7>
                <v-layout column wrap v-show="asResult">
                    <v-flex d-block shrink>
                        <v-card>
                            <v-app-bar flat height="40px" id="performanceInfosToolbar">
                                <v-toolbar-title>Motor performance</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <nozzle-design v-model="nozzleDesignValue" ref="nozzleDesign" :units="units"></nozzle-design>
                                <v-btn color="info" small class="ml-4 tooglePerf">
                                    <v-icon @click="showPerformanceInfo = !showPerformanceInfo">
                                        {{showPerformanceInfo? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                                    </v-icon>
                                </v-btn>
                            </v-app-bar>
                            <v-card-text v-show="showPerformanceInfo">
                                <performance-info :units="units" ref="performanceResult"/>
                            </v-card-text>

                        </v-card>
                    </v-flex>
                    <v-flex>
                        <thrust-graphical-result :units="units" ref="thrustGraphicalResult"/>
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
import { validateJSONImport, ajvValidator } from '../modules/importValidator'
// see : https://www.npmjs.com/package/ajv#related-packages
import NozzleDesign from './result/NozzleDesign'

Vue.use(Vuetify)

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
            displayUnitInfo: false,
            nozzleDesignValue: { convergenceAngle: 60, divergenceAngle: 24 },
            showPerformanceInfo: true,
            unitSelected: 'IMPERIAL',
            importInProgress: false
        }
    },
    mounted() {
        if (this.demo) {
            this.$refs.form.disabledControls(true)
            this.$refs.form.loadForm(this.demoForm)
            this.unitSelected = 'SI'
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
            this.displayUnitInfo = false
            this.$refs.thrustGraphicalResult.chart.data = data.motorParameters
            this.$refs.performanceResult.performance = data.performanceResult
            this.$refs.nozzleDesign.performance = data.performanceResult
            this.asResult = true
            Vue.nextTick(() => {
                this.$vuetify.goTo('#performanceInfosToolbar', { duration: 0, offset: 0, easing: 'easeInOutCubic' })
            }, this)
        },
        loadFile(event) {
            let file = event.target.files[0]
            if (file) {
                var reader = new FileReader()
                reader.readAsText(file, 'UTF-8')
                const me = this
                reader.onload = function(evt) {
                    try {
                        let loadedConfig = JSON.parse(evt.target.result)
                        if (validateJSONImport(loadedConfig)) {
                            me.importInProgress = true
                            me.displayImportError = false
                            me.asResult = false
                            me.$refs.form.loadForm(loadedConfig.configs[0], loadedConfig.configs[0].extraConfig)
                            me.nozzleDesignValue = loadedConfig.configs[0].nozzleDesign
                            me.unitSelected = loadedConfig.measureUnit
                            // If nextTick is not here, the form will not be valid when call runComputation()
                            Vue.nextTick(() => {
                                me.$refs.form.runComputation()
                                me.importInProgress = false
                            })
                        } else {
                            console.error('import fail', ajvValidator.errors)
                            me.errorMessage = 'The file is not valid'
                            me.displayImportError = true
                        }
                    } catch (e) {
                        console.error('import fail', ajvValidator.errors)
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
                    this.$refs.form.buildRequest()
                ],
                measureUnit: this.unitSelected
            }

            if (dataToExport.configs[0] != null) {
                dataToExport.configs[0].nozzleDesign = this.nozzleDesignValue

                const fileContent = JSON.stringify(dataToExport)
                let fileName = 'meteor-export' + '.json'
                let motorName = dataToExport.configs[0].name
                if (motorName != null) {
                    fileName = motorName + '.json'
                }

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
            // if leave demo
            if (newValue !== undefined && !newValue) {
                this.asResult = false
                this.$refs.form.loadForm()
                this.$refs.form.disabledControls(false)

                // reset the default unit to IMPERIAL when exit demo
                this.importInProgress = true
                this.unitSelected = 'IMPERIAL'
                Vue.nextTick(() => {
                    this.importInProgress = false
                }, this)
            }
        },
        unitSelected(newValue, oldValue) {
            if (newValue !== oldValue && !this.demo) {
                this.asResult = false
                if (!this.importInProgress) {
                    this.displayUnitInfo = true
                }
            }
        }
    },
    computed: {
        units() {
            if (this.unitSelected === 'SI') {
                return { type: this.unitSelected, lengthUnit: 'mm', pressureUnit: 'MPa', resultPressureUnit: 'Bar', massFluxUnit: 'Kg/s', speedUnit: 'm/s', densityUnit: 'g/cm3' }
            } else {
                return { type: this.unitSelected, lengthUnit: 'inch', pressureUnit: 'psi', resultPressureUnit: 'psi', massFluxUnit: 'lb/s', speedUnit: 'feet/sec', densityUnit: 'lb/cubic inch' }
            }
        }
    }
}
</script>

<style lang="css" scoped>
    .tooglePerf > span > i{
        width: 45px;
    }

    .tooglePerf {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
</style>
