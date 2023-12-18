<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout full-height>
    <v-container fluid>
        <v-row style="background-color: rebeccapurple">
            <v-col cols="4">
                <v-card style="background-color: aquamarine">
                    <v-card-actions v-if="!demo">
                        <v-tooltip location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn id="btnNewMotor" icon="mdi-file-plus" v-bind="props" @click="resetAll">
                                </v-btn>
                            </template>
                            <span>New motor</span>
                        </v-tooltip>
                        <v-tooltip location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn id="btnDuplicateMotor" icon="mdi-content-duplicate" v-bind="props" @click="duplicateMotor" variant="text">
                                </v-btn>
                            </template>
                            <span>Duplicate current motor</span>
                        </v-tooltip>
                        <v-tooltip location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn id="btnSaveMotor" icon="mdi-content-save" v-bind="props" @click="saveMotor" variant="text" :loading="saveLoading">
                                </v-btn>
                            </template>
                            <span>Save</span>
                        </v-tooltip>
                        <v-tooltip location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn id="btnOpenMotor" prepend-icon="mdi-folder-open" v-bind="props" @click="$refs.motorSelect.show()">
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
                                <v-btn :value="siUnits" variant="text" size="small">
                                    METRIC
                                </v-btn>
                                <v-btn :value="imperialUnits" variant="text" size="small">
                                    IMPERIAL
                                </v-btn>
                            </div>
                        </v-btn-toggle>

                        <v-spacer></v-spacer>

                        <v-tooltip location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn id="btnCloseHelp" icon="mdi-book-open-variant" v-bind="props" @click="$refs.helpDialog.show()">
                                </v-btn>
                            </template>
                            <span>Documentation</span>
                        </v-tooltip>

                    </v-card-actions>

                    <v-alert
                        :model-value="displayImportError"
                        class="mt-5 ml-2 mr-2"
                        border-color="top"
                        closable
                        border="start"
                        elevation="2"
                        type="warning"
                        icon="mdi-alert-box-outline">
                        {{errorMessage}}
                    </v-alert>
                    <v-alert
                        :model-value="displaySuccess"
                        class="mt-5 ml-2 mr-2"
                        variant="outlined"
                        density="compact"
                        type="success"
                        border-color="top"
                        border="start"
                        icon="mdi-alert-box-outline">
                        {{ successMessage }}
                    </v-alert>

                    <v-alert
                        :model-value="displayDefaultUnitInfo"
                        color="info"
                        class="mt-5 ml-2 mr-2"
                        variant="outlined"
                        border-color="top"
                        border="start"
                        closable
                        icon="mdi-alert-box-outline">
                        By default you are on metric units. You can change it above.
                    </v-alert>

                    <v-alert
                        class="mt-5 ml-2 mr-2"
                        variant="outlined"
                        border-color="top"
                        border="start"
                        :model-value="displayUnitInfo"
                        type="info"
                    >
                        Changing unit <b>doesn't convert values</b> in the form. Please check your values even in <b>advanced settings</b> and your <b>custom propellant</b>.
                    </v-alert>

                    <div v-if="demo" style="padding: 15px 15px 0 15px;">
                        <v-btn block :to="'/motorDesign'" color="success" data-cy="tryIt">Try it !</v-btn>
                    </div>
                    <solid-rocket-motor ref="form" :units="units" @computation-success="loadResult" @reset="formReset" @showDocumentation="$refs.helpDialog.show()"/>

                </v-card>
            </v-col>
            <v-col cols="8"  v-show="hasResult">
                    <v-col cols="12">
                        <v-card>
                            <v-app-bar flat height="40px" id="performanceInfosToolbar">
                                <v-toolbar-title>Motor performance</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn color="info" size="small" class="ml-4 tooglePerf">
                                    <v-icon @click="showPerformanceInfo = !showPerformanceInfo">
                                        {{showPerformanceInfo? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                                    </v-icon>
                                </v-btn>
                            </v-app-bar>
                            <v-card-text v-show="showPerformanceInfo" class="pb-0">
                                <performance-info :units="units" ref="performanceResult"/>
                                <v-alert density="compact" type="info" v-model="showDonatorInfo" closable variant="outlined">{{donationMessageAlert}}</v-alert>
                            </v-card-text>
                            <v-card-actions>
                                <v-tooltip location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" id="btnMotorRevert" icon="mdi-undo-variant" color="info" size="small" class="ml-4 tooglePerf" :disabled="disabledPrevious" @click="restoreLastMotor">
                                        </v-btn>
                                    </template>
                                    <span>Restore last motor configuration</span>
                                </v-tooltip>
                                <v-tooltip location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-switch
                                            v-bind="props"
                                            style="margin-left: 20px;"
                                            label="Compare"
                                            density="compact"
                                            inset
                                            v-model="showComparison"
                                        ></v-switch>
                                    </template>
                                    <span>Compare with previous motor</span>
                                </v-tooltip>
                                <v-tooltip location="bottom" max-width="300px"  v-if="showUseRefBtn">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-bind="props"
                                            style="margin-left: 20px;"
                                            size="small"
                                            :color="useAsRef ? 'orange':''"
                                            dense
                                            inset
                                            @mouseup="toggleUseAsRef()"
                                            value="useAsRef"
                                        >
                                            <v-icon start v-if="useAsRef">
                                                mdi-delete
                                            </v-icon>
                                            <v-icon start v-else>
                                                mdi-tag
                                            </v-icon>
                                            {{useAsRef ?  'Remove reference' : 'Use as reference'}}</v-btn>
                                    </template>
                                    <span>Use this motor as a reference for all comparisons, instead of using the engine from the previous computation.</span>
                                </v-tooltip>
                                <v-spacer></v-spacer>
                                <export-rasp ref="rasp" :units="units"></export-rasp>
                                <nozzle-design v-model="nozzleDesignValue" class="ml-4" ref="nozzleDesign" :units="units"></nozzle-design>
                            </v-card-actions>
                        </v-card>

                    <v-sheet d-flex>
                        <thrust-graphical-result :units="units" ref="thrustGraphicalResult"/>
                    </v-sheet>
                    </v-col>
            </v-col>
        </v-row>
        <help-dialog ref="helpDialog"></help-dialog>
        <motor-select @loadMotor="loadMotor" ref="motorSelect"/>
    </v-container>
    </v-layout>
</template>

<script>
import { nextTick } from 'vue'
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
            hasResult: false,
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
            showDonatorInfo: false,
            donationMessageAlert: '',
            showUseRefBtn: false
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
        ...mapMutations('computation', ['setCurrentComputation', 'switchResults']),
        ...mapGetters('computation', ['compareWithPrevious', 'previousMotors', 'previousComputation', 'getPreviousMotorComputation']),
        ...mapMutations('computation', ['setCompareWithPrevious', 'toggleUseAsRef']),
        ...mapGetters('authentication', ['isDonator']),
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
        restoreLastMotor() {
            if (this.isDonator()) {
                this.$refs.form.showLoadingOverlay(true)
                const previousMotor = this.getPreviousMotorComputation()
                // TODO : améliorer en mettant dans le store?
                previousMotor.grainConfig = Object.assign({}, previousMotor.grainConfig)
                this.motorId = previousMotor.id
                this.unitSelected = previousMotor.measureUnit
                this.$refs.form.loadForm(previousMotor, previousMotor.extraConfig)
                this.switchResults()
                setTimeout(() => { this.$refs.form.showLoadingOverlay(false) }, 500)
            } else {
                this.donationMessageAlert = 'This feature is reserved to donator.'
                this.showDonatorInfo = true
            }
        },
        loadMotor(loadedConfig, missingPropellant = false, scope = this) {
            if (validateImportVersion3(loadedConfig)) {
                this.motorId = loadedConfig.id
                scope.importInProgress = true
                scope.displayImportError = false

                if (missingPropellant) {
                    scope.propellantUnknown()
                }

                scope.hasResult = false
                scope.$refs.form.loadForm(loadedConfig, loadedConfig.extraConfig)
                scope.nozzleDesignValue = loadedConfig.nozzleDesign
                scope.unitSelected = loadedConfig.measureUnit
                // If nextTick is not here, the form will not be valid when call runComputation()
                nextTick(() => {
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
            // TODO : vuetify 3 => semble pas encore implémenté
            // this.$refs.thrustGraphicalResult.chart.exporting.filePrefix = this.$refs.form.getMotorName()
            this.hasResult = true
            // TODO : vuetify 3 => semble pas encore implémenté
            // nextTick(() => {
            //     this.$vuetify.goTo('#performanceInfosToolbar', { duration: 0, offset: 0, easing: 'easeInOutCubic' })
            // })
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
                    Axios.post(`/motors`, request)
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
            this.hasResult = false
            this.displayImportError = false
        }
    },
    watch: {
        demo(newValue) {
            // if leave demo
            if (newValue !== undefined && !newValue) {
                this.hasResult = false
                this.$refs.form.loadForm()
                this.$refs.form.disabledControls(false)

                // reset the default unit when exit demo
                if (hasSelectedUnits()) {
                    this.unitSelected = getSelectedUnit()
                } else {
                    this.displayDefaultUnitInfo = true
                }

                this.importInProgress = true
                nextTick(() => {
                    this.importInProgress = false
                }, this)
            }
        },
        unitSelected(newValue, oldValue) {
            if (newValue !== oldValue && !this.demo) {
                setSelectedUnits(newValue)
                this.displayDefaultUnitInfo = false
                if (!this.importInProgress) {
                    this.displayUnitInfo = true
                }
            }
        }
    },
    computed: {
        disabledPrevious() {
            const previousMotors = this.previousMotors()
            return !(previousMotors.length > 1 && !!previousMotors[1])
        },
        ...mapGetters('computation', ['useAsRef']),
        showComparison: {
            get() {
                return this.compareWithPrevious()
            },
            set(value) {
                if (this.isDonator()) {
                    this.showUseRefBtn = value
                    nextTick(() => { this.setCompareWithPrevious(value) })
                } else {
                    // toggle on when user activate showComparison
                    this.donationMessageAlert = 'Motor comparison is only available for donators.'
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
