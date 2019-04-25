<template>
  <v-layout row justify-center>
      <v-dialog scrollable v-model="dialog" persistent max-width="600px">
          <v-card>
              <v-card-title
                  class="headline grey lighten-2"
                  primary-title>
                  Advance settings
              </v-card-title>
              <v-card-text>
                  <v-layout row wrap>
                      <v-flex d-flex lg6 md6>
                          <div style="padding: 10px;">
                              <v-text-field id="densityRatio" label="Propellant density ratio:" v-model="value.densityRatio" :rules="ratioRules"/>
                              <v-text-field id="nozzleErosionInMillimeter" label="Nozzle erosion:" :suffix="units.lengthUnit" v-model="value.nozzleErosionInMillimeter" :rules="numericGreaterOrEqual0Rules"/>
                              <v-text-field id="combustionEfficiencyRatio" label="Combustion efficiency ratio:" v-model="value.combustionEfficiencyRatio" :rules="ratioRules"/>
                              <v-text-field v-if="false" id="ambiantPressureInMPa" label="Ambiant pressure:" :suffix="units.pressureUnit" v-model="value.ambiantPressureInMPa" :rules="pressureRules"/>
                          </div>
                      </v-flex>
                      <v-flex d-flex lg6 md6>
                          <div style="padding: 10px;">
                              <v-text-field id="erosiveBurningAreaRatioThreshold" label="Erosive burning area ratio threshold:" v-model="value.erosiveBurningAreaRatioThreshold" :rules="numericGreaterOrEqual0Rules"/>
                              <v-text-field id="erosiveBurningVelocityCoefficient" label="Erosive burning velocity coefficient:" v-model="value.erosiveBurningVelocityCoefficient" :rules="numericGreaterOrEqual0Rules"/>
                              <v-text-field id="nozzleEfficiency" label="Nozzle efficiency:" v-model="value.nozzleEfficiency" :rules="ratioRules"/>
                              <v-checkbox label="Optimal nozzle design:" v-model="value.optimalNozzleDesign" @change="resetNozzleExpansionRation" />
                              <v-text-field id="nozzleExpansionRatio" v-if="!value.optimalNozzleDesign" label="Nozzle expansion ratio:" v-model="value.nozzleExpansionRatio" :rules="expansionRules"/>
                          </div>
                      </v-flex>
                  </v-layout>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="resetConfig">Reset</v-btn>
                  <v-btn @click="close">Close</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
import { greaterOrEqualsThanRule, rangeRule, rangeValidator, greaterOrEqualsThanValidator } from '../../modules/formValidationRules'
import Vue from 'vue'

const rationBounds = [0.3, 1]
const minAmbiantPressureinMPa = 0.101

export default {
    name: 'advanced-configuration',
    props: {
        value: Object,
        units: Object
    },
    data() {
        return {
            dialog: false,
            numericGreaterOrEqual0Rules: greaterOrEqualsThanRule(0),
            ratioRules: rangeRule(...rationBounds),
            expansionRules: greaterOrEqualsThanRule(1),
            pressureRules: greaterOrEqualsThanRule(minAmbiantPressureinMPa)

        }
    },
    methods: {
        resetNozzleExpansionRation(newOptimalNozzleDesignValue) {
            if (newOptimalNozzleDesignValue) {
                this.value.nozzleExpansionRatio = null
            } else {
                Vue.nextTick(() => {
                    const input = document.getElementById('nozzleExpansionRatio')
                    if (input !== null) {
                        input.focus()
                    }
                })
            }
        },
        show() {
            this.dialog = true
        },
        resetConfig() {
            this.$emit('reset')
        },
        close() {
            if (this.isConfigValid()) {
                this.dialog = false
            }
        },
        isConfigValid() {
            let isValid = true

            for (const value of [this.value.densityRatio, this.value.combustionEfficiencyRatio, this.value.nozzleEfficiency]) {
                isValid &= rangeValidator(...rationBounds)(value)
            }

            for (const value of [this.value.nozzleErosionInMillimeter, this.value.erosiveBurningAreaRatioThreshold, this.value.erosiveBurningVelocityCoefficient]) {
                isValid &= greaterOrEqualsThanValidator(0)(value)
            }

            isValid &= greaterOrEqualsThanValidator(minAmbiantPressureinMPa)(this.value.ambiantPressureInMPa)

            if (!this.value.optimalNozzleDesign) {
                isValid &= greaterOrEqualsThanValidator(1)(this.value.nozzleExpansionRatio)
            }

            return isValid
        }
    }
}
</script>

<style scoped>

</style>
