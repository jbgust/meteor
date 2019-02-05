<template>
  <b-form>
    <b-form-group label="Throat diameter [mm]:">
      <b-form-input id="throatDiameter" v-model="defaultValue.throatDiameter"/>
    </b-form-group>
    <b-form-group label="Grain outer diameter [mm]:">
      <b-form-input id="outerDiameter" v-model="defaultValue.outerDiameter"/>
    </b-form-group>
    <b-form-group label="Grain core diameter [mm]:">
      <b-form-input id="coreDiameter" v-model="defaultValue.coreDiameter"/>
    </b-form-group>
    <b-form-group label="Grain segment length [mm]:">
      <b-form-input id="segmentLength" v-model="defaultValue.segmentLength"/>
    </b-form-group>
    <b-form-group label="Number of segment:">
      <b-form-input id="numberOfSegment" v-model="defaultValue.numberOfSegment"/>
    </b-form-group>

    <b-form-group label="Outer surface:">
      <b-form-select id="outerSurface" name="outerSurface" :options="grainSurfaces" v-model="defaultValue.outerSurface" />
    </b-form-group>

    <b-form-group label="Ends surface:">
      <b-form-select id="endsSurface" :options="grainSurfaces" v-model="defaultValue.endsSurface"/>
    </b-form-group>

    <b-form-group label="Core surface:">
      <b-form-select id="coreSurface" :options="grainSurfaces" v-model="defaultValue.coreSurface"/>
    </b-form-group>

    <b-form-group label="Propellant:">
      <b-form-select id="propellantType" :options="propellantType" v-model="defaultValue.propellantType"/>
    </b-form-group>

    <b-form-group label="Chamber inner diameter [mm]:">
      <b-form-input id="chamberInnerDiameter" v-model="defaultValue.chamberInnerDiameter"/>
    </b-form-group>
    <b-form-group label="Chamber length [mm]:">
      <b-form-input id="chamberLength" v-model="defaultValue.chamberLength"/>
    </b-form-group>

    <advanced-configuration v-model="defaultValue.extraConfig"/>

    <b-button variant="primary" @click="runComputation">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script type="text/ecmascript-6">

import Axios from 'axios'
import AdvancedConfiguration from './AdvancedConfiguration'

export default {
  name: 'solid-rocket-motor',
  components: { AdvancedConfiguration },
  data () {
    return {
      grainSurfaces: [
        { text: 'Exposed', value: 'EXPOSED' },
        { text: 'Inhibited', value: 'INHIBITED' }
      ],
      propellantType: [
        { text: 'KNDX', value: 'KNDX' },
        { text: 'KNER_COARSE', value: 'KNER_COARSE' },
        { text: 'KNMN_COARSE', value: 'KNMN_COARSE' },
        { text: 'KNSB_COARSE', value: 'KNSB_COARSE' },
        { text: 'KNSB_FINE', value: 'KNSB_FINE' },
        { text: 'KNSU', value: 'KNSU' }
      ],
      defaultValue: {
        throatDiameter: 17.3985248919802,
        outerDiameter: 69,
        coreDiameter: 20,
        segmentLength: 115,
        numberOfSegment: 4,
        outerSurface: 'INHIBITED',
        endsSurface: 'EXPOSED',
        coreSurface: 'EXPOSED',
        propellantType: 'KNDX',
        chamberInnerDiameter: 75,
        chamberLength: 470,
        extraConfig: {
          densityRatio: 0.95,
          nozzleErosionInMillimeter: 0,
          combustionEfficiencyRatio: 0.95,
          ambiantPressureInMPa: 0.101,
          erosiveBurningAreaRatioThreshold: 6,
          erosiveBurningVelocityCoefficient: 0,
          nozzleEfficiency: 0.85,
          nozzleExpansionRatio: null,
          optimalNozzleDesign: true
        }
      }
    }
  },
  methods: {
    runComputation () {
      const component = this
      Axios.post('/compute', {}, { data: this.defaultValue })
        .then(function (response) {
          console.log(response)
          component.$emit('computation-success', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
