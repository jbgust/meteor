<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout column>
            <v-col>
                <v-text-field filled id="name" :rules="nameRule" label="Motor name" v-model="value.name" />
                <v-textarea
                    :rules="descriptionRule"
                    rows="2"
                    id="motorDescription"
                    label="Description"
                    v-model="value.description"/>
            </v-col>

        <v-flex d-flex lg12>
            <v-select id="propellantType" label="Propellant:"
                      :hint="`${propellantHint}`" persistent-hint
                      :items="propellants" :rules="requiredRules" v-model="value.propellantId" />
            <v-flex class="add-propellant-icon">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn class="mt-3" text icon @click="managePropellant" v-on="on" id="custom-propellant-add">
                            <v-icon>mdi-progress-wrench</v-icon>
                        </v-btn>
                    </template>
                    <span>Manage propellant</span>
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
        <propellant-select :units= "units" ref="dialogPropellant" @propellantDeleted="catchDeletedPropellant"></propellant-select>
    </v-layout>
</template>

<script>
import {
    requiredRule,
    greaterThanRule,
    integerGreaterThanRule,
    stringRequiredMaxLengthRule, stringMaxLengthRule
} from '@/modules/formValidationRules'
import GrainConfigurator from './GrainConfigurator'
import { NATIVE_PROPELLANTS } from '@/modules/grainsConstants'
import { mapActions, mapGetters } from 'vuex'
import PropellantSelect from '@/components/propellant/PropellantSelect'

export default {
    name: 'motor-configuration',
    components: { PropellantSelect, GrainConfigurator },
    props: {
        value: Object,
        units: Object
    },
    data() {
        return {
            propellantType: NATIVE_PROPELLANTS,
            numericGreater0Rules: greaterThanRule(0),
            integerGreater0Rules: integerGreaterThanRule(0),
            requiredRules: requiredRule,
            // nameRule: stringRequiredMaxLengthRule(256),
            nameRule: [...stringRequiredMaxLengthRule(256), this.checkNamesExists],
            descriptionRule: stringMaxLengthRule(1000)
        }
    },
    mounted() {
        this.loadCustomPropellants()
    },
    computed: {
        ...mapGetters('customPropellants', ['customPropellants']),
        propellants() {
            let propellants = []
            if (!(this.customPropellants == null || this.customPropellants === undefined)) {
                this.customPropellants
                    .forEach(customPropellant => propellants.push(
                        {
                            value: customPropellant.id,
                            text: customPropellant.name,
                            description: customPropellant.description
                        }))
            }
            NATIVE_PROPELLANTS.forEach(nativePropellant => propellants.push(nativePropellant))
            return propellants
        },
        propellantHint() {
            const matchingPropellants = this.propellantType.filter(propellant => propellant.value === this.value.propellantId)
            if (matchingPropellants.length === 1 && !!matchingPropellants[0].description && !!matchingPropellants[0].idealDensity) {
                return `${matchingPropellants[0].description} (${matchingPropellants[0].idealDensity})`
            } else {
                return ''
            }
        }
    },
    methods: {
        checkNamesExists(fieldValue) {
            if (fieldValue) {
                const length = this.motors()
                    .filter(motor => (!this.value.id || motor.id !== this.value.id) && motor.name === fieldValue)
                    .length
                return length !== 0 ? 'A motor already own this name, please change it.' : true
            } else {
                return true
            }
        },
        managePropellant() {
            this.$refs.dialogPropellant.show()
        },
        catchDeletedPropellant(propellantId) {
            this.$emit('propellantDeleted', propellantId)
        },
        ...mapActions('customPropellants', ['loadCustomPropellants']),
        ...mapGetters('motors', ['motors'])
    }
}
</script>

<style scoped>
    .add-propellant-icon {
        max-width: 40px;
    }
</style>
