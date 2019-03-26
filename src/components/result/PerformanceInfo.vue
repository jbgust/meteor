<template>
    <v-container>
        <table>
            <tr>
                <td><span class="label-resultat">Class : </span><span v-text="performance.motorDescription"></span></td>
                <td><span class="label-resultat">Thrust time : </span><span v-text="performance.thrustTime"></span></td>
            </tr>
            <tr>
                <td><span class="label-resultat">Max thrust : </span><span v-text="performance.maxThrust"></span></td>
                <td><span class="label-resultat">Total impulse : </span><span v-text="performance.totalImpulse"></span></td>
            </tr>
            <tr>
                <td><span class="label-resultat">Specific impulse : </span><span v-text="performance.specificImpulse"></span></td>
                <td><span class="label-resultat">Max pressure : </span><span v-text="performance.maxPressure"></span></td>
            </tr>
            <tr>
                <td><span class="label-resultat">Initial exit speed : </span><span v-text="performance.exitSpeedInitial"></span></td>
                <td><span class="label-resultat">Average pressure : </span><span v-text="performance.averagePressure"></span></td>
            </tr>
            <tr>
                <td colspan="2" align="center" style="padding-top: 15px;"><span class="label-nozzle" style="color: orange;" v-if="performance.optimalDesign">Optimally designed nozzle with an expansion ratio of {{performance.optimalNozzleExpansionRatio}}</span></td>
            </tr>
        </table>
    </v-container>
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
    .label-resultat {
        font-weight: bold;
        display: inline-block;
        width: 185px;
        padding-left: 20px;
        margin: 0 10px;
        text-align: right;
    }
    .label-nozzle {
        font-weight: bold;
        display: inline-block;
        padding-left: 20px;
        margin: 0 10px;
        text-align: right;
    }
</style>
