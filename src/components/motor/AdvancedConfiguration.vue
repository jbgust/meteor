<template>
  <v-layout row justify-center>
      <v-dialog  v-model="dialog" persistent max-width="600px">
          <v-card>
              <v-card-title
                  class="text-h5 bg-grey-lighten-2"
                  primary-title>
                  Advanced settings
              </v-card-title>
              <v-card-text>
                  <v-row>
                      <v-col d-flex lg="6" md="6" sm="6" cols="12">
                          <div style="padding: 10px;">
                              <v-text-field id="densityRatio" label="Propellant density ratio:" v-model="modelValue.densityRatio" :rules="ratioRules"/>
                              <v-text-field id="nozzleErosionInMillimeter" label="Nozzle erosion:" :suffix="units.lengthUnit" v-model="modelValue.nozzleErosionInMillimeter" :rules="numericGreaterOrEqual0Rules"/>
                              <v-text-field id="combustionEfficiencyRatio" label="Combustion efficiency ratio:" v-model="modelValue.combustionEfficiencyRatio" :rules="ratioRules"/>
                              <v-text-field id="ambiantPressureInMPa" label="Ambiant pressure:" :hint="psiLabel" :persistent-hint="true" suffix="MPa" v-model="modelValue.ambiantPressureInMPa" :rules="pressureRules"/>
                          </div>
                      </v-col>
                      <v-col d-flex lg="6" md="6" sm="6">
                          <div style="padding: 10px;">
                              <v-text-field id="erosiveBurningAreaRatioThreshold" label="Erosive burning area ratio threshold:" v-model="modelValue.erosiveBurningAreaRatioThreshold" :rules="numericGreaterOrEqual0Rules"/>
                              <v-text-field id="erosiveBurningVelocityCoefficient" label="Erosive burning velocity coefficient:" v-model="modelValue.erosiveBurningVelocityCoefficient" :rules="numericGreaterOrEqual0Rules"/>
                              <v-text-field id="nozzleEfficiency" label="Nozzle efficiency:" v-model="modelValue.nozzleEfficiency" :rules="ratioRules"/>
                              <v-checkbox label="Optimal nozzle design" v-model="modelValue.optimalNozzleDesign" @change="resetNozzleExpansionRation" />
                              <v-text-field id="nozzleExpansionRatio" v-if="!modelValue.optimalNozzleDesign" label="Nozzle expansion ratio:" v-model="modelValue.nozzleExpansionRatio" :rules="expansionRules"/>
                          </div>
                      </v-col>
                  </v-row>
              </v-card-text>
              <v-card-actions>
                  <v-btn @click="resetConfig" color="purple">Reset</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="closeWithoutSave">Discard</v-btn>
                  <v-btn @click="close" color="primary">Save</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
import { greaterOrEqualsThanRule, rangeRule, rangeValidator, greaterOrEqualsThanValidator } from '../../modules/formValidationRules'
import { nextTick } from 'vue'

const rationBounds = [0.3, 1]

export default {
    name: 'advanced-configuration',
    props: {
        modelValue: Object,
        units: Object
    },
    data() {
        return {
            dialog: false,
            numericGreaterOrEqual0Rules: greaterOrEqualsThanRule(0),
            ratioRules: rangeRule(...rationBounds),
            expansionRules: greaterOrEqualsThanRule(1),
            pressureRules: greaterOrEqualsThanRule(0)
        }
    },
    methods: {
        resetNozzleExpansionRation(newOptimalNozzleDesignValue) {
            if (newOptimalNozzleDesignValue) {
                this.modelValue.nozzleExpansionRatio = null
            } else {
                nextTick(() => {
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
        closeWithoutSave() {
            this.resetConfig()
            this.dialog = false
        },
        isConfigValid() {
            let isValid = true

            for (const value of [this.modelValue.densityRatio, this.modelValue.combustionEfficiencyRatio, this.modelValue.nozzleEfficiency]) {
                isValid &= rangeValidator(...rationBounds)(value)
            }

            for (const value of [this.modelValue.nozzleErosionInMillimeter, this.modelValue.erosiveBurningAreaRatioThreshold, this.modelValue.erosiveBurningVelocityCoefficient]) {
                isValid &= greaterOrEqualsThanValidator(0)(value)
            }

            isValid &= greaterOrEqualsThanValidator(0)(this.modelValue.ambiantPressureInMPa)

            if (!this.modelValue.optimalNozzleDesign) {
                isValid &= greaterOrEqualsThanValidator(1)(this.modelValue.nozzleExpansionRatio)
            }

            return isValid
        }
    },
    computed: {
        psiLabel() {
            return Number(this.modelValue.ambiantPressureInMPa * 1000000 / 6895).toFixed(3) + ' psi'
        }
    }
}
</script>

<style scoped>

</style>
