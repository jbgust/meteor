<template>
    <v-layout column>
        <v-flex d-flex lg12>
            <v-text-field box hide-details id="name" label="Motor name" v-model="value.name" />
        </v-flex>
        <v-flex d-flex lg12>
            <v-select id="propellantType" label="Propellant:"
                      :hint="`${propellantHint}`" persistent-hint
                      :items="propellantType" :rules="requiredRules" v-model="value.propellantType" />
        </v-flex>
        <v-flex d-flex lg12>
            <v-layout row wrap>
                <v-flex d-flex lg6 md6>
                        <div>
                            <v-text-field id="throatDiameter" label="Throat diameter" suffix="mm" v-model="value.throatDiameter" :rules="numericGreater0Rules" step="0.01" ></v-text-field>
                            <v-text-field id="coreDiameter" label="Grain core diameter" suffix="mm" v-model="value.coreDiameter" :rules="numericGreater0Rules" step="0.01" />
                            <v-text-field id="outerDiameter" label="Grain outer diameter" suffix="mm" v-model="value.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                            <v-text-field id="segmentLength" label="Grain segment length" suffix="mm" v-model="value.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                            <v-text-field id="numberOfSegment" label="Number of segments" v-model="value.numberOfSegment" :rules="numericGreater0Rules" step="0.01" />
                        </div>
                    </v-flex>
                <v-flex d-flex lg6 md6>
                        <div>
                            <v-select id="endsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.endsSurface" />
                            <v-select id="coreSurface" label="Core surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.coreSurface" />
                            <v-select id="outerSurface" label="Outer surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.outerSurface"/>
                            <v-text-field id="chamberInnerDiameter" label="Combustion chamber diameter" suffix="mm" v-model="value.chamberInnerDiameter" :rules="numericGreater0Rules" step="0.01" />
                            <v-text-field id="chamberLength" label="Combustion chamber length" hint="From bulkhead to throat" suffix="mm" v-model="value.chamberLength" :rules="numericGreater0Rules" step="0.01" />
                        </div>
                    </v-flex>
                </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { requiredRule, greaterThanRule } from '../../modules/formValidationRules'

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
                { value: 'KNDX', text: 'KNDX', description: '65% KNO3 / 35% Dextrose', idealDensity: '1.879 g/cm³' },
                { value: 'KNER_COARSE', text: 'KNER (oxidizer lightly milled)', description: '65% KNO3 / 35% erythritol', idealDensity: '1.820 g/cm³' },
                { value: 'KNMN_COARSE', text: 'KNMN (oxidizer lightly milled)', description: '65% KNO3 / 35% mannitol', idealDensity: '1.854 g/cm³' },
                { value: 'KNSB_COARSE', text: 'KNSB (oxidizer lightly milled)', description: '65% KNO3 / 35% sorbitol', idealDensity: '1.841 g/cm³' },
                { value: 'KNSB_FINE', text: 'KNSB (oxidizer finely milled)', description: '65% KNO3 / 35% sorbitol', idealDensity: '1.841 g/cm³' },
                { value: 'KNSU', text: 'KNSU', description: '65% KNO3 / 35% sucrose', idealDensity: '1.889 g/cm³' }
            ],
            numericGreater0Rules: greaterThanRule(0),
            requiredRules: requiredRule
        }
    },
    computed: {
        propellantHint() {
            const matchingPropellants = this.propellantType.filter(propellant => propellant.value === this.value.propellantType)
            if (matchingPropellants.length === 1) {
                return `${matchingPropellants[0].description} (${matchingPropellants[0].idealDensity})`
            } else {
                return ''
            }
        }
    }
}
</script>
