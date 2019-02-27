<template>
    <v-container fluid grid-list-md fill-height>
        <v-layout row wrap>
            <v-flex d-flex lg3 md5>
                <v-card>
                    <solid-rocket-motor @computation-success="loadResult"/>
                </v-card>
            </v-flex>
            <v-flex d-flex lg9 md7>
                <v-layout column wrap v-show="asResult">
                    <v-flex d-block shrink>
                        <v-card>
                            <performance-info ref="performanceResult"/>
                        </v-card>
                    </v-flex>
                    <v-flex d-flex>
                        <v-card>
                            <thrust-graphical-result ref="thrustGraphicalResult"/>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import SolidRocketMotor from './SolidRocketMotor'
import ThrustGraphicalResult from './result/ThrustGraphicalResult'
import PerformanceInfo from './result/PerformanceInfo'

Vue.use(Vuetify)

export default {
    name: 'motor-design-tool',
    components: { PerformanceInfo, ThrustGraphicalResult, SolidRocketMotor },
    data() {
        return {
            asResult: false
        }
    },
    methods: {
        loadResult(data) {
            this.$refs.thrustGraphicalResult.chart.data = data.thrustResults
            this.$refs.performanceResult.performance = data.performanceResult
            this.asResult = true
        }
    }
}
</script>
