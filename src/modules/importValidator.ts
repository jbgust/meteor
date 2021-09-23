import Ajv from 'ajv'
import {
    C_SLOT,
    CUSTOM_PROPELLANT_PREFIX, END_BURNER,
    EXPOSED, FINOCYL, HOLLOW,
    INHIBITED,
    KNDX,
    KNER_COARSE,
    KNMN_COARSE,
    KNSB_COARSE,
    KNSB_FINE,
    KNSU, MOON_BURNER, ROD_TUBE, STAR
} from './grainsConstants'

export const LAST_VERSION = 3

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
        valide = validateGrainConfig(config)
    }
    if (!valide) {
        console.error('import V2 fail', ajvValidator.errors)
    }
    return valide
}

function validateGrainConfig(loadedConfig) {
    let valide:any = false
    if (loadedConfig.grainType === HOLLOW) {
        valide = ajvValidator.validate(hollowGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)
    } else if (loadedConfig.grainType === FINOCYL) {
        valide = ajvValidator.validate(finocylGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)
    } else if (loadedConfig.grainType === STAR) {
        valide = ajvValidator.validate(starGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)
    } else if (loadedConfig.grainType === END_BURNER) {
        valide = ajvValidator.validate(endBurnerGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)
    } else if (loadedConfig.grainType === MOON_BURNER) {
        valide = ajvValidator.validate(moonBurnerGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)
    } else if (loadedConfig.grainType === C_SLOT) {
        valide = ajvValidator.validate(cSlotGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)
    } else if (loadedConfig.grainType === ROD_TUBE) {
        valide = ajvValidator.validate(rodTubeGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)
    } else {
        valide = false
    }
    return valide
}

export function validateImportVersion3(loadedConfig) {
    let valide = false
    if (ajvValidator.validate(importVersion3ValidatorSchema, loadedConfig)) {
        valide = validateGrainConfig(loadedConfig)
    } else {
        console.warn('V3 validation failed')
    }
    if (!valide) {
        console.error('import V3 fail', ajvValidator.errors)
    }
    return valide
}

export function convertFromVersion2ToVersion3(loadedConfig) {
    if (loadedConfig.version === 2) {
        let configV3 = {
            version: 3,
            measureUnit: loadedConfig.measureUnit,
            ...loadedConfig.configs[0]
        }

        let customPropellant = loadedConfig.configs[0].customPropellant
        if (!customPropellant) {
            configV3.propellantId = loadedConfig.configs[0].propellantType
        } else {
            customPropellant.unit = loadedConfig.measureUnit
            configV3.propellantId = 'TO BE DEFINED DURING IMPORT PROCESS'
        }
        delete configV3.propellantType
        delete configV3.computationHash

        delete configV3.customPropellant
        delete configV3.name

        return { motor: configV3, customPropellant: customPropellant, name: loadedConfig.configs[0].name }
    }
}

export function convertFromVersion1ToVersion2(loadedConfig) {
    if (loadedConfig.version === 1) {
        // Convert to V2 format
        loadedConfig.version = 2
        loadedConfig.configs[0].grainType = 'HOLLOW'
        loadedConfig.configs[0].grainConfig = {
            outerDiameter: loadedConfig.configs[0].outerDiameter,
            coreDiameter: loadedConfig.configs[0].coreDiameter,
            segmentLength: loadedConfig.configs[0].segmentLength,
            numberOfSegment: loadedConfig.configs[0].numberOfSegment,
            outerSurface: loadedConfig.configs[0].outerSurface,
            endsSurface: loadedConfig.configs[0].endsSurface,
            coreSurface: loadedConfig.configs[0].coreSurface
        }
        delete loadedConfig.configs[0].outerDiameter
        delete loadedConfig.configs[0].coreDiameter
        delete loadedConfig.configs[0].segmentLength
        delete loadedConfig.configs[0].numberOfSegment
        delete loadedConfig.configs[0].outerSurface
        delete loadedConfig.configs[0].endsSurface
        delete loadedConfig.configs[0].coreSurface
    }
}

const propellantPattern = '(^((' + KNDX + ')|(' + KNER_COARSE + ')|(' + KNMN_COARSE + ')|(' + KNSB_COARSE + ')|(' + KNSB_FINE + ')|(' + KNSU + '))$)|(^' + CUSTOM_PROPELLANT_PREFIX + ')'
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

export const importVersion3ValidatorSchema = {
    type: 'object',
    properties: {
        version: { type: 'number', minimum: 3, maximum: 3 },
        measureUnit: {
            type: 'string',
            default: 'SI',
            pattern: unitsPattern
        },
        throatDiameter: { type: 'number' },
        chamberInnerDiameter: { type: 'number' },
        chamberLength: { type: 'number' },
        propellantId: { type: 'string' },
        customPropellant: { type: 'string' },
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
        'version',
        'throatDiameter',
        'chamberInnerDiameter',
        'chamberLength',
        'propellantId',
        'extraConfig',
        'grainType',
        'grainConfig'
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
