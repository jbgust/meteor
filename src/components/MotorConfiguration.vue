<template>
  <b-card>
    <b-form-group label="Throat diameter [mm]:">
        <b-form-input id="throatDiameter" v-model="value.throatDiameter" required type="number"/>
    </b-form-group>
    <b-form-group label="Grain outer diameter [mm]:">
        <b-form-input id="outerDiameter" v-model="value.outerDiameter" required type="number"/>
    </b-form-group>
    <b-form-group label="Grain core diameter [mm]:">
        <b-form-input id="coreDiameter" v-model="value.coreDiameter" required type="number"/>
    </b-form-group>
    <b-form-group label="Grain segment length [mm]:">
        <b-form-input id="segmentLength" v-model="value.segmentLength" required type="number"/>
    </b-form-group>
    <b-form-group label="Number of segment:">
        <b-form-input id="numberOfSegment" v-model="value.numberOfSegment" required type="number"/>
    </b-form-group>
    <b-form-group label="Outer surface:">
        <b-form-select id="outerSurface" name="outerSurface" :options="grainSurfaces"
                       v-model="value.outerSurface" required/>
    </b-form-group>
    <b-form-group label="Ends surface:">
        <b-form-select id="endsSurface" :options="grainSurfaces" v-model="value.endsSurface" required/>
    </b-form-group>
    <b-form-group label="Core surface:">
        <b-form-select id="coreSurface" :options="grainSurfaces" v-model="value.coreSurface" required/>
    </b-form-group>
    <b-form-group label="Propellant:">
        <b-form-select id="propellantType" :options="propellantType" v-model="value.propellantType" required/>
    </b-form-group>
    <b-form-group label="Chamber inner diameter [mm]:">
        <b-form-input id="chamberInnerDiameter" v-model="value.chamberInnerDiameter" required type="number"/>
    </b-form-group>
    <b-form-group label="Chamber length [mm]:">
        <b-form-input id="chamberLength" v-model="value.chamberLength" required type="number"/>
    </b-form-group>
  </b-card>
</template>
<script>
export default {
  name: 'motor-configuration',
  props: {
    value: {
      type: Object
    }
  },
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
