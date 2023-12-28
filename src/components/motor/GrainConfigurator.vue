<template>
    <v-col>
        <v-row no-gutters>
            <v-select
                variant="underlined"
                v-model="modelValue.grainType"
                item-title="text"
                :items="grainTypes"
                :rules="requiredRules"
                label="Grain configuration"
                @update:model-value="grainTypeChange"
            ></v-select>
            <v-col class="grain-help-icon">
                <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn size="small" variant="text" icon="mdi-help" v-bind="props" @click="$refs.helpDialog.show()" class="mt-3">
                        </v-btn>
                    </template>
                    <span>How configuring grain?</span>
                </v-tooltip>
            </v-col>
        </v-row>
        <v-row class="pl-1 pr-1" d-flex wrap lg12>
            <v-col lg6 md6 v-if="modelValue.grainType === hollowCode">

                <v-text-field id="coreDiameter" label="Grain core diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.coreDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="outerDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="segmentLength" label="Grain segment length" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="numberOfSegment" label="Number of segments" variant="underlined" density="compact" v-model="modelValue.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === hollowCode">
                <v-select id="coreSurface" label="Core surface" :items="grainSurfaces" :rules="requiredRules" variant="underlined" density="compact" v-model="modelValue.grainConfig.coreSurface" item-title="text"/>
                <v-select id="outerSurface" label="Outer surface" :items="grainSurfaces" :rules="requiredRules" variant="underlined" density="compact" v-model="modelValue.grainConfig.outerSurface" item-title="text"/>
                <v-select id="endsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" variant="underlined" density="compact" v-model="modelValue.grainConfig.endsSurface" item-title="text"/>
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === finocylCode">
                <v-text-field id="finocylOuterDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="finocylSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="finocylNumberOfSegment" label="Number of segments" variant="underlined" density="compact" v-model="modelValue.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                <v-text-field id="finocylInnerDiameter" label="Core diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.innerDiameter" :rules="numericGreater0Rules" step="0.01" />
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === finocylCode">
                <v-text-field id="finocylFinWidth" label="Fin width" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.finWidth" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="finocylFinDiameter" label="Fin diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.finDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="finocylFinCount" label="Number of fin" variant="underlined" density="compact" v-model="modelValue.grainConfig.finCount" :rules="nbFinsRules" step="0.01" />
                <v-select id="finocylEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" variant="underlined" density="compact" v-model="modelValue.grainConfig.endsSurface" item-title="text"/>
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === starGrain">
                <v-text-field id="starOuterDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="starSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="starNumberOfSegment" label="Number of segments" variant="underlined" density="compact" v-model="modelValue.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                <v-text-field id="starInnerDiameter" label="Inner diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.innerDiameter" :rules="numericGreater0Rules" step="0.01" />
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === starGrain">
                <v-text-field id="starPointDiameter" label="Star diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.pointDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="starPointCount" label="Number of branches" variant="underlined" density="compact" v-model="modelValue.grainConfig.pointCount" :rules="nbBranchesRules" step="0.01" />
                <v-select id="starEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" variant="underlined" density="compact" v-model="modelValue.grainConfig.endsSurface" item-title="text"/>
            </v-col>
            <v-col lg12 md12 v-if="modelValue.grainType === endBurnerGrain">
                <v-text-field id="endBurnerOuterDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="endBurnerSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="endBurnerHoleDiameter" label="Hole diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.holeDiameter" :rules="numericGreaterOrEquals0Rules" step="0.01" />
                <v-text-field id="endBurnerHoleDepth" label="Hole depth" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.holeDepth" :rules="numericGreaterOrEquals0Rules" step="0.01" />
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === moonBurner">
                <v-text-field id="moonBurnerOuterDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="moonBurnerCoreDiameter" label="Core diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.coreDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="moonBurnerCoreOffset" label="Core offset" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.coreOffset" :rules="numericGreaterOrEqualsThan0Rules" step="0.01" />
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === moonBurner">
                <v-text-field id="moonBurnerSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="moonBurnerNumberOfSegment" label="Number of segments" variant="underlined" density="compact" v-model="modelValue.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                <v-select id="moonBurnerEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" variant="underlined" density="compact" v-model="modelValue.grainConfig.endsSurface" item-title="text"/>
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === cSlot">
                <v-text-field id="cSlotOuterDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="cSlotCoreDiameter" label="Core diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.coreDiameter" :rules="numericGreaterOrEqualsThan0Rules" step="0.01" />
                <v-text-field id="cSlotSlotWidth" label="Slot width" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.slotWidth" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="cSlotSlotDepth" label="Slot depth" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.slotDepth" :rules="numericGreater0Rules" step="0.01" />
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === cSlot">
                <v-text-field id="cSlotSlotOffset" label="Slot offset" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.slotOffset" :rules="numericGreaterOrEqualsThan0Rules" step="0.01" />
                <v-text-field id="cSlotSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="cSlotNumberOfSegment" label="Number of segments" variant="underlined" density="compact" v-model="modelValue.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                <v-select id="cSlotEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" variant="underlined" density="compact" v-model="modelValue.grainConfig.endsSurface" item-title="text"/>
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === rodTube">
                <v-text-field id="rodTubeRodDiameter" label="Rod diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.rodDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="rodTubeTubeOuterDiameter" label="Tube outer diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.tubeOuterDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="rodTubeTubeInnerDiameter" label="Tube inner diameter" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.tubeInnerDiameter" :rules="numericGreater0Rules" step="0.01" />
            </v-col>
            <v-col lg6 md6 v-if="modelValue.grainType === rodTube">
                <v-text-field id="rodTubeSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" variant="underlined" density="compact" v-model="modelValue.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="rodTubeNumberOfSegment" label="Number of segments" variant="underlined" density="compact" v-model="modelValue.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                <v-select id="rodTubeEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" variant="underlined" density="compact" v-model="modelValue.grainConfig.endsSurface" item-title="text"/>
            </v-col>
        </v-row>
        <help-dialog ref="helpDialog"></help-dialog>
    </v-col>
</template>

<script>
import {
    greaterThanRule,
    integerGreaterThanRule,
    requiredRule,
    rangeRule,
    greaterOrEqualsThanRule
} from '../../modules/formValidationRules'
import {
    C_SLOT,
    END_BURNER,
    EXPOSED,
    FINOCYL,
    HOLLOW,
    INHIBITED,
    MOON_BURNER, ROD_TUBE,
    STAR
} from '../../modules/grainsConstants'
import HelpDialog from './HelpDialog'

export default {
    name: 'GrainConfigurator',
    components: { HelpDialog },
    props: {
        modelValue: Object,
        units: Object
    },
    data() {
        return {
            numericGreater0Rules: greaterThanRule(0),
            integerGreater0Rules: integerGreaterThanRule(0),
            numericGreaterOrEquals0Rules: greaterOrEqualsThanRule(0),
            nbFinsRules: rangeRule(1, 10),
            nbBranchesRules: rangeRule(1, 9),
            numericGreaterOrEqualsThan0Rules: greaterOrEqualsThanRule(0),
            requiredRules: requiredRule,
            grainSurfaces: [
                { text: 'Exposed', value: EXPOSED },
                { text: 'Inhibited', value: INHIBITED }
            ],
            hollowCode: HOLLOW,
            finocylCode: FINOCYL,
            starGrain: STAR,
            moonBurner: MOON_BURNER,
            cSlot: C_SLOT,
            rodTube: ROD_TUBE,
            endBurnerGrain: END_BURNER,
            grainTypes: [
                { value: C_SLOT, text: 'C slot' },
                { value: END_BURNER, text: 'End burner' },
                { value: FINOCYL, text: 'Finocyl' },
                { value: HOLLOW, text: 'Hollow cylinder' },
                { value: MOON_BURNER, text: 'Moon burner' },
                { value: ROD_TUBE, text: 'Rod and tube' },
                { value: STAR, text: 'Star (not available)', disabled: !localStorage.getItem('starEnabled') }],
            selectedGrain: null
        }
    },
    methods: {
        grainTypeChange() {
            if (this.modelValue.grainType === HOLLOW) {
                // fix pour le bug qui ne rafraichi pas les inputs au changement de type de grain
                this.modelValue.grainConfig = {
                    coreDiameter: null,
                    outerDiameter: null,
                    segmentLength: null,
                    numberOfSegment: null,
                    coreSurface: null,
                    endsSurface: null,
                    outerSurface: null
                }
            } else {
                this.modelValue.grainConfig = {}
            }
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
