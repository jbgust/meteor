<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>
                    Meteor Manual
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex lg6 md6>
                        <v-card>
                            <v-card-text>
                                <v-layout row wrap>
                                    <v-flex d-flex lg12>
                                        <v-text-field box hide-details id="propellantName" label="Propellant name" v-model="propellant.name" />
                                    </v-flex>
                                    <v-flex d-flex lg6 md6>
                                        <div>
                                            <v-text-field id="burnRateCoefficient" label="Burn rate coefficient" v-model="propellant.burnRateCoefficient" step="0.01" />
                                            <v-text-field id="pressureExponent" label="Pressure exponent" v-model="propellant.pressureExponent" step="0.01" />
                                            <v-text-field id="cstar" label="C*" v-model="propellant.cstar" step="0.01" />
                                            <v-text-field id="density" label="Density" v-model="propellant.density" step="0.01"/>
                                            <v-text-field id="k" label="k" v-model="propellant.k" step="0.01" />
                                        </div>
                                    </v-flex>
                                    <v-flex d-flex lg6 md6>
                                        <div>
                                            <v-text-field id="k2ph" label="k2ph" v-model="propellant.k2ph" step="0.01"/>
                                            <v-text-field id="chamberTemperature" label="Chamber temperature" v-model="propellant.chamberTemperature" step="0.01"/>
                                            <v-text-field id="molarMass" label="Molar mass" v-model="propellant.molarMass" step="0.01"/>
                                        </div>
                                    </v-flex>
                                    <v-btn
                                        color="primary"
                                        @click="savePropellant()">
                                        Save
                                    </v-btn>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'CustomPropellantDialog',
    data() {
        return {
            dialog: false,
            propellant: {}
        }
    },
    methods: {
        show(showHelp = true) {
            this.dialog = showHelp
        },
        savePropellant() {
            this.$emit('save-propellant', this.propellant)
            this.dialog = false
        }
    }
}
</script>

<style scoped>

</style>
