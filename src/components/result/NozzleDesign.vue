<template>
    <div>
        <v-btn color="info" @click="showNozzleDesignDialog = true">Nozzle design</v-btn>

        <v-dialog ref="errorModal" width="400px" v-model="showNozzleDesignDialog">

            <v-card>
                <v-card-title
                    class="headline grey lighten-2"
                    primary-title>
                    Nozzle design
                </v-card-title>

                <v-card-text>
                    <v-flex>
                        <v-layout row>
                            <v-flex>
                                <div style="width: 150px;">
                                    <v-text-field id="convergenceAngle" label="Convergence angle" suffix="°" v-model="convergenceAngle" step="0.01" ></v-text-field>
                                    <v-text-field id="divergenceAngle" label="Divergence angle" suffix="°" v-model="divergenceAngle" step="0.01" ></v-text-field>
                                </div>
                            </v-flex>
                            <v-flex>
                                <div class="resultat"><span class="label-resultat">Divergence length : </span><span v-text="divergenceLenght"></span></div>
                                <div class="resultat"><span class="label-resultat">Convergence length : </span><span v-text="convergenceLenght"></span></div>
                                <div class="resultat"><span class="label-resultat">Nozzle exit diam. : </span><span v-text="performance.nozzleExitDiameter"></span></div>
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
                        @click="showNozzleDesignDialog = false">
                        Ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'NozzleDesign',
    data() {
        return {
            performance: { divergenceCrossSectionDiameter: 0, convergenceCrossSectionDiameter: 0, optimalDesign: true },
            convergenceAngle: 60,
            divergenceAngle: 24,
            showNozzleDesignDialog: false
        }
    },
    methods: {
        computeResult(sectionDiameter, angle) {
            return Number.parseFloat(sectionDiameter / 2 / Math.tan(angle / 2 * Math.PI / 180)).toFixed(2) + ' mm'
        },
        loadConfig(config) {
            this.convergenceAngle = config.convergenceAngle
            this.divergenceAngle = config.divergenceAngle
        }
    },
    computed: {
        divergenceLenght() {
            return this.computeResult(this.performance.divergenceCrossSectionDiameter, this.divergenceAngle)
        },
        convergenceLenght() {
            return this.computeResult(this.performance.convergenceCrossSectionDiameter, this.convergenceAngle)
        }
    }
}
</script>

<style scoped>

</style>
