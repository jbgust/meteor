<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout column>
            <v-col>
                <v-text-field filled id="name" :rules="nameRule" label="Motor name" v-model="modelValue.name" />
                <v-textarea
                    :rules="descriptionRule"
                    rows="2"
                    id="motorDescription"
                    label="Description"
                    v-model="modelValue.description"/>
            </v-col>

        <v-col d-flex lg12>
            <v-select id="propellantType" label="Propellant:"
                      item-title="text"
                      :hint="`${propellantHint}`" persistent-hint
                      :items="propellants" :rules="requiredRules" v-model="modelValue.propellantId" />
            <v-col class="add-propellant-icon" v-if="isLogged">
                <v-tooltip bottom>
                    <template v-slot:activator="{ props }">
                        <v-btn class="mt-3" variant="text" icon="mdi-progress-wrench" @click="managePropellant" v-bind="props" id="custom-propellant-add">
                        </v-btn>
                    </template>
                    <span>Manage propellant</span>
                </v-tooltip>
            </v-col>
        </v-col>
        <v-col d-flex lg12>
            <v-layout column>
            <v-layout colum wrap>
                <v-col lg6 md6>
                    <v-text-field id="chamberInnerDiameter" label="Combustion chamber diameter"
                                  :suffix="units.lengthUnit" v-model="modelValue.chamberInnerDiameter"
                                  :rules="chamberDiameterRules" step="0.01" />
                    <v-text-field id="chamberLength" label="Combustion chamber length" hint="From bulkhead to throat"
                                  :suffix="units.lengthUnit" v-model="modelValue.chamberLength"
                                  :rules="chamberLengthRules" step="0.01" />
                </v-col>
                <v-col lg6 md6>
                    <v-text-field id="throatDiameter" label="Throat diameter" :suffix="units.lengthUnit" v-model="modelValue.throatDiameter" :rules="numericGreater0Rules" step="0.01" ></v-text-field>
                </v-col>
            </v-layout>
<!--                TODO : vuetify 3-->
            <GrainConfigurator :model-value="modelValue" @update:modelValue="modelValue = $event" :units="units" @grainConfigChange="$emit('resetValidation')"></GrainConfigurator>
            </v-layout>
        </v-col>
        <propellant-select :units= "units" ref="dialogPropellant" @propellantDeleted="catchDeletedPropellant"></propellant-select>
    </v-layout>
</template>

<script>
import {
    requiredRule,
    greaterThanRule,
    integerGreaterThanRule,
    stringRequiredMaxLengthRule, stringMaxLengthRule, rangeRule
} from '@/modules/formValidationRules'
import GrainConfigurator from './GrainConfigurator'
import { NATIVE_PROPELLANTS } from '@/modules/grainsConstants'
import { mapActions, mapGetters } from 'vuex'
import PropellantSelect from '@/components/propellant/PropellantSelect'
import { SI_UNITS } from '@/modules/computationUtils.mjs'

export default {
    name: 'motor-configuration',
    components: { PropellantSelect, GrainConfigurator },
    props: {
        modelValue: Object,
        units: Object
    },
    emits: ['update:modelValue', 'resetValidation'],
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
        ...mapGetters('authentication', ['isLogged']),
        chamberDiameterRules() {
            return rangeRule(0, this.units.type === SI_UNITS ? 500 : 500 / 2.54)
        },
        chamberLengthRules() {
            return rangeRule(0, this.units.type === SI_UNITS ? 1200 : 1200 / 2.54)
        },
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
            const matchingPropellants = this.propellantType.filter(propellant => propellant.value === this.modelValue.propellantId)
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
                    .filter(motor => (!this.modelValue.id || motor.id !== this.modelValue.id) && motor.name === fieldValue)
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
