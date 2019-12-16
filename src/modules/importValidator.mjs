import Ajv from 'ajv'
import {
    CUSTOM_PRPELLANT_PREFIX,
    EXPOSED, FINOCYL, HOLLOW,
    INHIBITED,
    KNDX,
    KNER_COARSE,
    KNMN_COARSE,
    KNSB_COARSE,
    KNSB_FINE,
    KNSU
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
const grainTypePattern = '^((' + HOLLOW + ')|(' + FINOCYL + '))$'

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
