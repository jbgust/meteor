<template>
    <div v-if="currentComputation">
        <v-btn @click="showNozzleDesignDialog = true" color="primary" variant="tonal"  density="compact">
            <v-icon start>mdi-ruler-square</v-icon>
            Nozzle design</v-btn>

        <v-dialog persistent ref="errorModal" width="470px" v-model="showNozzleDesignDialog">
            <v-card>
                <v-card-title class="text-h5 bg-grey-lighten-2" primary-title>
                        Nozzle design tool
                </v-card-title>
                <v-card-text>
                    <v-col>
                        <v-alert
                            variant="outlined"
                            density="compact"
                            border-color="top"
                            border="start"
                            :model-value="alert"
                            color="error"
                            icon="mdi-alert-box-outline">
                            The form should be valid to close the dialog
                        </v-alert>
                        <v-row>
                            <v-col class="pl-5 pr-5 mt-5">
                                    <v-form ref="nozzleDesignForm">
                                        <v-row>
                                            <v-text-field id="convergenceAngle" label="Convergence angle" suffix="°" :oninput="formIsValid" v-model="modelValue.convergenceAngle" :rules="rangeRules" step="0.01" class="mr-2"></v-text-field>
                                            <v-text-field id="divergenceAngle" label="Divergence angle" suffix="°" :oninput="formIsValid" v-model="modelValue.divergenceAngle" :rules="rangeRules" step="0.01"></v-text-field>
                                        </v-row>
                                    </v-form>
                                <div class="mt-5">
                                    <span class="label-nozzle-desing">Convergence length:&nbsp;</span>
                                    <span v-text="convergenceLenght"></span>
                                </div>
                                <div>
                                    <span class="label-nozzle-desing">Divergence length:&nbsp;</span>
                                    <span v-text="divergenceLenght"></span>
                                </div>
                                <div>
                                    <span class="label-nozzle-desing">Nozzle exit diameter:&nbsp;</span>
                                    <span v-text="`${currentComputation.performanceResult.nozzleExitDiameter} ${units.lengthUnit}`">
                                    </span>
                                </div>
                                <h3 class="mt-5">Legend</h3>
                                <img src="../../assets/Nozzle_illustration.svg" width="100%"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn theme="dark" id="btnCloseNozzleDesign" @click="close" variant="tonal">
                        <v-icon>mdi-close</v-icon>
                        close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { rangeRule } from '../../modules/formValidationRules'
import { computeNozzleLength } from '../../modules/computationUtils'
import { mapGetters } from 'vuex'

export default {
    name: 'NozzleDesign',
    data() {
        return {
            showNozzleDesignDialog: false,
            rangeRules: rangeRule(1, 90),
            formOK: true,
            alert: false
        }
    },
    props: {
        modelValue: { type: Object, default: () => { return { convergenceAngle: 60, divergenceAngle: 24 } } },
        units: Object
    },
    mounted() {
        this.formIsValid()
    },
    methods: {
        computeResult(sectionDiameter, angle) {
            const precision = this.units.lengthUnit === 'mm' ? 2 : 4
            return computeNozzleLength(sectionDiameter, angle).toFixed(precision) + ' ' + this.units.lengthUnit
        },
        formIsValid() {
            if(this.$refs.nozzleDesignForm)
                this.$refs.nozzleDesignForm.validate().then((result) => {
                    this.formOK = result.valid
                    if(this.formOK)
                    {
                        this.alert = false
                    }
                })
        },
        close() {
            console.warn(this.formOK, this.alert)
            if (!this.formOK) {
                this.alert=true
            }
            else {
                this.showNozzleDesignDialog = false
            }
        }
    },
    computed: {
        ...mapGetters('computation', ['currentComputation']),
        divergenceLenght() {
            return this.computeResult(this.currentComputation.performanceResult.divergenceCrossSectionDiameter, this.modelValue.divergenceAngle)
        },
        convergenceLenght() {
            return this.computeResult(this.currentComputation.performanceResult.convergenceCrossSectionDiameter, this.modelValue.convergenceAngle)
        }
    }
}
</script>

<style lang="css">
    .label-nozzle-desing {
        font-weight: bold;
        width: 180px;
        display: inline-block;
    }
</style>
