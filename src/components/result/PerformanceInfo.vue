<template>
    <div v-if="!!performance && !redraw">
        <v-row d-flex wrap>
            <v-text-field :hide-details="!compareWithPrevious" variant="outlined" class="resultElement" readonly id="motor-class" :suffix="performance.classPercentage+'%'"
                          label="Class" v-model="performance.motorDescription" :messages="getPreviousValue('motorDescription')">
                <template v-slot:prepend-inner v-if="!!compareMotors" >
                    <v-icon :color="compareMotors.class.cssColor">{{ compareMotors.class.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field :hide-details="!compareWithPrevious" variant="outlined" class="resultElement" readonly id="thrust-time" label="Thrust time" suffix="s"
                          v-model="performance.thrustTime" :messages="getPreviousValue('thrustTime')">
                <template v-slot:prepend-inner v-if="!!compareMotors">
                    <v-icon :color="compareMotors.thrustTime.cssColor">{{ compareMotors.thrustTime.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field :hide-details="!compareWithPrevious" variant="outlined" class="resultElement" readonly id="max-thrust" label="Max thrust" suffix="N"
                          v-model="performance.maxThrust" :messages="getPreviousValue('maxThrust')">
                <template v-slot:prepend-inner v-if="!!compareMotors">
                    <v-icon :color="compareMotors.maxThrust.cssColor">{{ compareMotors.maxThrust.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field :hide-details="!compareWithPrevious" variant="outlined" class="resultElement" readonly id="total-impulse" label="Total impulse" suffix="Ns"
                          v-model="performance.totalImpulse" :messages="getPreviousValue('totalImpulse')">
                <template v-slot:prepend-inner v-if="!!compareMotors">
                    <v-icon :color="compareMotors.totalImpulse.cssColor">{{ compareMotors.totalImpulse.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field :hide-details="!compareWithPrevious" variant="outlined" class="resultElement" readonly id="specific-impulse" label="Specific impulse" suffix="s"
                          v-model="performance.specificImpulse" :messages="getPreviousValue('specificImpulse')">
                <template v-slot:prepend-inner v-if="!!compareMotors">
                    <v-icon :color="compareMotors.specificImpulse.cssColor">{{ compareMotors.specificImpulse.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field :hide-details="!compareWithPrevious" variant="outlined" class="resultElement" readonly id="max-pressure" label="Max pressure" :suffix="units.resultPressureUnit"
                          v-model="performance.maxPressure" :messages="getPreviousValue('maxPressure')">
                <template v-slot:prepend-inner v-if="!!compareMotors">
                    <v-icon :color="compareMotors.maxPressure.cssColor">{{ compareMotors.maxPressure.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field :hide-details="!compareWithPrevious" variant="outlined" class="resultElement" readonly id="average-pressure" label="Average pressure"
                          :suffix="units.resultPressureUnit" v-model="performance.averagePressure" :messages="getPreviousValue('averagePressure')">
                <template v-slot:prepend-inner v-if="!!compareMotors">
                    <v-icon :color="compareMotors.averagePressure.cssColor">{{ compareMotors.averagePressure.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field :hide-details="!compareWithPrevious" variant="outlined" class="resultElement" readonly id="nozzle-exit-speed" label="Nozzle exit speed" prefix="Mach"
                          v-model="performance.exitSpeedInitial" :messages="getPreviousValue('exitSpeedInitial')">
                <template v-slot:prepend-inner v-if="!!compareMotors">
                    <v-icon :color="compareMotors.exitSpeedInitial.cssColor">{{ compareMotors.exitSpeedInitial.icon }}</v-icon>
                </template>
            </v-text-field>
            <v-text-field :hide-details="!compareWithPrevious" variant="outlined" class="resultElement" readonly id="grain-mass" label="Initial grain mass"
                          :suffix="units.grainMassUnit" v-model="performance.grainMass" :messages="getPreviousValue('grainMass')">
                <template v-slot:prepend-inner v-if="!!compareMotors">
                    <v-icon :color="compareMotors.grainMass.cssColor">{{ compareMotors.grainMass.icon }}</v-icon>
                </template>
            </v-text-field>
        </v-row>
        <v-col >
            <p class="label-nozzle" v-bind:style="{color: this.portThroatWarningColor}" v-if="showPortThroatAreaWarning">
                {{`Your port-to-throat ratio is ${currentComputation.performanceResult.portToThroatArea}, it can be a problem` }}
                <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-information-outline</v-icon>
                    </template>
                    <p class="label-nozzle tooltip-performance">
                        Enlarging the core is a good way to solve this problem. Except for extreme L/D ratio motors, no part of the core should be less than the diameter of the nozzle throat.
                    </p>
                </v-tooltip>
            </p>
            <p class="label-nozzle" style="color: red;" v-if="currentComputation.performanceResult.lowKNCorrection">
                Low KN.
                <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-information-outline</v-icon>
                    </template>
                    <p class="label-nozzle tooltip-performance">
                        KN is ratio between burn area and throat area. With low KN the result is approximate and the motor may be subject of chuffing. To increase it you can use a larger grain core diameter and/or decrease the throat diameter.
                    </p>
                </v-tooltip>
            </p>
            <p class="label-nozzle" style="color: #2196f3;" v-if="currentComputation.performanceResult.optimalDesign">Optimally designed nozzle with an expansion ratio of {{currentComputation.performanceResult.optimalNozzleExpansionRatio}}</p>
        </v-col>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { comparePerformanceResults } from '@/modules/computationUtils.mjs'
import { nextTick } from 'vue'

export default {
    name: 'PerformanceInfo',
    data() {
        return {
            showPortThroatAreaWarning: false,
            portThroatWarningColor: 'red',
            performance: null,
            redraw: false
        }
    },
    props: {
        units: Object
    },
    methods: {
        getPreviousValue(valueName) {
            if (this.previousComputation && this.compareWithPrevious) {
                return 'Before: ' + this.previousComputation.performanceResult[valueName]
            }
            return ''
        }
    },
    computed: {
        ...mapGetters('computation', ['currentComputation', 'previousComputation', 'compareWithPrevious']),
        compareMotors() {
            if (this.previousComputation && this.compareWithPrevious) {
                return comparePerformanceResults(this.currentComputation.performanceResult, this.previousComputation.performanceResult)
            } else {
                return undefined
            }
        }
    },
    watch: {
        compareMotors() {
            this.redraw = true
            nextTick(() => { this.redraw = false })
        },
        currentComputation(newValue) {
            this.performance = newValue.performanceResult
            if (newValue) {
                this.showPortThroatAreaWarning = !!newValue.performanceResult.portToThroatAreaWarning && newValue.performanceResult.portToThroatAreaWarning !== 'NORMAL'
                this.portThroatWarningColor = newValue.performanceResult.portToThroatAreaWarning === 'DANGER' ? 'red' : 'orange'
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
