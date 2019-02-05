<template>
  <b-card>
    <b-btn v-b-toggle.advancedConfig>Advanced configuration</b-btn>
    <b-collapse id="advancedConfig">
      <b-card>
        <b-form-group label="densityRatio:">
          <b-form-input id="densityRatio" v-model="value.densityRatio" required type="number"/>
        </b-form-group>
        <b-form-group label="nozzleErosionInMillimeter:">
          <b-form-input id="nozzleErosionInMillimeter" v-model="value.nozzleErosionInMillimeter" required type="number"/>
        </b-form-group>
        <b-form-group label="combustionEfficiencyRatio:">
          <b-form-input id="combustionEfficiencyRatio" v-model="value.combustionEfficiencyRatio" required type="number"/>
        </b-form-group>
        <b-form-group label="ambiantPressureInMPa:">
          <b-form-input id="ambiantPressureInMPa" v-model="value.ambiantPressureInMPa" required type="number"/>
        </b-form-group>
        <b-form-group label="erosiveBurningAreaRatioThreshold:">
          <b-form-input id="erosiveBurningAreaRatioThreshold" v-model="value.erosiveBurningAreaRatioThreshold" required type="number"/>
        </b-form-group>
        <b-form-group label="erosiveBurningVelocityCoefficient:">
          <b-form-input id="erosiveBurningVelocityCoefficient" v-model="value.erosiveBurningVelocityCoefficient" required type="number"/>
        </b-form-group>
        <b-form-group label="nozzleEfficiency:">
          <b-form-input id="nozzleEfficiency" v-model="value.nozzleEfficiency" required type="number"/>
        </b-form-group>
        <b-form-group label="optimalNozzleDesign:">
          <b-form-checkbox v-model="value.optimalNozzleDesign" @change="resetNozzleExpansionRation" />
        </b-form-group>
        <b-form-group v-show="!value.optimalNozzleDesign" label="nozzleExpansionRatio:">
          <b-form-input id="nozzleExpansionRatio" v-model="value.nozzleExpansionRatio" required type="number"/>
        </b-form-group>
      </b-card>
    </b-collapse>
  </b-card>
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
    resetNozzleExpansionRation (newOptimalNozzleDesignValue) {
      if (newOptimalNozzleDesignValue) {
        this.value.nozzleExpansionRatio = null
      }
    }
  }

}
</script>

<style scoped>

</style>
