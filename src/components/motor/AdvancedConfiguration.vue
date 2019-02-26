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
                  <v-text-field id="densityRatio" label="Propellant density ratio:" v-model="value.densityRatio" :rules="numericGreater0Rules"/>
                  <v-text-field id="nozzleErosionInMillimeter" label="Nozzle erosion:" suffix="mm" v-model="value.nozzleErosionInMillimeter" :rules="numericGreaterOrEqual0Rules"/>
                  <v-text-field id="combustionEfficiencyRatio" label="Combustion efficiency ratio:" v-model="value.combustionEfficiencyRatio" :rules="ratioRules"/>
                  <v-text-field id="ambiantPressureInMPa" label="Ambiant pressure:" suffix="MPa" v-model="value.ambiantPressureInMPa" :rules="pressureRules"/>
                  <v-text-field id="erosiveBurningAreaRatioThreshold" label="Erosive burning area ratio threshold:" v-model="value.erosiveBurningAreaRatioThreshold" :rules="numericGreaterOrEqual0Rules"/>
                  <v-text-field id="erosiveBurningVelocityCoefficient" label="Erosive burning velocity coefficient:" v-model="value.erosiveBurningVelocityCoefficient" :rules="numericGreaterOrEqual0Rules"/>
                  <v-text-field id="nozzleEfficiency" label="Nozzle efficiency:" v-model="value.nozzleEfficiency" :rules="ratioRules"/>
                  <v-checkbox label="Optimal nozzle design:" v-model="value.optimalNozzleDesign" @change="resetNozzleExpansionRation" />
                  <v-text-field id="nozzleExpansionRatio" v-if="!value.optimalNozzleDesign" label="Nozzle expansion ratio:" v-model="value.nozzleExpansionRatio" :rules="expansionRules"/>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="resetConfig">Reset</v-btn>
                  <v-btn @click="dialog = false">Close</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
import { greaterThanRule, greaterOrEqualsThanRule, rangeRule } from '../../modules/formValidationRules'

export default {
    name: 'advanced-configuration',
    props: {
        value: Object
    },
    data() {
        return {
            dialog: false,
            numericGreater0Rules: greaterThanRule(0),
            numericGreaterOrEqual0Rules: greaterOrEqualsThanRule(0),
            ratioRules: rangeRule(0.3, 1),
            expansionRules: greaterOrEqualsThanRule(1),
            pressureRules: greaterOrEqualsThanRule(0.101)
        }
    },
    methods: {
        resetNozzleExpansionRation(newOptimalNozzleDesignValue) {
            if (newOptimalNozzleDesignValue) {
                this.value.nozzleExpansionRatio = null
            }
        },
        show() {
            this.dialog = true
        },
        resetConfig() {
            this.$emit('reset')
        }
    }
}
</script>

<style scoped>

</style>
