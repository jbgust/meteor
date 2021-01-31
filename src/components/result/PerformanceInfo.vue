<template>
    <div>
        <v-layout d-flex wrap>
            <v-text-field hide-details outlined class="resultElement" readonly id="motor-class" :suffix="performance.classPercentage+'%'" label="Class" v-model="performance.motorDescription"></v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="thrust-time" label="Thrust time" suffix="s" v-model="performance.thrustTime"></v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="max-thrust" label="Max thrust" suffix="N" v-model="performance.maxThrust" ></v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="total-impulse" label="Total impulse" suffix="Ns" v-model="performance.totalImpulse"></v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="specific-impulse" label="Specific impulse" suffix="s" v-model="performance.specificImpulse"></v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="max-pressure" label="Max pressure" :suffix="units.resultPressureUnit" v-model="performance.maxPressure"></v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="average-pressure" label="Average pressure" :suffix="units.resultPressureUnit" v-model="performance.averagePressure"></v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="nozzle-exit-speed" label="Nozzle exit speed" prefix="Mach" v-model="performance.exitSpeedInitial"></v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="grain-mass" label="Initial grain mass" :suffix="units.massUnit" v-model="performance.grainMass"></v-text-field>
        </v-layout>
        <v-flex >
            <p class="label-nozzle" v-bind:style="{color: this.portThroatWarningColor}" v-if="showPortThroatAreaWarning">
                {{`Your port-to-throat ratio is ${performance.portToThroatArea}, it can be a problem` }}
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-information-outline</v-icon>
                    </template>
                    <p class="label-nozzle tooltip-performance">
                        Enlarging the core is a good way to solve this problem. Except for extreme L/D ratio motors, no part of the core should be less than the diameter of the nozzle throat.
                    </p>
                </v-tooltip>
            </p>
            <p class="label-nozzle" style="color: red;" v-if="performance.lowKNCorrection">
                Low KN.
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-information-outline</v-icon>
                    </template>
                    <p class="label-nozzle tooltip-performance">
                        KN is ratio between burn area and throat area. With low KN the result is approximate and the motor may be subject of chuffing. To increase it you can use a larger grain core diameter and/or decrease the throat diameter.
                    </p>
                </v-tooltip>
            </p>
            <p class="label-nozzle" style="color: #2196f3;" v-if="performance.optimalDesign">Optimally designed nozzle with an expansion ratio of {{performance.optimalNozzleExpansionRatio}}</p>
        </v-flex>
    </div>

</template>

<script>
export default {
    name: 'PerformanceInfo',
    data() {
        return {
            performance: {},
            showPortThroatAreaWarning: false,
            portThroatWarningColor: 'red'
        }
    },
    props: {
        units: Object
    },
    watch: {
        performance(newValue) {
            if (newValue) {
                this.showPortThroatAreaWarning = !!newValue.portToThroatAreaWarning && newValue.portToThroatAreaWarning !== 'NORMAL'
                this.portThroatWarningColor = newValue.portToThroatAreaWarning === 'DANGER' ? 'red' : 'orange'
            }
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
    .label-nozzle {
        margin-bottom: 5px;
    }
    .tooltip-performance {
        max-width: 300px;
        text-align: justify;
        margin-bottom: 0;
    }
</style>
