<template>
        <v-layout d-flex wrap>
            <v-text-field hide-details outline class="resultElement" readonly label="Class" v-model="performance.motorDescription"></v-text-field>
            <v-text-field hide-details outline class="resultElement" readonly label="Thrust time" suffix="s" v-model="performance.thrustTime"></v-text-field>
            <v-text-field hide-details outline class="resultElement" readonly label="Max thrust" suffix="N" v-model="performance.maxThrust" ></v-text-field>
            <v-text-field hide-details outline class="resultElement" readonly label="Total impulse" suffix="Ns" v-model="performance.totalImpulse"></v-text-field>
            <v-text-field hide-details outline class="resultElement" readonly label="Specific impulse" suffix="s" v-model="performance.specificImpulse"></v-text-field>
            <v-text-field hide-details outline class="resultElement" readonly label="Max pressure" suffix="bar" v-model="performance.maxPressure"></v-text-field>
            <v-text-field hide-details outline class="resultElement" readonly label="Average pressure" suffix="bar" v-model="performance.averagePressure"></v-text-field>
            <v-text-field hide-details outline class="resultElement" readonly label="Nozzle exit speed" prefix="Mach" v-model="performance.exitSpeedInitial"></v-text-field>
        </v-layout>
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

<style lang="scss" scoped>
    .resultElement {
        width: 160px;
        margin: 0 10px;
        /*flex-grow: 0 !important;*/
        /*max-width: 250px;*/
        padding: 5px 0;
    }
</style>
