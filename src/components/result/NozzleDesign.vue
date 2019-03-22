<template>
    <div>
        <v-text-field id="convergenceAngle" label="Convergence angle" suffix="°" v-model="convergenceAngle" step="0.01" ></v-text-field>
        <v-text-field id="divergenceAngle" label="Divergence angle" suffix="°" v-model="divergenceAngle" step="0.01" ></v-text-field>
        <div class="resultat"><span class="label-resultat">Divergence length : </span><span v-text="divergenceLenght"></span></div>
        <div class="resultat"><span class="label-resultat">Convergence length : </span><span v-text="convergenceLenght"></span></div>
        <div class="resultat"><span class="label-resultat">Nozzle exit diam. : </span><span v-text="performance.nozzleExitDiameter"></span></div>
    </div>
</template>

<script>
export default {
    name: 'NozzleDesign',
    data() {
        return {
            performance: { divergenceCrossSectionDiameter:0, convergenceCrossSectionDiameter: 0},
            convergenceAngle: 60,
            divergenceAngle: 24
        }
    },
    computed: {
        divergenceLenght() {
            return this.performance.divergenceCrossSectionDiameter / 2 / Math.tan(this.divergenceAngle / 2 * Math.PI / 180)
        },
        convergenceLenght() {
            return this.performance.convergenceCrossSectionDiameter / 2 / Math.tan(this.convergenceAngle / 2 * Math.PI / 180)
        }
    }
}
</script>

<style scoped>

</style>
