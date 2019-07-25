<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout column>
        <v-flex d-flex lg12>
            <v-text-field box hide-details id="name" label="Motor name" v-model="value.name" />
        </v-flex>
        <v-flex d-flex lg12>
            <v-select id="propellantType" label="Propellant:"
                      :hint="`${propellantHint}`" persistent-hint
                      :items="propellantType" :rules="requiredRules" v-model="value.propellantType" />
            <v-flex class="add-propellant-icon">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn flat icon @click="addCustomPropellant" v-on="on" id="custom-propellant-add">
                            <v-icon>playlist_add</v-icon>
                        </v-btn>
                    </template>
                    <span>Add custom propellant</span>
                </v-tooltip>
            </v-flex>
        </v-flex>
        <v-flex d-flex lg12>
            <v-layout row wrap>
                <v-flex d-flex lg6 md6>
                        <div>
                            <v-text-field id="throatDiameter" label="Throat diameter" :suffix="units.lengthUnit" v-model="value.throatDiameter" :rules="numericGreater0Rules" step="0.01" ></v-text-field>
                            <v-text-field id="coreDiameter" label="Grain core diameter" :suffix="units.lengthUnit" v-model="value.coreDiameter" :rules="numericGreater0Rules" step="0.01" />
                            <v-text-field id="outerDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" v-model="value.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                            <v-text-field id="segmentLength" label="Grain segment length" :suffix="units.lengthUnit" v-model="value.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                            <v-text-field id="numberOfSegment" label="Number of segments" v-model="value.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                        </div>
                    </v-flex>
                <v-flex d-flex lg6 md6>
                        <div>
                            <v-select id="endsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.endsSurface" />
                            <v-select id="coreSurface" label="Core surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.coreSurface" />
                            <v-select id="outerSurface" label="Outer surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.outerSurface"/>
                            <v-text-field id="chamberInnerDiameter" label="Combustion chamber diameter" :suffix="units.lengthUnit" v-model="value.chamberInnerDiameter" :rules="numericGreater0Rules" step="0.01" />
                            <v-text-field id="chamberLength" label="Combustion chamber length" hint="From bulkhead to throat" :suffix="units.lengthUnit" v-model="value.chamberLength" :rules="numericGreater0Rules" step="0.01" />
                        </div>
                    </v-flex>
            </v-layout>
        </v-flex>
        <custom-propellant-dialog ref="customPropellantDialog" :units="units" @save-propellant="loadPropellant"/>
    </v-layout>
</template>

<script>
import { requiredRule, greaterThanRule, integerGreaterThanRule } from '../../modules/formValidationRules'
import { getCustomPropellant, setCustomPropellant } from '../../modules/customPropellant'
import CustomPropellantDialog from '../propellant/CustomPropellantDialog'

export default {
    name: 'motor-configuration',
    components: { CustomPropellantDialog },
    props: {
        value: Object,
        units: Object
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
            integerGreater0Rules: integerGreaterThanRule(0),
            requiredRules: requiredRule
        }
    },
    computed: {
        propellantHint() {
            const matchingPropellants = this.propellantType.filter(propellant => propellant.value === this.value.propellantType)
            if (matchingPropellants.length === 1 && !!matchingPropellants[0].description && !!matchingPropellants[0].idealDensity) {
                return `${matchingPropellants[0].description} (${matchingPropellants[0].idealDensity})`
            } else {
                return ''
            }
        }
    },
    methods: {
        addCustomPropellant() {
            this.$refs.customPropellantDialog.show(getCustomPropellant('CUSTOM_propellant'))
        },
        loadPropellant(propellant) {
            let propellantId = setCustomPropellant('propellant', propellant)
            let customPropellant = { value: propellantId, text: propellant.name }
            this.propellantType.unshift(customPropellant)
            this.value.propellantType = customPropellant.value
        }
    }
}
</script>

<style scoped>
    .add-propellant-icon {
        max-width: 40px;
    }
</style>
