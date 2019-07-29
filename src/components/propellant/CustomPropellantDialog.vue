<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>
                    Custom propellant
                </v-toolbar-title>
            </v-toolbar>
            <!-- v-if="dialog" is here to disable inputs when popup is not show to prevent form validation failure -->
            <v-card-text v-if="dialog">
                <v-container grid-list-md>
                <v-layout row wrap align-center justify-center>

                    <v-flex>
                        <v-layout column>
                            <v-flex d-flex lg12>
                                <v-text-field box hide-details id="propellantName" label="Propellant name" v-model="propellant.name" />
                            </v-flex>
                            <v-layout d-flex wrap>
                                <v-text-field class="custom-prop-element" id="k" label="Specific heat ratio" v-model="propellant.k" :rules="numericGreater0Rules" step="0.01" />
                                <v-text-field class="custom-prop-element" id="density" :suffix="units.densityUnit" label="Density" v-model="propellant.density" :rules="numericGreater0Rules" step="0.01"/>
                                <v-text-field class="custom-prop-element" id="molarMass" label="Molar mass" hint="Try 45 if you don't know this value" suffix="kg/kmol" v-model="propellant.molarMass" :rules="numericGreater0Rules" step="0.01"/>
                            </v-layout>
                        </v-layout>
                        <v-layout column>
                            <v-flex d-flex lg12>
                                <v-switch
                                    hide-details
                                    id="complexBurnRate-switch"
                                    v-model="useComplexBurnRate"
                                    label="Use complexe burnrate coeff and pressure exponent">
                                </v-switch>
                            </v-flex>
                            <v-flex d-flex lg12>
                                <v-layout d-flex wrap>
                                    <v-text-field id="burnRateCoefficient" v-if="!useComplexBurnRate" :hint="hintBurnRate" persistent-hint label="Burn rate coefficient" v-model="propellant.burnRateCoefficient" :rules="numericGreater0Rules" step="0.01" class="custom-prop-element" />
                                    <v-text-field id="pressureExponent" v-if="!useComplexBurnRate" :hint="hintBurnRate" persistent-hint label="Pressure exponent" v-model="propellant.pressureExponent" :rules="numericGreater0Rules" step="0.01" class="custom-prop-element" />
                                    <complex-burn-rate-datas v-show="useComplexBurnRate" :units="units" ref="burnRateDataEditor"></complex-burn-rate-datas>
                                </v-layout>
                            </v-flex>
                            <v-flex d-flex lg12>
                                <v-switch
                                    hide-details
                                    id="chamberTemperature-switch"
                                    v-model="useChamberTemperature"
                                    label="Set chamber temperature">
                                </v-switch>
                            </v-flex>
                            <v-flex d-flex lg12>
                                <v-text-field class="custom-prop-element" id="cstar" v-show="!useChamberTemperature" label="C*" :suffix="units.speedUnit" v-model="propellant.cstar" :rules="numericGreater0Rules" step="0.01" />
                                <v-text-field class="custom-prop-element" id="chamberTemperature" v-show="useChamberTemperature" suffix="K" label="Chamber temperature" v-model="propellant.chamberTemperature" :rules="numericGreater0RulesNotrequired" step="0.01"/>
                            </v-flex>
                            <v-flex d-flex lg12>
                                <v-switch
                                hide-details
                                id="k2ph-switch"
                                v-model="useK2ph"
                                label="Use specific heat ratio for two-phase flow">
                                </v-switch>
                            </v-flex>
                            <v-flex d-flex lg12>
                                <v-text-field class="custom-prop-element" id="k2ph" v-show="useK2ph" label="k2ph" hint="Specific heat ratio for two-phase flow" v-model="propellant.k2ph" :rules="numericGreater0RulesNotrequired" step="0.01"/>
                            </v-flex>
                            <v-flex lg12 style="text-align: right;">
                                <v-btn
                                    @click="dialog = false">
                                    Close
                                </v-btn>
                                <v-btn
                                    id="savePropellant"
                                    color="primary"
                                    @click="savePropellant()">
                                    Save
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { validatePropellant } from '../../modules/customPropellant'
import { greaterThanRule, greaterThanRuleNotRequired } from '../../modules/formValidationRules'
import ComplexBurnRateDatas from '../propellant/ComplexBurnRateDatas'
import Vue from 'vue'

export default {
    name: 'CustomPropellantDialog',
    components: { ComplexBurnRateDatas },
    props: {
        units: Object
    },
    data() {
        return {
            dialog: false,
            propellant: {},
            useK2ph: false,
            useChamberTemperature: false,
            useComplexBurnRate: false,
            hintBurnRate: 'Value is different between SI and Imperial',
            numericGreater0Rules: greaterThanRule(0),
            numericGreater0RulesNotrequired: greaterThanRuleNotRequired(0)
        }
    },
    methods: {
        show(customPropellant, show = true) {
            this.propellant = customPropellant || {}

            this.useK2ph = !!this.propellant.k2ph
            this.useChamberTemperature = !!this.propellant.chamberTemperature
            this.useComplexBurnRate = !!this.propellant.burnRateDataSet
            this.dialog = show

            Vue.nextTick(() => {
                if (this.useComplexBurnRate) {
                    this.$refs.burnRateDataEditor.loadBurnRateDataSet(this.propellant.burnRateDataSet)
                }
            })
        },
        savePropellant() {
            this.propellant.burnRateDataSet = this.useComplexBurnRate ? this.$refs.burnRateDataEditor.getBurnRateDataSet() : null

            const hasName = this.propellant.name == null || this.propellant.name === ''
            this.propellant.name = hasName ? 'My propellant' : this.propellant.name

            if (validatePropellant(this.propellant)) {
                this.$emit('save-propellant', this.propellant)
                this.dialog = false
            } else {
                if (this.useComplexBurnRate) {
                    this.$refs.burnRateDataEditor.validate()
                }
                console.error('cutom propellant not valid', this.propellant)
            }
        }
    },
    watch: {
        useComplexBurnRate(newValue, oldValue) {
            if (newValue) {
                this.propellant.burnRateCoefficient = null
                this.propellant.pressureExponent = null
            } else {
                this.burnRateDataSet = null
            }
        },
        useChamberTemperature(newValue, oldValue) {
            if (newValue) {
                this.propellant.cstar = null
            } else {
                this.propellant.chamberTemperature = null
            }
        },
        useK2ph(newValue, oldValue) {
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
