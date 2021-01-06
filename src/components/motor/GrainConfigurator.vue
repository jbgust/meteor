<template>
    <v-layout column>
        <v-flex d-flex lg12>
            <v-select
                v-model="value.grainType"
                :items="grainTypes"
                :rules="requiredRules"
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
                <v-text-field id="finocylInnerDiameter" label="Core diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.innerDiameter" :rules="numericGreater0Rules" step="0.01" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === finocylCode">
                <v-text-field id="finocylFinWidth" label="Fin width" :suffix="units.lengthUnit" v-model="value.grainConfig.finWidth" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="finocylFinDiameter" label="Fin diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.finDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="finocylFinCount" label="Number of fin" :suffix="units.lengthUnit" v-model="value.grainConfig.finCount" :rules="nbFinsRules" step="0.01" />
                <v-select id="finocylEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.grainConfig.endsSurface" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === starGrain">
                <v-text-field id="starOuterDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="starSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" v-model="value.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="starNumberOfSegment" label="Number of segments" v-model="value.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                <v-text-field id="starInnerDiameter" label="Inner diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.innerDiameter" :rules="numericGreater0Rules" step="0.01" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === starGrain">
                <v-text-field id="starPointDiameter" label="Star diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.pointDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="starPointCount" label="Number of branches" v-model="value.grainConfig.pointCount" :rules="nbBranchesRules" step="0.01" />
                <v-select id="starEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.grainConfig.endsSurface" />
            </v-flex>
            <v-flex lg12 md12 v-if="value.grainType === endBurnerGrain">
                <v-text-field id="endBurnerOuterDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="endBurnerSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" v-model="value.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="endBurnerHoleDiameter" label="Hole diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.holeDiameter" :rules="integerGreater0Rules" step="0.01" />
                <v-text-field id="endBurnerHoleDepth" label="Hole depth" :suffix="units.lengthUnit" v-model="value.grainConfig.holeDepth" :rules="numericGreater0Rules" step="0.01" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === moonBurner">
                <v-text-field id="moonBurnerOuterDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="moonBurnerCoreDiameter" label="Core diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.coreDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="moonBurnerCoreOffset" label="Core offset" :suffix="units.lengthUnit" v-model="value.grainConfig.coreOffset" :rules="numericGreaterOrEqualsThan0Rules" step="0.01" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === moonBurner">
                <v-text-field id="moonBurnerSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" v-model="value.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="moonBurnerNumberOfSegment" label="Number of segments" v-model="value.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                <v-select id="moonBurnerEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.grainConfig.endsSurface" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === cSlot">
                <v-text-field id="cSlotOuterDiameter" label="Grain outer diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.outerDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="cSlotCoreDiameter" label="Core diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.coreDiameter" :rules="numericGreaterOrEqualsThan0Rules" step="0.01" />
                <v-text-field id="cSlotSlotWidth" label="Slot width" :suffix="units.lengthUnit" v-model="value.grainConfig.slotWidth" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="cSlotSlotDepth" label="Slot depth" :suffix="units.lengthUnit" v-model="value.grainConfig.slotDepth" :rules="numericGreater0Rules" step="0.01" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === cSlot">
                <v-text-field id="cSlotSlotOffset" label="Slot offset" :suffix="units.lengthUnit" v-model="value.grainConfig.slotOffset" :rules="numericGreaterOrEqualsThan0Rules" step="0.01" />
                <v-text-field id="cSlotSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" v-model="value.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="cSlotNumberOfSegment" label="Number of segments" v-model="value.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                <v-select id="cSlotEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.grainConfig.endsSurface" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === rodTube">
                <v-text-field id="rodTubeRodDiameter" label="Rod diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.rodDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="rodTubeTubeOuterDiameter" label="Tube outer diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.tubeOuterDiameter" :rules="numericGreater0Rules" step="0.01" />
                <v-text-field id="rodTubeTubeInnerDiameter" label="Tube inner diameter" :suffix="units.lengthUnit" v-model="value.grainConfig.tubeInnerDiameter" :rules="numericGreater0Rules" step="0.01" />
            </v-flex>
            <v-flex lg6 md6 v-if="value.grainType === rodTube">
                <v-text-field id="rodTubeSegmentLength" label="Grain segment length" :suffix="units.lengthUnit" v-model="value.grainConfig.segmentLength" :rules="numericGreater0Rules" step="0.01"/>
                <v-text-field id="rodTubeNumberOfSegment" label="Number of segments" v-model="value.grainConfig.numberOfSegment" :rules="integerGreater0Rules" step="0.01" />
                <v-select id="rodTubeEndsSurface" label="Ends surface" :items="grainSurfaces" :rules="requiredRules" v-model="value.grainConfig.endsSurface" />
            </v-flex>
        </v-layout>
        <help-dialog ref="helpDialog"></help-dialog>
    </v-layout>
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
        value: Object,
        units: Object
    },
    data() {
        return {
            numericGreater0Rules: greaterThanRule(0),
            integerGreater0Rules: integerGreaterThanRule(0),
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
                { value: STAR, text: 'Star (not available)', disabled: true }],
            selectedGrain: null
        }
    },
    methods: {
        grainTypeChange() {
            if (this.value.grainType === HOLLOW) {
                // fix pour le bug qui ne rafraichi pas les inputs au changement de type de grain
                this.value.grainConfig = {
                    coreDiameter: null,
                    outerDiameter: null,
                    segmentLength: null,
                    numberOfSegment: null,
                    coreSurface: null,
                    endsSurface: null,
                    outerSurface: null
                }
            } else {
                this.value.grainConfig = {}
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
