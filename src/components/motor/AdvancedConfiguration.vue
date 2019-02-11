<template>
  <div>
      <v-card v-show="false">
          <v-text-field id="densityRatio" label="densityRatio:" v-model="value.densityRatio" required type="number"/>
          <v-text-field id="nozzleErosionInMillimeter" label="nozzleErosionInMillimeter:" v-model="value.nozzleErosionInMillimeter" required type="number"/>
          <v-text-field id="combustionEfficiencyRatio" label="combustionEfficiencyRatio:" v-model="value.combustionEfficiencyRatio" required type="number"/>
          <v-text-field id="ambiantPressureInMPa" label="ambiantPressureInMPa:" v-model="value.ambiantPressureInMPa" required type="number"/>
          <v-text-field id="erosiveBurningAreaRatioThreshold" label="erosiveBurningAreaRatioThreshold:" v-model="value.erosiveBurningAreaRatioThreshold" required type="number"/>
          <v-text-field id="erosiveBurningVelocityCoefficient" label="erosiveBurningVelocityCoefficient:" v-model="value.erosiveBurningVelocityCoefficient" required type="number"/>
          <v-text-field id="nozzleEfficiency" label="nozzleEfficiency:" v-model="value.nozzleEfficiency" required type="number"/>
          <v-checkbox label="optimalNozzleDesign:" v-model="value.optimalNozzleDesign" @change="resetNozzleExpansionRation" />
          <v-text-field id="nozzleExpansionRatio" v-show="!value.optimalNozzleDesign" label="nozzleExpansionRatio:" v-model="value.nozzleExpansionRatio" required type="number"/>
      </v-card>
  </div>
</template>

<script>
export default {
    name: 'advanced-configuration',
    props: {
        value: {
            type: Object
        }
    },
    methods: {
        resetNozzleExpansionRation(newOptimalNozzleDesignValue) {
            if (newOptimalNozzleDesignValue) {
                this.value.nozzleExpansionRatio = null
            }
        }
    }

}
</script>

<style scoped>

</style>
