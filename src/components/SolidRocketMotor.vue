<template>
  <b-form>
    <b-form-group label="Throat diameter [mm]:">
      <b-form-input id="throatDiameter"/>
    </b-form-group>
    <b-form-group label="Grain outer diameter [mm]:">
      <b-form-input id="outerDiameter"/>
    </b-form-group>
    <b-form-group label="Grain core diameter [mm]:">
      <b-form-input id="coreDiameter"/>
    </b-form-group>
    <b-form-group label="Grain segment length [mm]:">
      <b-form-input id="segmentLength"/>
    </b-form-group>
    <b-form-group label="Number of segment:">
      <b-form-input id="numberOfSegment"/>
    </b-form-group>

    <b-form-group label="Outer surface:">
      <b-form-select id="outerSurface" name="outerSurface" :options="grainSurfaces" />
    </b-form-group>
    <b-form-group label="Ends surface:">
      <b-form-select id="endsSurface" :options="grainSurfaces" />
    </b-form-group>

    <b-form-group label="Core surface:">
      <b-form-select id="coreSurface" :options="grainSurfaces" />
    </b-form-group>

    <b-form-group label="Propellant:">
      <b-form-select id="propellantType" :options="propellantType" />
    </b-form-group>

    <b-form-group label="Chamber inner diameter [mm]:">
      <b-form-input id="chamberInnerDiameter"/>
    </b-form-group>
    <b-form-group label="Chamber length [mm]:">
      <b-form-input id="chamberLength"/>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>

export default {
  name: 'solid-rocket-motor',
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
      ]
    }
  }
}
</script>

<style scoped>

</style>
