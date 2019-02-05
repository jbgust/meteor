<template>
  <div>
    <b-btn v-b-toggle.advancedConfig>Advanced configuration</b-btn>

    <b-collapse id="advancedConfig">
      <b-card>
        <b-form-group label="densityRatio:">
          <b-form-input id="densityRatio" v-model="value.densityRatio"/>
        </b-form-group>
        <b-form-group label="nozzleErosionInMillimeter:">
          <b-form-input id="nozzleErosionInMillimeter" v-model="value.nozzleErosionInMillimeter"/>
        </b-form-group>
        <b-form-group label="combustionEfficiencyRatio:">
          <b-form-input id="combustionEfficiencyRatio" v-model="value.combustionEfficiencyRatio"/>
        </b-form-group>
        <b-form-group label="ambiantPressureInMPa:">
          <b-form-input id="ambiantPressureInMPa" v-model="value.ambiantPressureInMPa"/>
        </b-form-group>
        <b-form-group label="erosiveBurningAreaRatioThreshold:">
          <b-form-input id="erosiveBurningAreaRatioThreshold" v-model="value.erosiveBurningAreaRatioThreshold"/>
        </b-form-group>
        <b-form-group label="erosiveBurningVelocityCoefficient:">
          <b-form-input id="erosiveBurningVelocityCoefficient" v-model="value.erosiveBurningVelocityCoefficient"/>
        </b-form-group>
        <b-form-group label="nozzleEfficiency:">
          <b-form-input id="nozzleEfficiency" v-model="value.nozzleEfficiency"/>
        </b-form-group>
        <b-form-group label="nozzleExpansionRatio:">
          <b-form-input id="nozzleExpansionRatio" v-model="value.nozzleExpansionRatio"/>
        </b-form-group>
        <b-form-group label="optimalNozzleDesign:">
          <b-form-checkbox v-model="value.optimalNozzleDesign"/>
        </b-form-group>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'advanced-configuration',
  props: {
    value: {
      type: Object
    }
  }

}
</script>

<style scoped>

</style>
