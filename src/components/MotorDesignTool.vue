<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid grid-list-md fill-height>
        <v-layout row wrap fill-heigth>
            <v-flex xl3 lg4 md5>
                <v-card>
                    <v-card-actions v-if="!demo">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn id="btnNewMotor" icon v-on="on" @click="resetAll">
                                    <v-icon>mdi-file-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>New motor</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn id="btnDuplicateMotor" icon v-on="on" @click="duplicateMotor" text>
                                    <v-icon>mdi-content-duplicate</v-icon>
                                </v-btn>
                            </template>
                            <span>Duplicate current motor</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn id="btnSaveMotor" icon v-on="on" @click="saveMotor" text :loading="saveLoading">
                                    <v-icon>mdi-content-save</v-icon>
                                </v-btn>
                            </template>
                            <span>Save</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn id="btnOpenMotor" icon v-on="on" @click="$refs.motorSelect.show()">
                                    <v-icon left size="25">mdi-folder-open</v-icon>
                                </v-btn>
                            </template>
                            <span>Open motor</span>
                        </v-tooltip>
                        <v-divider
                            class="mx-2"
                            vertical
                        ></v-divider>
                        <v-btn-toggle
                            v-model="unitSelected"
                            mandatory>
                            <div>
                                <span class="hidden-md-and-down mr-3">Units:</span>
                                <v-btn :value="siUnits" text small>
                                    METRIC
                                </v-btn>
                                <v-btn :value="imperialUnits" text small>
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
                        colored-border
                        dismissible
                        border="left"
                        elevation="2"
                        type="warning"
                        icon="mdi-alert-box-outline">
                        {{errorMessage}}
                    </v-alert>
                    <v-alert
                        :value="displaySuccess"
                        class="mt-5 ml-2 mr-2"
                        outlined
                        dense
                        type="success"
                        colored-border
                        border="left"
                        icon="mdi-alert-box-outline">
                        {{ successMessage }}
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
                                <v-alert dense type="info" v-model="showDonatorInfo" dismissible outlined>Motor comparison is only available for donators.</v-alert>
                            </v-card-text>
                            <v-card-actions>
                                <v-switch
                                    style="margin-left: 20px"
                                    dense
                                    inset
                                    v-model="showComparison"
                                    label="Compare with previous motor"
                                ></v-switch>
                                <v-chip
                                    class="ma-2"
                                    color="pink"
                                    label
                                    x-small
                                    text-color="white"
                                >
                                    new
                                </v-chip>
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
        <motor-select @loadMotor="loadMotor" ref="motorSelect"/>
    </v-container>
</template>

<script>
import Vue from 'vue'
import SolidRocketMotor from './SolidRocketMotor'
import ThrustGraphicalResult from './result/ThrustGraphicalResult'
import HelpDialog from './motor/HelpDialog'
import PerformanceInfo from './result/PerformanceInfo'
import { demoForm, demoFormRequest, demoResultData, defaultAdvanceConfig } from '../modules/dataDemo'
import {
    validateImportVersion3,
    LAST_VERSION
} from '../modules/importValidator'
import NozzleDesign from './result/NozzleDesign'
import {
    getSelectedUnit,
    getSelectedUnitOrSI, getUnit,
    hasSelectedUnits, IMPERIAL_UNITS,
    setSelectedUnits,
    SI_UNITS
} from '../modules/computationUtils'
import ExportRasp from './result/ExportRASPForm'
import MotorSelect from '@/components/motor/MotorSelect'
import Axios from 'axios'
import { extractIdFromHateoasResponse } from '@/modules/utils'
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'motor-design-tool',
    components: { MotorSelect, ExportRasp, NozzleDesign, PerformanceInfo, ThrustGraphicalResult, SolidRocketMotor, HelpDialog },
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
            motorId: null,
            saveLoading: false,
            displaySuccess: false,
            successMessage: null,
            showDonatorInfo: false
        }
    },
    mounted() {
        if (this.demo) {
            this.$refs.form.disabledControls(true)
            this.$refs.form.loadForm(this.demoForm)
            this.unitSelected = SI_UNITS
            this.setCurrentComputation(this.demoResultData)
            this.loadResult()
        } else {
            this.unitSelected = getSelectedUnitOrSI()
        }
    },
    methods: {
        ...mapMutations('computation', ['setCurrentComputation']),
        exportRASP() {
            this.$refs.form.exportRASP()
        },
        propellantUnknown() {
            this.errorMessage = 'You have deleted the propellant for this motor, please choose a new one'
            this.displayImportError = true
            setTimeout(() => {
                this.displayImportError = false
                this.errorMessage = null
            }, 5000)
        },
        resetAll() {
            this.$refs.form.reset()
            this.formReset()
        },
        loadMotor(loadedConfig, missingPropellant = false, scope = this) {
            if (validateImportVersion3(loadedConfig)) {
                this.motorId = loadedConfig.id
                scope.importInProgress = true
                scope.displayImportError = false

                if (missingPropellant) {
                    scope.propellantUnknown()
                }

                scope.asResult = false
                scope.$refs.form.loadForm(loadedConfig, loadedConfig.extraConfig)
                scope.nozzleDesignValue = loadedConfig.nozzleDesign
                scope.unitSelected = loadedConfig.measureUnit
                // If nextTick is not here, the form will not be valid when call runComputation()
                Vue.nextTick(() => {
                    scope.$refs.form.checkDonor()
                    scope.importInProgress = false
                })
            } else {
                scope.errorMessage = `Your motor "${loadedConfig.name}" is invalid`
                scope.displayImportError = true
            }
        },
        loadResult(request) {
            // save defaultUnit
            if (!this.demo) {
                setSelectedUnits(this.unitSelected)
                this.$refs.rasp.setComputationRequest(this.$refs.form.getGrainType(), request)
            } else {
                const demoRequest = demoFormRequest
                demoRequest.extraConfig = defaultAdvanceConfig
                this.$refs.rasp.setComputationRequest(this.$refs.form.getGrainType(), demoRequest)
            }

            this.displayDefaultUnitInfo = false

            this.displayImportError = false
            this.displayUnitInfo = false
            this.$refs.thrustGraphicalResult.chart.exporting.filePrefix = this.$refs.form.getMotorName()
            this.asResult = true
            Vue.nextTick(() => {
                this.$vuetify.goTo('#performanceInfosToolbar', { duration: 0, offset: 0, easing: 'easeInOutCubic' })
            }, this)
        },
        duplicateMotor() {
            if (this.$refs.form.validateForm() && this.motorId !== null) {
                this.motorId = null
                this.$refs.form.duplicateMotor()
            }
        },
        saveMotor() {
            if (this.$refs.form.validateForm()) {
                this.errorMessage = null
                this.displayImportError = false
                const dataToExport = {
                    version: LAST_VERSION,
                    measureUnit: this.unitSelected,
                    ...this.$refs.form.buildExport()
                }

                dataToExport.nozzleDesign = this.nozzleDesignValue

                let request = {
                    name: dataToExport.name,
                    description: dataToExport.description
                }
                delete dataToExport.name
                delete dataToExport.description
                request.json = JSON.stringify(dataToExport)

                this.saveLoading = true
                if (this.motorId) {
                    Axios.put(`/motors/${this.motorId}`, request)
                        .then(() => {
                            this.successMessage = 'Motor saved'
                            this.displaySuccess = true
                            setTimeout(() => {
                                this.displaySuccess = false
                            }, 4000)
                        })
                        .catch(() => {
                            this.errorMessage = 'Saving failed due to unkonw reason! Please contact the support.'
                            this.displayImportError = true
                        })
                        .finally(() => {
                            this.saveLoading = false
                        })
                } else {
                    Axios.post(`/motors/`, request)
                        .then((response) => {
                            this.motorId = extractIdFromHateoasResponse(response)
                            this.successMessage = 'Motor saved'
                            this.displaySuccess = true
                            setTimeout(() => {
                                this.displaySuccess = false
                            }, 4000)
                        })
                        .catch((error) => {
                            console.error(error)
                            if (error.response.status === 409) {
                                this.errorMessage = 'You can\'t have two motors with the same name, please change it to before save as new motor'
                                this.displayImportError = true
                            } else {
                                this.errorMessage = 'Saving failed due to unkonw reason! Please contact the support.'
                                this.displayImportError = true
                            }
                        })
                        .finally(() => {
                            this.saveLoading = false
                        })
                }
            }
        },
        formReset() {
            this.motorId = null
            this.asResult = false
            this.displayImportError = false
        },
        ...mapGetters('computation', ['compareWithPrevious']),
        ...mapMutations('computation', ['setCompareWithPrevious']),
        ...mapGetters('authentication', ['isDonator'])
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
        showComparison: {
            get() {
                return this.compareWithPrevious()
            },
            set(value) {
                if (this.isDonator()) {
                    Vue.nextTick(() => { this.setCompareWithPrevious(value) })
                } else {
                    // toggle on when user activate showComparison
                    this.showDonatorInfo = value
                }
            }
        },
        units() {
            return getUnit(this.unitSelected)
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
