import Ajv from 'ajv'
import {
    CUSTOM_PRPELLANT_PREFIX,
    EXPOSED,
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
    return ajvValidator.validate(importVersion1ValidatorSchema, loadedConfig)
}

export function validateImportVersion2(loadedConfig) {
    return ajvValidator.validate(importVersion2ValidatorSchema, loadedConfig)
}

const propellantPattern = '(^((' + KNDX + ')|(' + KNER_COARSE + ')|(' + KNMN_COARSE + ')|(' + KNSB_COARSE + ')|(' + KNSB_FINE + ')|(' + KNSU + '))$)|(^' + CUSTOM_PRPELLANT_PREFIX + ')'
const grainSurfacePattern = '^((' + INHIBITED + ')|(' + EXPOSED + '))$'

export const importVersion2ValidatorSchema = {
    type: 'object',
    properties: {
        version: { type: 'number', minimum: 2, maximum: 2 },
        measureUnit: {
            type: 'string',
            default: 'SI',
            pattern: '^((SI)|(IMPERIAL))$'
        },
        configs: {
            type: 'array',
            minItems: 1,
            maxItems: 1,
            items: {
                type: 'object',
                properties: {
                    throatDiameter: { type: 'number' },
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
export const importVersion1ValidatorSchema = {
    type: 'object',
    properties: {
        version: { type: 'number', minimum: 1, maximum: 1 },
        measureUnit: {
            type: 'string',
            default: 'SI',
            pattern: '^((SI)|(IMPERIAL))$'
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
