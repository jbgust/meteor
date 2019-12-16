<template>
    <v-layout column>
        <v-flex d-flex lg12>
            <v-select
                v-model="value.grainType"
                :items="grainTypes"
                label="Grain configuration"
                @change="grainTypeChange"
            ></v-select>
            <v-flex class="grain-help-icon">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn small text icon v-on="on" @click="$refs.helpDialog.show()" class="mt-3">
                            <v-icon id="btnHelpGrain">mdi-help</v-icon>
                        </v-btn>
                    </template>
                    <span>How configuring grain?</span>
                </v-tooltip>
            </v-flex>
        </v-flex>
        <v-layout colum class="pl-1 pr-1" wrap>
            <v-flex lg6 md6 v-if="value.grainType === hollowCode">
                <v-text-field id="coreDiameter" label="Grain core diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.coreDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="outerDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="segmentLength" label="Grain segment length" :suffix="units.lengthUnit" v-model="value.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="numberOfSegment" label="Number of segments" v-model="value.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === hollowCode">
                <v-select id="coreSurface" label="Core surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.grainConfig.coreSurface" />
                <v-select id="endsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.grainConfig.endsSurface" />
                <v-select id="outerSurface" label="Outer surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.grainConfig.outerSurface"/>
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === finocylCode">
                <v-text-field id="finocylOuterDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="finocylSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" v-model="value.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="finocylNumberOfSegment" label="Number of segments" v-model="value.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                <v-text-field id="finocylInnerDiameter" label="Inner diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.innerDiameter" :rules="numericGreater0Rules" step="0.01" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === finocylCode">
                <v-text-field id="finocylFinWidth" label="Fin width" :suffix="units.lengthUnit" v-model="value.grainConfig.finWidth" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="finocylFinDiameter" label="Fin diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.finDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="finocylFinCount" label="Number of fin" :suffix="units.lengthUnit" v-model="value.grainConfig.finCount" :rules="numericGreater0Rules" step="0.01" />
                <v-select id="finocylEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.grainConfig.endsSurface" />
            </v-flex>
        </v-layout>
        <help-dialog ref="helpDialog"></help-dialog>
    </v-layout>
</template>

<script>
import { greaterThanRule, integerGreaterThanRule, requiredRule } from '../../modules/formValidationRules'
import { EXPOSED, FINOCYL, HOLLOW, INHIBITED } from '../../modules/grainsConstants'
import HelpDialog from './HelpDialog'

export default {
    name: 'GrainConfigurator',
    components: { HelpDialog },
    props: {
        value: Object,
        units: Object
    },
    data() {
        return {
            numericGreater0Rules: greaterThanRule(0),
            integerGreater0Rules: integerGreaterThanRule(0),
            requiredRules: requiredRule,
            grainSurfaces: [
                { text: 'Exposed', value: EXPOSED },
                { text: 'Inhibited', value: INHIBITED }
            ],
            hollowCode: HOLLOW,
            finocylCode: FINOCYL,
            grainTypes: [{ value: HOLLOW, text: 'Hollow cylinder' }, { value: FINOCYL, text: 'Finocyl' }],
            selectedGrain: null
        }
    },
    methods: {
        grainTypeChange() {
            this.value.grainConfig = {}
            this.$emit('grainConfigChange')
        }
    }
}
</script>

<style scoped>
    .grain-help-icon {
        max-width: 40px;
    }
</style>
