<template>
    <v-container fluid grid-list-md fill-height>
        <v-layout row wrap>
            <v-flex d-flex lg3 md5>
                <v-card>
                    <div v-if="demo" style="padding: 15px 15px 0 15px;">
                        <v-btn block :to="'/motorDesign'" color="success" >Try it !</v-btn>
                    </div>
                    <solid-rocket-motor ref="form" @computation-success="loadResult"/>
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
import { demoForm, demoResultData } from '../modules/dataDemo'

Vue.use(Vuetify)

export default {
    name: 'motor-design-tool',
    components: { PerformanceInfo, ThrustGraphicalResult, SolidRocketMotor },
    props: {
        demo: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            asResult: false,
            demoForm: Object.assign({}, demoForm),
            demoResultData: Object.assign({}, demoResultData)
        }
    },
    mounted() {
        if (this.demo) {
            this.$refs.form.disabledControls(true)
            this.$refs.form.loadForm(this.demoForm)
            this.loadResult(this.demoResultData)
        }
    },
    methods: {
        loadResult(data) {
            this.$refs.thrustGraphicalResult.chart.data = data.thrustResults
            this.$refs.performanceResult.performance = data.performanceResult
            this.asResult = true
        }
    },
    watch: {
        demo(newValue, oldValue) {
            if (newValue !== undefined && !newValue) {
                this.asResult = false
                this.$refs.form.loadForm()
                this.$refs.form.disabledControls(false)
            }
        }
    }
}
</script>
