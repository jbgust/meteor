<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid grid-list-md fill-height>
        <v-layout row wrap>
            <v-flex d-flex lg3 md5>
                <v-card>

                    <v-toolbar card height="40px" v-if="!demo">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                    <v-icon>save_alt</v-icon>
                                </v-btn>
                            </template>
                            <span>Save your work</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="loadFile">
                                    <v-icon>open_in_browser</v-icon>
                                </v-btn>
                            </template>
                            <span>Load your project</span>
                        </v-tooltip>

                    </v-toolbar>

                    <div v-if="demo" style="padding: 15px 15px 0 15px;">
                        <v-btn block :to="'/motorDesign'" color="success" >Try it !</v-btn>
                    </div>
                    <input type="file"
                           id="avatar" name="avatar" @change="loadFile" accept="application/json">
                    <solid-rocket-motor ref="form" @computation-success="loadResult" @reset="formReset"/>
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
import { importValidatorSchema } from '../modules/importValidator'

Vue.use(Vuetify)

// see : https://www.npmjs.com/package/ajv#related-packages
const Ajv = require('ajv')

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
        },
        loadFile(event) {
            var ajv = new Ajv()

            let file = event.target.files[0]
            if (file) {
                var reader = new FileReader()
                reader.readAsText(file, 'UTF-8')
                const me = this
                reader.onload = function(evt) {
                    let loadedConfig = JSON.parse(evt.target.result)

                    let importValid = ajv.validate(importValidatorSchema, loadedConfig)
                    console.log('validation json JSON', importValid)
                    if (importValid) {
                        me.asResult = false
                        me.$refs.form.loadForm(loadedConfig.configs[0], loadedConfig.configs[0].extraConfig)
                        me.$refs.form.runComputation()

                        // If nextTick is not here, the form will not be valid when call runComputation()
                        Vue.nextTick(() => {
                            me.$refs.form.runComputation()
                        })

                    } else {
                        console.log(ajv.errors)
                    }
                }
                reader.onerror = function(evt) {
                    alert('error reading file')
                }
            }
        },
        formReset() {
            this.asResult = false
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
