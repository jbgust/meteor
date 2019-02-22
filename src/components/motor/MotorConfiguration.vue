<template>
        <v-layout row wrap>
            <v-flex d-flex lg6>
                <div>
                    <v-text-field id="throatDiameter" label="Throat diameter [mm]:" v-model="value.throatDiameter" :rules="numericRules" step="0.01" ></v-text-field>
                    <v-text-field id="outerDiameter" label="Grain outer diameter [mm]:" v-model="value.outerDiameter" :rules="numericRules" step="0.01" />
                    <v-text-field id="coreDiameter" label="Grain core diameter [mm]:" v-model="value.coreDiameter" :rules="numericRules" step="0.01" />
                    <v-text-field id="segmentLength" label="Grain segment length [mm]:" v-model="value.segmentLength" :rules="numericRules" step="0.01"/>
                    <v-text-field id="numberOfSegment" label="Number of segment:" v-model="value.numberOfSegment" :rules="numericRules" step="0.01" />
                    <v-select id="outerSurface" label="Outer surface:" :items="grainSurfaces" :rules="requiredRules" v-model="value.outerSurface"/>
                </div>
            </v-flex>
            <v-flex d-flex lg6>
                <div>
                    <v-select id="endsSurface" label="Ends surface:" :items="grainSurfaces" :rules="requiredRules" v-model="value.endsSurface" />
                    <v-select id="coreSurface" label="Core surface:" :items="grainSurfaces" :rules="requiredRules" v-model="value.coreSurface" />
                    <v-select id="propellantType" label="Propellant:" :items="propellantType" :rules="requiredRules" v-model="value.propellantType" />
                    <v-text-field id="chamberInnerDiameter" label="Chamber inner diameter [mm]:" v-model="value.chamberInnerDiameter" :rules="numericRules" step="0.01" />
                    <v-text-field id="chamberLength" label="Chamber length [mm]:" v-model="value.chamberLength" :rules="numericRules" step="0.01" />
                </div>
            </v-flex>
        </v-layout>
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
            ],
            numericRules: [
                v => !!v || 'Value is required',
                v => !isNaN(v) || 'Value is not a number',
                v => (v && v > 0) || 'Value must be greater than 0'
            ],
            requiredRules: [
                v => !!v || 'Field is required'
            ],
        }
    }
}
</script>
