<template>
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card>
            <v-app-bar dark color="primary">
                <v-toolbar-title>Custom propellant</v-toolbar-title>
            </v-app-bar>
            <!-- v-if="dialog" is here to disable inputs when popup is not show to prevent form validation failure -->
            <v-card-text v-if="dialog">
                <v-container grid-list-md>
                    <v-layout row wrap align-center justify-center>
                        <v-form ref="formCustomPropellant">
                            <v-col>
                                <v-layout column>
                                    <v-layout row>
                                        <v-col d-flex lg3 md3 sm3>
                                            <v-select
                                                v-model="propellant.unit"
                                                :items="unitList"
                                                :readonly="!!propellant.id"
                                                :rules="requiredRules"
                                                item-title="text"
                                                @change="unitChanged"
                                                variant="filled"
                                                label="Unit"
                                            ></v-select>
                                        </v-col>
                                        <v-col d-flex lg9>
                                            <v-text-field variant="filled" id="propellantName" label="Propellant name"
                                                          v-model="propellant.name" :rules="nameRule"/>
                                        </v-col>
                                    </v-layout>
                                    <v-col d-flex lg12>
                                        <v-textarea
                                            variant="filled"
                                            id="propellantDescription"
                                            label="Description"
                                            :rules="descriptionRule"
                                            v-model="propellant.description"/>
                                    </v-col>
                                    <v-layout d-flex wrap>
                                        <v-text-field class="custom-prop-element" id="k" label="Specific heat ratio"
                                                      v-model="propellant.k" :rules="numericGreater0Rules" step="0.01"/>
                                        <v-text-field class="custom-prop-element" id="density"
                                                      :suffix="units.densityUnit" label="Density"
                                                      v-model="propellant.density" :rules="numericGreater0Rules"
                                                      step="0.01"/>
                                        <v-text-field class="custom-prop-element" id="molarMass" label="Molar mass"
                                                      hint="Try 45 if you don't know this value" suffix="kg/kmol"
                                                      v-model="propellant.molarMass" :rules="numericGreater0Rules"
                                                      step="0.01"/>
                                    </v-layout>
                                </v-layout>
                                <v-layout column>
                                    <v-col d-flex lg12>
                                        <v-switch
                                            hide-details
                                            id="complexBurnRate-switch"
                                            v-model="useComplexBurnRate"
                                            label="Use complexe burnrate coeff and pressure exponent">
                                        </v-switch>
                                    </v-col>
                                    <v-col d-flex lg12>
                                        <v-layout d-flex wrap>
                                            <v-text-field id="burnRateCoefficient" v-if="!useComplexBurnRate"
                                                          :hint="hintBurnRate" persistent-hint
                                                          label="Burn rate coefficient"
                                                          v-model="propellant.burnRateCoefficient"
                                                          :rules="numericGreater0Rules" step="0.01"
                                                          class="custom-prop-element"/>
                                            <v-text-field id="pressureExponent" v-if="!useComplexBurnRate"
                                                          persistent-hint label="Pressure exponent"
                                                          v-model="propellant.pressureExponent"
                                                          :rules="numericGreater0Rules" step="0.01"
                                                          class="custom-prop-element"/>
                                            <complex-burn-rate-datas v-show="useComplexBurnRate" :units="units"
                                                                     ref="burnRateDataEditor"></complex-burn-rate-datas>
                                        </v-layout>
                                    </v-col>
                                    <v-col d-flex lg12>
                                        <v-switch
                                            hide-details
                                            id="chamberTemperature-switch"
                                            v-model="useChamberTemperature"
                                            label="Set chamber temperature">
                                        </v-switch>
                                    </v-col>
                                    <v-col d-flex lg12>
                                        <v-text-field class="custom-prop-element" id="cstar"
                                                      v-show="!useChamberTemperature" label="C*"
                                                      :suffix="units.speedUnit" v-model="propellant.cstar"
                                                      :rules="numericGreater0Rules" step="0.01"/>
                                        <v-text-field class="custom-prop-element" id="chamberTemperature"
                                                      v-show="useChamberTemperature" suffix="K"
                                                      label="Chamber temperature"
                                                      v-model="propellant.chamberTemperature"
                                                      :rules="numericGreater0Rules" step="0.01"/>
                                    </v-col>
                                    <v-col d-flex lg12>
                                        <v-switch
                                            hide-details
                                            id="k2ph-switch"
                                            v-model="useK2ph"
                                            label="Use specific heat ratio for two-phase flow">
                                        </v-switch>
                                    </v-col>
                                    <v-col d-flex lg12>
                                        <v-text-field class="custom-prop-element" id="k2ph" v-show="useK2ph"
                                                      label="k2ph" hint="Specific heat ratio for two-phase flow"
                                                      v-model="propellant.k2ph" :rules="numericGreater0Rules"
                                                      step="0.01"/>
                                    </v-col>
                                    <v-col>
                                        <v-alert type="error" v-model="showError" closable variant="outlined">
                                            {{ errorMessage }}
                                        </v-alert>
                                    </v-col>
                                        <div class="text-right">
                                            <v-btn
                                                id="closePropellantEditor"
                                                class="mr-4"
                                                :disabled="loading"
                                                @click="dialog = false">
                                                Close
                                            </v-btn>
                                            <v-btn
                                                id="savePropellant"
                                                color="primary"
                                                class="mr-4"
                                                :loading="loading"
                                                @click="savePropellant()">
                                                Save
                                            </v-btn>
                                        </div>
                                </v-layout>
                            </v-col>
                        </v-form>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { validatePropellant } from '../../modules/customPropellant'
import {
    greaterThanRule,
    requiredRule,
    stringMaxLengthRule,
    stringRequiredMaxLengthRule
} from '../../modules/formValidationRules'
import ComplexBurnRateDatas from '../propellant/ComplexBurnRateDatas'
import { nextTick } from 'vue'
import Axios from 'axios'
import { getUnit, IMPERIAL_UNITS, SI_UNITS } from '@/modules/computationUtils'
import { mapGetters } from 'vuex'

export default {
    name: 'PropellantEditor',
    components: { ComplexBurnRateDatas },
    data() {
        return {
            dialog: false,
            propellant: {},
            useK2ph: false,
            useChamberTemperature: false,
            useComplexBurnRate: false,
            hintBurnRate: 'Value is different between SI and Imperial',
            numericGreater0Rules: greaterThanRule(0),
            nameRule: [ ...stringRequiredMaxLengthRule(256), this.checkNamesExists ],
            descriptionRule: stringMaxLengthRule(1000),
            requiredRules: requiredRule,
            loading: false,
            showError: false,
            errorMessage: null,
            unitList: [{ value: SI_UNITS, text: 'Metric' }, { value: IMPERIAL_UNITS, text: 'Imperial' }],
            units: getUnit(SI_UNITS)
        }
    },
    methods: {
        unitChanged() {
            this.units = getUnit(this.propellant.unit)
        },
        checkNamesExists(fieldValue) {
            if (fieldValue) {
                const length = this.customPropellants()
                    .filter(propellant => (!this.propellant.id || propellant.id !== this.propellant.id) && propellant.name === fieldValue).length
                return length !== 0 ? 'A propellant already own this name, please change it.' : true
            } else {
                return true
            }
        },
        ...mapGetters('customPropellants', ['customPropellants']),
        show(customPropellant, show = true) {
            this.loading = false
            this.propellant = customPropellant || { unit: SI_UNITS }
            this.unitChanged()

            this.useK2ph = !!this.propellant.k2ph
            this.useChamberTemperature = !!this.propellant.chamberTemperature
            this.useComplexBurnRate = !!this.propellant.burnRateDataSet
            this.dialog = show

            nextTick(() => {
                if (this.useComplexBurnRate) {
                    this.$refs.burnRateDataEditor.loadBurnRateDataSet(this.propellant.burnRateDataSet)
                }
            })
        },
        savePropellant() {
            this.propellant.burnRateDataSet = this.useComplexBurnRate ? this.$refs.burnRateDataEditor.getBurnRateDataSet() : null

            const hasName = this.propellant.name == null || this.propellant.name === ''
            this.propellant.name = hasName ? 'My propellant' : this.propellant.name

            let checkNameAndDescription = true
            this.nameRule.forEach(rule => { checkNameAndDescription = checkNameAndDescription && (rule(this.propellant.name) === true) })
            this.descriptionRule.forEach(rule => { checkNameAndDescription = checkNameAndDescription && (rule(this.propellant.description) === true) })

            if (checkNameAndDescription && validatePropellant(this.propellant) && !!this.propellant.unit) {
                const name = this.propellant.name
                const description = this.propellant.description
                const me = this
                const unit = this.propellant.unit
                delete this.propellant.unit
                delete this.propellant.name
                delete this.propellant.description
                const request = { name: name, description: description, unit: unit, json: JSON.stringify(this.propellant) }
                this.loading = true
                if (this.propellant.id) {
                    Axios.put(`/propellants/${this.propellant.id}`, request)
                        .then(() => {
                            me.$emit('propellantCommit')
                            me.dialog = false
                        })
                        .catch((error) => {
                            this.errorMessage = 'Save failed due to unknown reason. Please contact the support.'
                            this.showError = true
                            setTimeout(() => { this.showError = false }, 5000)
                            console.error(error)
                        })
                } else {
                    Axios.post(`/propellants`, request)
                        .then(function() {
                            me.$emit('propellantCommit')
                            me.dialog = false
                        })
                        .catch((error) => {
                            if (error.response.status === 409) {
                                this.errorMessage = 'You can\'t have two propellants with the same name, please change it to before save'
                                this.showError = true
                                setTimeout(() => { this.showError = false }, 5000)
                                console.error('propellant name duplication')
                            } else {
                                this.errorMessage = 'Save failed due to unknown reason. Please contact the support.'
                                this.showError = true
                                setTimeout(() => { this.showError = false }, 5000)
                                console.error(error)
                            }
                        })
                        .finally(() => { this.loading = false })
                }
            } else {
                this.errorMessage = 'the form is not valid'
                this.showError = true
                setTimeout(() => { this.showError = false }, 3000)
                this.$refs.formCustomPropellant.validate()
                if (this.useComplexBurnRate) {
                    this.$refs.burnRateDataEditor.validate()
                }
            }
        }
    },
    watch: {
        useComplexBurnRate(newValue) {
            if (newValue) {
                this.propellant.burnRateCoefficient = null
                this.propellant.pressureExponent = null
            } else {
                this.burnRateDataSet = null
            }
        },
        useChamberTemperature(newValue) {
            if (newValue) {
                this.propellant.cstar = null
            } else {
                this.propellant.chamberTemperature = null
            }
        },
        useK2ph(newValue) {
            if (!newValue) {
                this.propellant.k2ph = null
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .custom-prop-element {
        width: 200px;
        margin: 10px 10px;
        flex-grow: 0 !important;
        max-width: 250px;
        padding: 5px 0;
    }
</style>
