<template>
    <div v-if="!!performance">
        <v-layout d-flex wrap>
            <v-text-field hide-details outlined class="resultElement" readonly id="motor-class" :suffix="performance.classPercentage+'%'" label="Class" v-model="performance.motorDescription">
                <template v-slot:prepend-inner v-if="!!performance.compare">
                    <v-icon :color="performance.compare.class.cssColor">{{ performance.compare.class.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="thrust-time" label="Thrust time" suffix="s" v-model="performance.thrustTime">
                <template v-slot:prepend-inner v-if="!!performance.compare">
                    <v-icon :color="performance.compare.thrustTime.cssColor">{{ performance.compare.thrustTime.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="max-thrust" label="Max thrust" suffix="N" v-model="performance.maxThrust" >
                <template v-slot:prepend-inner v-if="!!performance.compare">
                    <v-icon :color="performance.compare.maxThrust.cssColor">{{ performance.compare.maxThrust.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="total-impulse" label="Total impulse" suffix="Ns" v-model="performance.totalImpulse">
                <template v-slot:prepend-inner v-if="!!performance.compare">
                    <v-icon :color="performance.compare.totalImpulse.cssColor">{{ performance.compare.totalImpulse.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="specific-impulse" label="Specific impulse" suffix="s" v-model="performance.specificImpulse">
                <template v-slot:prepend-inner v-if="!!performance.compare">
                    <v-icon :color="performance.compare.specificImpulse.cssColor">{{ performance.compare.specificImpulse.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="max-pressure" label="Max pressure" :suffix="units.resultPressureUnit" v-model="performance.maxPressure">
                <template v-slot:prepend-inner v-if="!!performance.compare">
                    <v-icon :color="performance.compare.maxPressure.cssColor">{{ performance.compare.maxPressure.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="average-pressure" label="Average pressure" :suffix="units.resultPressureUnit" v-model="performance.averagePressure">
                <template v-slot:prepend-inner v-if="!!performance.compare">
                    <v-icon :color="performance.compare.averagePressure.cssColor">{{ performance.compare.averagePressure.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="nozzle-exit-speed" label="Nozzle exit speed" prefix="Mach" v-model="performance.exitSpeedInitial">
                <template v-slot:prepend-inner v-if="!!performance.compare">
                    <v-icon :color="performance.compare.exitSpeedInitial.cssColor">{{ performance.compare.exitSpeedInitial.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field hide-details outlined class="resultElement" readonly id="grain-mass" label="Initial grain mass" :suffix="units.massUnit" v-model="performance.grainMass">
                <template v-slot:prepend-inner v-if="!!performance.compare">
                    <v-icon :color="performance.compare.grainMass.cssColor">{{ performance.compare.grainMass.icon }}</v-icon>
                </template>
            </v-text-field>
        </v-layout>
        <v-flex >
            <p class="label-nozzle" v-bind:style="{color: this.portThroatWarningColor}" v-if="showPortThroatAreaWarning">
                {{`Your port-to-throat ratio is ${currentComputation.performanceResult.portToThroatArea}, it can be a problem` }}
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-information-outline</v-icon>
                    </template>
                    <p class="label-nozzle tooltip-performance">
                        Enlarging the core is a good way to solve this problem. Except for extreme L/D ratio motors, no part of the core should be less than the diameter of the nozzle throat.
                    </p>
                </v-tooltip>
            </p>
            <p class="label-nozzle" style="color: red;" v-if="currentComputation.performanceResult.lowKNCorrection">
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
            <p class="label-nozzle" style="color: #2196f3;" v-if="currentComputation.performanceResult.optimalDesign">Optimally designed nozzle with an expansion ratio of {{currentComputation.performanceResult.optimalNozzleExpansionRatio}}</p>
        </v-flex>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { comparePerformanceResults } from '@/modules/computationUtils.mjs'

export default {
    name: 'PerformanceInfo',
    data() {
        return {
            showPortThroatAreaWarning: false,
            portThroatWarningColor: 'red',
            performance: null
        }
    },
    props: {
        units: Object
    },
    computed: {
        ...mapGetters('computation', ['currentComputation', 'previousComputation'])
    },
    watch: {
        currentComputation(newValue) {
            this.performance = newValue.performanceResult
            if (this.previousComputation) {
                this.performance.compare = comparePerformanceResults(newValue.performanceResult, this.previousComputation.performanceResult)
            }
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
