<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout column>
        <v-flex d-flex lg12>
            <v-text-field filled hide-details id="name" label="Motor name" v-model="value.name" />
        </v-flex>
        <v-flex d-flex lg12>
            <v-select id="propellantType" label="Propellant:"
                      :hint="`${propellantHint}`" persistent-hint
                      :items="propellantType" :rules="requiredRules" v-model="value.propellantType" />
            <v-flex class="add-propellant-icon">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn text icon @click="addCustomPropellant" v-on="on" id="custom-propellant-add">
                            <v-icon>mdi-playlist-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>Add custom propellant</span>
                </v-tooltip>
            </v-flex>
        </v-flex>
        <v-flex d-flex lg12>
            <v-layout column>
            <v-layout colum wrap>
                <v-flex lg6 md6>
                    <v-text-field id="chamberInnerDiameter" label="Combustion chamber diameter" :suffix="units.lengthUnit" v-model="value.chamberInnerDiameter" :rules="numericGreater0Rules" step="0.01" />
                    <v-text-field id="chamberLength" label="Combustion chamber length" hint="From bulkhead to throat" :suffix="units.lengthUnit" v-model="value.chamberLength" :rules="numericGreater0Rules" step="0.01" />
                </v-flex>
                <v-flex lg6 md6>
                    <v-text-field id="throatDiameter" label="Throat diameter" :suffix="units.lengthUnit" v-model="value.throatDiameter" :rules="numericGreater0Rules" step="0.01" ></v-text-field>
                </v-flex>
            </v-layout>
            <GrainConfigurator v-model="value" :units="units" @grainConfigChange="$emit('resetValidation')"></GrainConfigurator>
            </v-layout>
        </v-flex>
        <custom-propellant-dialog ref="customPropellantDialog" :units="units" @save-propellant="loadPropellant"/>
    </v-layout>
</template>

<script>
import { requiredRule, greaterThanRule, integerGreaterThanRule } from '../../modules/formValidationRules'
import { getCustomPropellant, setCustomPropellant } from '../../modules/customPropellant'
import CustomPropellantDialog from '../propellant/CustomPropellantDialog'
import GrainConfigurator from './GrainConfigurator'
import { NATIVE_PROPELLANTS } from '../../modules/grainsConstants'

export default {
    name: 'motor-configuration',
    components: { GrainConfigurator, CustomPropellantDialog },
    props: {
        value: Object,
        units: Object
    },
    data() {
        return {
            propellantType: NATIVE_PROPELLANTS,
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
