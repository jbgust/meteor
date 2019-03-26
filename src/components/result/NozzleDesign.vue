<template>
    <div>
        <v-btn color="info" round small @click="showNozzleDesignDialog = true">Nozzle design</v-btn>

        <v-dialog persistent ref="errorModal" width="400px" v-model="showNozzleDesignDialog">
            <v-card>
                <v-card-title
                    class="headline grey lighten-2"
                    primary-title>
                    Nozzle design tool
                </v-card-title>

                <v-card-text>
                    <v-flex>
                        <v-alert
                            outline
                            :value="!formIsValid()"
                            color="error"
                            icon="priority_high">
                            The form should be valid to close the dialog
                        </v-alert>
                        <v-layout row>
                            <v-flex>
                                    <v-form ref="nozzleDesignForm">
                                        <v-text-field id="convergenceAngle" label="Convergence angle" suffix="°" v-model="value.convergenceAngle" :rules="rangeRules" step="0.01"></v-text-field>
                                        <div class="resultat"><span class="label-nozzle">Convergence length : </span><span v-text="convergenceLenght"></span></div>
                                        <br>
                                        <v-text-field id="divergenceAngle" label="Divergence angle" suffix="°" v-model="value.divergenceAngle" :rules="rangeRules" step="0.01"></v-text-field>
                                        <div class="resultat"><span class="label-nozzle">Divergence length : </span><span v-text="divergenceLenght"></span></div>
                                    </v-form>
                                <br>
                                <div class="resultat"><span class="label-nozzle">Nozzle exit diam. : </span><span v-text="performance.nozzleExitDiameter"></span></div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        flat
                        @click="showNozzleDesignDialog = !formIsValid()">
                        Ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { rangeRule } from '../../modules/formValidationRules'
export default {
    name: 'NozzleDesign',
    data() {
        return {
            performance: { divergenceCrossSectionDiameter: 0, convergenceCrossSectionDiameter: 0, optimalDesign: true },
            showNozzleDesignDialog: false,
            rangeRules: rangeRule(1, 90)
        }
    },
    props: {
        value: { type: Object, default: () => { return { convergenceAngle: 60, divergenceAngle: 24 } } }
    },
    methods: {
        computeResult(sectionDiameter, angle) {
            return Number.parseFloat(sectionDiameter / 2 / Math.tan(angle / 2 * Math.PI / 180)).toFixed(2) + ' mm'
        },
        formIsValid() {
            return this.$refs.nozzleDesignForm ? this.$refs.nozzleDesignForm.validate() : true
        }
    },
    computed: {
        divergenceLenght() {
            return this.computeResult(this.performance.divergenceCrossSectionDiameter, this.value.divergenceAngle)
        },
        convergenceLenght() {
            return this.computeResult(this.performance.convergenceCrossSectionDiameter, this.value.convergenceAngle)
        }
    }
}
</script>

<style>
    .label-nozzle {
        font-weight: bold;
        display: inline-block;
    }
</style>
