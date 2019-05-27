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
                    <v-flex lg6 md6>
                        <v-layout column>
                            <v-flex d-flex lg12>
                                <v-text-field box hide-details id="propellantName" label="Propellant name" v-model="propellant.name" />
                            </v-flex>
                            <v-flex d-flex lg12>
                                <v-layout row wrap>
                                    <v-flex d-flex lg6 md6>
                                        <div>
                                            <v-text-field id="cstar" label="C*" :suffix="units.speedUnit" v-model="propellant.cstar" :rules="numericGreater0Rules" step="0.01" />
                                            <v-text-field id="burnRateCoefficient" :hint="hintBurnRate" label="Burn rate coefficient" v-model="propellant.burnRateCoefficient" :rules="numericGreater0Rules" step="0.01" />
                                            <v-text-field id="pressureExponent" :hint="hintBurnRate" label="Pressure exponent" v-model="propellant.pressureExponent" :rules="numericGreater0Rules" step="0.01" />
                                        </div>
                                    </v-flex>
                                    <v-flex d-flex lg6 md6>
                                        <div>
                                            <v-text-field id="k" label="Specific heat ratio" v-model="propellant.k" :rules="numericGreater0Rules" step="0.01" />
                                            <v-text-field id="density" :suffix="units.densityUnit" label="Density" v-model="propellant.density" :rules="numericGreater0Rules" step="0.01"/>
                                            <v-text-field id="molarMass" label="Molar mass" hint="Try 45 if you don't know this value" suffix="kg/kmol" v-model="propellant.molarMass" :rules="numericGreater0Rules" step="0.01"/>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout column>
                            <v-flex d-flex lg12>
                                <v-switch
                                    hide-details
                                    v-model="useK2ph"
                                    label="Use specific heat ratio for two-phase flow">
                                </v-switch>
                            </v-flex>
                            <v-flex d-flex lg12>
                                <v-text-field id="k2ph" v-show="useK2ph" label="k2ph" hint="Specific heat ratio for two-phase flow" v-model="propellant.k2ph" :rules="numericGreater0RulesNotrequired" step="0.01"/>
                            </v-flex>
                            <v-flex d-flex lg12>
                                <v-switch
                                    hide-details
                                    v-model="useChamberTemperature"
                                    label="Set chamber temperature">
                                </v-switch>
                            </v-flex>
                            <v-flex d-flex lg12>
                                <v-text-field id="chamberTemperature" v-show="useChamberTemperature" suffix="K" label="Chamber temperature" v-model="propellant.chamberTemperature" :rules="numericGreater0RulesNotrequired" step="0.01"/>
                            </v-flex>
                            <v-flex lg12 style="text-align: right;">
                                <v-btn
                                    @click="dialog = false">
                                    Close
                                </v-btn>
                                <v-btn
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

export default {
    name: 'CustomPropellantDialog',
    props: {
        units: Object
    },
    data() {
        return {
            dialog: false,
            propellant: {},
            useK2ph: false,
            useChamberTemperature: false,
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

            this.dialog = show
        },
        savePropellant() {
            this.propellant.k2ph = this.useK2ph ? this.propellant.k2ph : null
            this.propellant.chamberTemperature = this.useChamberTemperature ? this.propellant.chamberTemperature : null

            if (validatePropellant(this.propellant)) {
                this.$emit('save-propellant', this.propellant)
                this.dialog = false
            } else {
                console.error('cutom propellant not valid', this.propellant)
            }
        }
    }
}
</script>

<style scoped>

</style>
