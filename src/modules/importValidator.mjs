import Ajv from 'ajv'
import {
    C_SLOT,
    CUSTOM_PRPELLANT_PREFIX, END_BURNER,
    EXPOSED, FINOCYL, HOLLOW,
    INHIBITED,
    KNDX,
    KNER_COARSE,
    KNMN_COARSE,
    KNSB_COARSE,
    KNSB_FINE,
    KNSU, MOON_BURNER, ROD_TUBE, STAR
} from './grainsConstants'

export const LAST_VERSION = 2

export const ajvValidator = new Ajv({ useDefaults: true, coerceTypes: true })

export function validateImportVersion1(loadedConfig) {
    let validate = ajvValidator.validate(importVersion1ValidatorSchema, loadedConfig)
    if (!validate) {
        console.error('import V1 fail', ajvValidator.errors)
    }
    return validate
}

export function validateImportVersion2(loadedConfig) {
    let valide = false
    if (ajvValidator.validate(importVersion2ValidatorSchema, loadedConfig)) {
        let config = loadedConfig.configs[0]
        if (config.grainType === HOLLOW) {
            valide = ajvValidator.validate(hollowGrainConfigVersion2ValidatorSchema, config.grainConfig)
        } else if (config.grainType === FINOCYL) {
            valide = ajvValidator.validate(finocylGrainConfigVersion2ValidatorSchema, config.grainConfig)
        } else if (config.grainType === STAR) {
            valide = ajvValidator.validate(starGrainConfigVersion2ValidatorSchema, config.grainConfig)
        } else if (config.grainType === END_BURNER) {
            valide = ajvValidator.validate(endBurnerGrainConfigVersion2ValidatorSchema, config.grainConfig)
        } else if (config.grainType === MOON_BURNER) {
            valide = ajvValidator.validate(moonBurnerGrainConfigVersion2ValidatorSchema, config.grainConfig)
        } else if (config.grainType === C_SLOT) {
            valide = ajvValidator.validate(cSlotGrainConfigVersion2ValidatorSchema, config.grainConfig)
        } else if (config.grainType === ROD_TUBE) {
            valide = ajvValidator.validate(rodTubeGrainConfigVersion2ValidatorSchema, config.grainConfig)
        } else {
            valide = false
        }
    }
    if (!valide) {
        console.error('import V2 fail', ajvValidator.errors)
    }
    return valide
}

const propellantPattern = '(^((' + KNDX + ')|(' + KNER_COARSE + ')|(' + KNMN_COARSE + ')|(' + KNSB_COARSE + ')|(' + KNSB_FINE + ')|(' + KNSU + '))$)|(^' + CUSTOM_PRPELLANT_PREFIX + ')'
const grainSurfacePattern = '^((' + INHIBITED + ')|(' + EXPOSED + '))$'
const unitsPattern = '^((SI)|(IMPERIAL))$'
const grainTypePattern = '^((' + HOLLOW + ')|(' + FINOCYL + ')|(' + STAR + ')|(' + END_BURNER + ')|(' + MOON_BURNER + ')|(' + C_SLOT + ')|(' + ROD_TUBE + '))$'

export const importVersion2ValidatorSchema = {
    type: 'object',
    properties: {
        version: { type: 'number', minimum: 2, maximum: 2 },
        measureUnit: {
            type: 'string',
            default: 'SI',
            pattern: unitsPattern
        },
        configs: {
            type: 'array',
            minItems: 1,
            maxItems: 1,
            items: {
                type: 'object',
                properties: {
                    throatDiameter: { type: 'number' },
                    chamberInnerDiameter: { type: 'number' },
                    chamberLength: { type: 'number' },
                    propellantType: {
                        type: 'string',
                        pattern: propellantPattern
                    },
                    extraConfig: {
                        type: 'object',
                        properties: {
                            densityRatio: { type: 'number' },
                            nozzleErosionInMillimeter: { type: 'number' },
                            combustionEfficiencyRatio: { type: 'number' },
                            ambiantPressureInMPa: { type: 'number' },
                            erosiveBurningAreaRatioThreshold: { type: 'number' },
                            erosiveBurningVelocityCoefficient: { type: 'number' },
                            nozzleEfficiency: { type: 'number' },
                            nozzleExpansionRatio: { type: ['number', 'null'] },
                            optimalNozzleDesign: { type: 'boolean' }
                        },
                        required: [
                            'densityRatio',
                            'nozzleErosionInMillimeter',
                            'combustionEfficiencyRatio',
                            'ambiantPressureInMPa',
                            'erosiveBurningAreaRatioThreshold',
                            'erosiveBurningVelocityCoefficient',
                            'nozzleEfficiency',
                            'nozzleExpansionRatio',
                            'optimalNozzleDesign'
                        ]
                    },
                    nozzleDesign: {
                        type: 'object',
                        properties: {
                            divergenceAngle: { type: 'number', minimum: 1, maximum: 90 },
                            convergenceAngle: { type: 'number', minimum: 1, maximum: 90 }
                        },
                        required: [
                            'divergenceAngle',
                            'convergenceAngle'
                        ]
                    },
                    grainType: {
                        type: 'string',
                        pattern: grainTypePattern
                    },
                    grainConfig: {
                        type: 'object'
                    }
                },
                required: [
                    'throatDiameter',
                    'chamberInnerDiameter',
                    'propellantType',
                    'chamberLength',
                    'extraConfig',
                    'grainType',
                    'grainConfig'
                ]
            }
        }
    },
    required: [
        'version', 'configs'
    ]
}

export const hollowGrainConfigVersion2ValidatorSchema = {
    type: 'object',
    properties: {
        outerDiameter: { type: 'number' },
        coreDiameter: { type: 'number' },
        segmentLength: { type: 'number' },
        numberOfSegment: { type: 'number' },
        outerSurface: { type: 'string', pattern: grainSurfacePattern },
        endsSurface: { type: 'string', pattern: grainSurfacePattern },
        coreSurface: { type: 'string', pattern: grainSurfacePattern }
    },
    required: [
        'outerDiameter',
        'coreDiameter',
        'segmentLength',
        'numberOfSegment',
        'outerSurface',
        'endsSurface',
        'coreSurface'
    ]
}

export const finocylGrainConfigVersion2ValidatorSchema = {
    type: 'object',
    properties: {
        segmentLength: { type: 'number' },
        numberOfSegment: { type: 'number' },
        outerDiameter: { type: 'number' },
        innerDiameter: { type: 'number' },
        finWidth: { type: 'number' },
        finDiameter: { type: 'number' },
        finCount: { type: 'number' },
        endsSurface: { type: 'string', pattern: grainSurfacePattern }
    },
    required: [
        'segmentLength',
        'numberOfSegment',
        'outerDiameter',
        'innerDiameter',
        'finWidth',
        'finDiameter',
        'finCount',
        'endsSurface'
    ]
}

export const starGrainConfigVersion2ValidatorSchema = {
    type: 'object',
    properties: {
        segmentLength: { type: 'number' },
        numberOfSegment: { type: 'number' },
        outerDiameter: { type: 'number' },
        innerDiameter: { type: 'number' },
        pointDiameter: { type: 'number' },
        pointCount: { type: 'number' },
        endsSurface: { type: 'string', pattern: grainSurfacePattern }
    },
    required: [
        'segmentLength',
        'numberOfSegment',
        'outerDiameter',
        'innerDiameter',
        'pointDiameter',
        'pointCount',
        'endsSurface'
    ]
}

export const endBurnerGrainConfigVersion2ValidatorSchema = {
    type: 'object',
    properties: {
        segmentLength: { type: 'number' },
        outerDiameter: { type: 'number' },
        holeDiameter: { type: 'number' },
        holeDepth: { type: 'number' }
    },
    required: [
        'segmentLength',
        'outerDiameter',
        'holeDiameter',
        'holeDepth'
    ]
}

export const moonBurnerGrainConfigVersion2ValidatorSchema = {
    type: 'object',
    properties: {
        segmentLength: { type: 'number' },
        numberOfSegment: { type: 'number' },
        outerDiameter: { type: 'number' },
        coreDiameter: { type: 'number' },
        coreOffset: { type: 'number' },
        endsSurface: { type: 'string', pattern: grainSurfacePattern }
    },
    required: [
        'segmentLength',
        'numberOfSegment',
        'outerDiameter',
        'coreDiameter',
        'coreOffset',
        'endsSurface'
    ]
}

export const cSlotGrainConfigVersion2ValidatorSchema = {
    type: 'object',
    properties: {
        segmentLength: { type: 'number' },
        numberOfSegment: { type: 'number' },
        outerDiameter: { type: 'number' },
        coreDiameter: { type: 'number' },
        slotWidth: { type: 'number' },
        slotDepth: { type: 'number' },
        slotOffset: { type: 'number' },
        endsSurface: { type: 'string', pattern: grainSurfacePattern }
    },
    required: [
        'segmentLength',
        'numberOfSegment',
        'outerDiameter',
        'coreDiameter',
        'slotWidth',
        'slotDepth',
        'slotOffset',
        'endsSurface'
    ]
}

export const rodTubeGrainConfigVersion2ValidatorSchema = {
    type: 'object',
    properties: {
        segmentLength: { type: 'number' },
        numberOfSegment: { type: 'number' },
        rodDiameter: { type: 'number' },
        tubeOuterDiameter: { type: 'number' },
        tubeInnerDiameter: { type: 'number' },
        endsSurface: { type: 'string', pattern: grainSurfacePattern }
    },
    required: [
        'segmentLength',
        'numberOfSegment',
        'rodDiameter',
        'tubeOuterDiameter',
        'tubeInnerDiameter',
        'endsSurface'
    ]
}

export const importVersion1ValidatorSchema = {
    type: 'object',
    properties: {
        version: { type: 'number', minimum: 1, maximum: 1 },
        measureUnit: {
            type: 'string',
            default: 'SI',
            pattern: unitsPattern
        },
        configs: {
            type: 'array',
            minItems: 1,
            maxItems: 1,
            items: {
                type: 'object',
                properties: {
                    throatDiameter: { type: 'number' },
                    outerDiameter: { type: 'number' },
                    coreDiameter: { type: 'number' },
                    segmentLength: { type: 'number' },
                    numberOfSegment: { type: 'number' },
                    outerSurface: { type: 'string', pattern: grainSurfacePattern },
                    endsSurface: { type: 'string', pattern: grainSurfacePattern },
                    coreSurface: { type: 'string', pattern: grainSurfacePattern },
                    propellantType: {
                        type: 'string',
                        pattern: propellantPattern
                    },
                    chamberInnerDiameter: { type: 'number' },
                    chamberLength: { type: 'number' },
                    extraConfig: {
                        type: 'object',
                        properties: {
                            densityRatio: { type: 'number' },
                            nozzleErosionInMillimeter: { type: 'number' },
                            combustionEfficiencyRatio: { type: 'number' },
                            ambiantPressureInMPa: { type: 'number' },
                            erosiveBurningAreaRatioThreshold: { type: 'number' },
                            erosiveBurningVelocityCoefficient: { type: 'number' },
                            nozzleEfficiency: { type: 'number' },
                            nozzleExpansionRatio: { type: ['number', 'null'] },
                            optimalNozzleDesign: { type: 'boolean' }
                        },
                        required: [
                            'densityRatio',
                            'nozzleErosionInMillimeter',
                            'combustionEfficiencyRatio',
                            'ambiantPressureInMPa',
                            'erosiveBurningAreaRatioThreshold',
                            'erosiveBurningVelocityCoefficient',
                            'nozzleEfficiency',
                            'nozzleExpansionRatio',
                            'optimalNozzleDesign'
                        ]
                    },
                    nozzleDesign: {
                        type: 'object',
                        properties: {
                            divergenceAngle: { type: 'number', minimum: 1, maximum: 90 },
                            convergenceAngle: { type: 'number', minimum: 1, maximum: 90 }
                        },
                        required: [
                            'divergenceAngle',
                            'convergenceAngle'
                        ]
                    }
                },
                required: [
                    'throatDiameter',
                    'outerDiameter',
                    'coreDiameter',
                    'segmentLength',
                    'numberOfSegment',
                    'outerSurface',
                    'endsSurface',
                    'coreSurface',
                    'propellantType',
                    'chamberInnerDiameter',
                    'chamberLength',
                    'extraConfig'
                ]
            }
        }
    },
    required: [
        'version', 'configs'
    ]
}
