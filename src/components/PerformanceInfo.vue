<template>
    <b-card>
        <h3 class="title-result">Performance</h3>
        <div class="resultat"><span class="label-resultat">Class : </span><span v-text="performance.motorDescription"></span></div>
        <div class="resultat"><span class="label-resultat">Thrust time : </span><span v-text="performance.thrustTime"></span></div>
        <div class="resultat"><span class="label-resultat">Max thrust : </span><span v-text="performance.maxThrust"></span></div>
        <div class="resultat"><span class="label-resultat">Total impulse : </span><span v-text="performance.totalImpulse"></span></div>
        <div class="resultat"><span class="label-resultat">Specific impulse : </span><span v-text="performance.specificImpulse"></span></div>
        <div class="resultat"><span class="label-resultat">Max pressure : </span><span v-text="performance.maxPressure"></span></div>

        <h3 class="title-result">Nozzle</h3>
        <div class="resultat"><span class="label-resultat" style="color: orange;" v-if="performance.optimalDesign">Optimal design</span></div>
        <div class="resultat"><span class="label-resultat">Nozzle exit diam. : </span><span v-text="performance.nozzleExitDiameter"></span></div>
        <div class="resultat"><span class="label-resultat">Divergence length : </span><span v-text="performance.divergenceLenght"></span></div>
        <div class="resultat"><span class="label-resultat">Convergence length : </span><span v-text="performance.convergenceLenght"></span></div>
        <div class="resultat"><span class="label-resultat">Initial exit speed : </span><span v-text="performance.exitSpeedInitial"></span></div>
    </b-card>
</template>

<script>
export default {
    name: 'PerformanceInfo',
    data() {
        return {
            performance: {}
        }
    }
}
</script>

<style scoped>
  .title-result {
    margin-bottom:5px;
  }
  .resultat {

  }
  .label-resultat {
    font-weight: bold;
    display: inline-block;
    width: 185px;
    padding-left: 20px;
    margin: 0 10px;
    text-align: right;
  }
</style>
