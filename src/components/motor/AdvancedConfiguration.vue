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
                  <v-text-field id="densityRatio" label="Propellant density ratio:" v-model="value.densityRatio" required type="number"/>
                  <v-text-field id="nozzleErosionInMillimeter" label="Nozzle erosionin millimeter:" v-model="value.nozzleErosionInMillimeter" required type="number"/>
                  <v-text-field id="combustionEfficiencyRatio" label="Combustion efficiency ratio:" v-model="value.combustionEfficiencyRatio" required type="number"/>
                  <v-text-field id="ambiantPressureInMPa" label="Ambiant pressure in MPa:" v-model="value.ambiantPressureInMPa" required type="number"/>
                  <v-text-field id="erosiveBurningAreaRatioThreshold" label="Erosive burning area ratio threshold:" v-model="value.erosiveBurningAreaRatioThreshold" required type="number"/>
                  <v-text-field id="erosiveBurningVelocityCoefficient" label="Erosive burning velocity coefficient:" v-model="value.erosiveBurningVelocityCoefficient" required type="number"/>
                  <v-text-field id="nozzleEfficiency" label="Nozzle efficiency:" v-model="value.nozzleEfficiency" required type="number"/>
                  <v-checkbox label="Optimal nozzle design:" v-model="value.optimalNozzleDesign" @change="resetNozzleExpansionRation" />
                  <v-text-field id="nozzleExpansionRatio" v-show="!value.optimalNozzleDesign" label="nozzleExpansionRatio:" v-model="value.nozzleExpansionRatio" required type="number"/>
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
export default {
    name: 'advanced-configuration',
    props: {
        value: Object
    },
    data() {
        return {
            dialog: false
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
