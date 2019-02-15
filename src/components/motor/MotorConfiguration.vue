<template>
    <div>
        <v-text-field id="throatDiameter" label="Throat diameter [mm]:" v-model="value.throatDiameter"></v-text-field>
        <v-text-field id="outerDiameter" label="Grain outer diameter [mm]:" v-model="value.outerDiameter" required type="number"/>
        <v-text-field id="coreDiameter" label="Grain core diameter [mm]:" v-model="value.coreDiameter" required type="number"/>
        <v-text-field id="segmentLength" label="Grain segment length [mm]:" v-model="value.segmentLength" required type="number"/>
        <v-text-field id="numberOfSegment" label="Number of segment:" v-model="value.numberOfSegment" required type="number"/>
        <v-select id="outerSurface" label="Outer surface:" :items="grainSurfaces" v-model="value.outerSurface" required/>
        <v-select id="endsSurface" label="Ends surface:" :items="grainSurfaces" v-model="value.endsSurface" required/>
        <v-select id="coreSurface" label="Core surface:" :items="grainSurfaces" v-model="value.coreSurface" required/>
        <v-select id="propellantType" label="Propellant:" :items="propellantType" v-model="value.propellantType" required/>
        <v-text-field id="chamberInnerDiameter" label="Chamber inner diameter [mm]:" v-model="value.chamberInnerDiameter" required type="number"/>
        <v-text-field id="chamberLength" label="Chamber length [mm]:" v-model="value.chamberLength" required type="number"/>
    </div>
</template>
<script>
export default {
    name: 'motor-configuration',
    props: {
        value: {
            type: Object
        }
    },
    data() {
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
