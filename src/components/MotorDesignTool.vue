<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid grid-list-md fill-height>
        <v-layout row wrap fill-heith>
            <v-flex xl3 lg4 md5>
                <v-card>
                    <v-card-actions v-if="!demo">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="exportConfig" text>
                                    <v-icon>mdi-cloud-download</v-icon>
                                </v-btn>
                            </template>
                            <span>Save your project</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="browseFile" text>
                                    <v-icon>mdi-file-upload</v-icon>
                                </v-btn>
                            </template>
                            <span>Load your project</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="saveNewMotor" text>
                                    <v-icon>mdi-playlist-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>Save as new motor</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="saveMotor" text>
                                    <v-icon>mdi-content-save</v-icon>
                                </v-btn>
                            </template>
                            <span>Save</span>
                        </v-tooltip>
                        <motor-select @loadMotor="loadFromJSON">
                        </motor-select>
                        <v-divider
                            class="mx-2"
                            vertical
                        ></v-divider>
                        <v-btn-toggle
                            v-model="unitSelected"
                            mandatory>
                            <div>
                                <span class="hidden-md-and-down mr-3">Units:</span>
                                <v-btn :value="siUnits" text>
                                    METRIC
                                </v-btn>
                                <v-btn :value="imperialUnits" text>
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

                    </v-card-actions>

                    <v-alert
                        :value="displayImportError"
                        class="mt-5 ml-2 mr-2"
                        outlined
                        colored-border
                        border="left"
                        color="warning"
                        icon="mdi-alert-box-outline">
                        {{errorMessage}}
                    </v-alert>

                    <v-alert
                        :value="displayDefaultUnitInfo"
                        color="info"
                        class="mt-5 ml-2 mr-2"
                        outlined
                        colored-border
                        border="left"
                        dismissible
                        icon="mdi-alert-box-outline">
                        By default you are on metric units. You can change it above.
                    </v-alert>

                    <v-alert
                        class="mt-5 ml-2 mr-2"
                        outlined
                        colored-border
                        border="left"
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
            <v-flex d-flex xl9 lg8 md7>
                <v-layout column wrap v-show="asResult">
                    <v-flex d-block shrink>
                        <v-card>
                            <v-app-bar flat height="40px" id="performanceInfosToolbar">
                                <v-toolbar-title>Motor performance</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn color="info" small class="ml-4 tooglePerf">
                                    <v-icon @click="showPerformanceInfo = !showPerformanceInfo">
                                        {{showPerformanceInfo? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                                    </v-icon>
                                </v-btn>
                            </v-app-bar>
                            <v-card-text v-show="showPerformanceInfo" class="pb-0">
                                <performance-info :units="units" ref="performanceResult"/>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <export-rasp ref="rasp" :units="units"></export-rasp>
                                <nozzle-design v-model="nozzleDesignValue" class="ml-4" ref="nozzleDesign" :units="units"></nozzle-design>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex d-flex>
                        <thrust-graphical-result :units="units" ref="thrustGraphicalResult"/>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <help-dialog ref="helpDialog"></help-dialog>
        <donate :check-mode="true"></donate>
    </v-container>
</template>

<script>
import Vue from 'vue'
import SolidRocketMotor from './SolidRocketMotor'
import ThrustGraphicalResult from './result/ThrustGraphicalResult'
import HelpDialog from './motor/HelpDialog'
import PerformanceInfo from './result/PerformanceInfo'
import { demoForm, demoFormRequest, demoResultData, defaultAdvanceConfig } from '../modules/dataDemo'
// eslint-disable-next-line no-unused-vars
import { validateImportVersion1, validateImportVersion2, ajvValidator, LAST_VERSION } from '../modules/importValidator'
// see : https://www.npmjs.com/package/ajv#related-packages
import NozzleDesign from './result/NozzleDesign'
import {
    getSelectedUnit,
    getSelectedUnitOrSI,
    hasSelectedUnits, IMPERIAL_UNITS,
    setSelectedUnits,
    SI_UNITS
} from '../modules/computationUtils'
import ExportRasp from './result/ExportRASPForm'
import Donate from './donate'
import MotorSelect from '@/components/motor/MotorSelect'
import Axios from 'axios'

export default {
    name: 'motor-design-tool',
    components: { MotorSelect, Donate, ExportRasp, NozzleDesign, PerformanceInfo, ThrustGraphicalResult, SolidRocketMotor, HelpDialog },
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
            displayDefaultUnitInfo: !hasSelectedUnits(),
            nozzleDesignValue: { convergenceAngle: 60, divergenceAngle: 24 },
            showPerformanceInfo: true,
            unitSelected: getSelectedUnitOrSI(),
            importInProgress: false,
            siUnits: SI_UNITS,
            imperialUnits: IMPERIAL_UNITS,
            motorId: null
        }
    },
    mounted() {
        if (this.demo) {
            this.$refs.form.disabledControls(true)
            this.$refs.form.loadForm(this.demoForm)
            this.unitSelected = SI_UNITS
            this.loadResult(this.demoResultData)
        } else {
            this.unitSelected = getSelectedUnitOrSI()
        }
    },
    methods: {
        browseFile() {
            this.$refs.fileBrowser.value = ''
            this.$refs.fileBrowser.click()
        },
        exportRASP() {
            this.$refs.form.exportRASP()
        },
        loadResult(data, request) {
            // save defaultUnit
            if (!this.demo) {
                setSelectedUnits(this.unitSelected)
                this.$refs.rasp.setComputationRequest(this.$refs.form.getGrainType(), request, data)
            } else {
                const demoRequest = demoFormRequest
                demoRequest.extraConfig = defaultAdvanceConfig
                this.$refs.rasp.setComputationRequest(this.$refs.form.getGrainType(), demoRequest, data)
            }

            this.displayDefaultUnitInfo = false

            this.displayImportError = false
            this.displayUnitInfo = false
            this.$refs.thrustGraphicalResult.chart.data = data.motorParameters
            this.$refs.thrustGraphicalResult.chart.exporting.filePrefix = this.$refs.form.getMotorName()
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
                        me.loadFromJSON(loadedConfig, me)
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
        loadFromJSON(loadedConfig, scope = this) {
            if (validateImportVersion2(loadedConfig) || validateImportVersion1(loadedConfig)) {
                this.motorId = loadedConfig.id
                loadedConfig.configs[0].name = loadedConfig.name
                loadedConfig.configs[0].description = loadedConfig.description
                if (loadedConfig.version === 1) {
                    // Convert to V2 format
                    loadedConfig.configs[0].grainType = 'HOLLOW'
                    loadedConfig.configs[0].grainConfig = {
                        outerDiameter: loadedConfig.configs[0].outerDiameter,
                        coreDiameter: loadedConfig.configs[0].coreDiameter,
                        segmentLength: loadedConfig.configs[0].segmentLength,
                        numberOfSegment: loadedConfig.configs[0].numberOfSegment,
                        outerSurface: loadedConfig.configs[0].outerSurface,
                        endsSurface: loadedConfig.configs[0].endsSurface,
                        coreSurface: loadedConfig.configs[0].coreSurface
                    }
                    delete loadedConfig.configs[0].outerDiameter
                    delete loadedConfig.configs[0].coreDiameter
                    delete loadedConfig.configs[0].segmentLength
                    delete loadedConfig.configs[0].numberOfSegment
                    delete loadedConfig.configs[0].outerSurface
                    delete loadedConfig.configs[0].endsSurface
                    delete loadedConfig.configs[0].coreSurface
                }
                scope.importInProgress = true
                scope.displayImportError = false
                scope.asResult = false
                scope.$refs.form.loadForm(loadedConfig.configs[0], loadedConfig.configs[0].extraConfig)
                scope.nozzleDesignValue = loadedConfig.configs[0].nozzleDesign
                scope.unitSelected = loadedConfig.measureUnit
                // If nextTick is not here, the form will not be valid when call runComputation()
                Vue.nextTick(() => {
                    scope.$refs.form.runComputation()
                    scope.importInProgress = false
                })
            } else {
                scope.errorMessage = 'The file is not valid'
                scope.displayImportError = true
            }
        },
        saveNewMotor() {
            this.motorId = null
            this.saveMotor()
        },
        saveMotor() {
            const dataToExport = {
                version: LAST_VERSION,
                configs: [
                    this.$refs.form.buildExport()
                ],
                measureUnit: this.unitSelected
            }

            if (dataToExport.configs[0] != null) {
                dataToExport.configs[0].nozzleDesign = this.nozzleDesignValue

                let request = {
                    name: dataToExport.configs[0].name,
                    description: dataToExport.configs[0].description
                }
                delete dataToExport.configs[0].name
                delete dataToExport.configs[0].description
                request.json = JSON.stringify(dataToExport)

                if (this.motorId) {
                    Axios.put(`/motors/${this.motorId}`, request)
                        .then(function(response) {
                            console.log('save OK')
                        })
                        .catch(function(error) {
                            console.error(error)
                        })
                } else {
                    Axios.post(`/motors/`, request)
                        .then(function(response) {
                            console.log('save OK')
                        })
                        .catch(function(error) {
                            console.error(error)
                        })
                }
            } else {
                this.errorMessage = 'The form should be valid to be exported'
                this.displayImportError = true
            }
        },
        exportConfig() {
            const dataToExport = {
                version: LAST_VERSION,
                configs: [
                    this.$refs.form.buildExport()
                ],
                measureUnit: this.unitSelected
            }

            if (dataToExport.configs[0] != null) {
                dataToExport.configs[0].nozzleDesign = this.nozzleDesignValue

                const fileContent = JSON.stringify(dataToExport)
                let fileName = 'meteor-export' + '.json'

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

                // reset the default unit when exit demo
                if (hasSelectedUnits()) {
                    this.unitSelected = getSelectedUnit()
                } else {
                    this.displayDefaultUnitInfo = true
                }

                this.importInProgress = true
                Vue.nextTick(() => {
                    this.importInProgress = false
                }, this)
            }
        },
        unitSelected(newValue, oldValue) {
            if (newValue !== oldValue && !this.demo) {
                setSelectedUnits(newValue)
                this.displayDefaultUnitInfo = false
                this.asResult = false
                if (!this.importInProgress) {
                    this.displayUnitInfo = true
                }
            }
        }
    },
    computed: {
        units() {
            if (this.unitSelected === SI_UNITS) {
                return { type: this.unitSelected, lengthUnit: 'mm', pressureUnit: 'MPa', resultPressureUnit: 'Bar', massUnit: 'Kg', massFluxUnit: 'Kg/s', speedUnit: 'm/s', densityUnit: 'g/cm3' }
            } else {
                return { type: this.unitSelected, lengthUnit: 'inch', pressureUnit: 'psi', resultPressureUnit: 'psi', massUnit: 'lb', massFluxUnit: 'lb/s', speedUnit: 'feet/sec', densityUnit: 'lb/cubic inch' }
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
