import {
    validateImportVersion2,
    ajvValidator,
    finocylGrainConfigVersion2ValidatorSchema,
    hollowGrainConfigVersion2ValidatorSchema,
    starGrainConfigVersion2ValidatorSchema,
    endBurnerGrainConfigVersion2ValidatorSchema,
    moonBurnerGrainConfigVersion2ValidatorSchema,
    cSlotGrainConfigVersion2ValidatorSchema,
    rodTubeGrainConfigVersion2ValidatorSchema,
    convertFromVersion1ToVersion2
} from '../../src/modules/importValidator'
import {
    C_SLOT,
    END_BURNER,
    EXPOSED,
    FINOCYL,
    HOLLOW,
    INHIBITED,
    KNDX,
    MOON_BURNER, ROD_TUBE,
    STAR
} from '../../src/modules/grainsConstants'
import { createVersion1JsonConfig } from './importValidatorVersion1.spec'
import { SI_UNITS } from '../../src/modules/computationUtils'

export function createVersion2FinocylJsonConfig() {
    const validJsonV2 = {
        version: 2,
        configs: [
            {
                throatDiameter: 10,
                chamberInnerDiameter: 40,
                chamberLength: 150,
                propellantType: 'KNSU',
                extraConfig: {
                    densityRatio: 0.96,
                    nozzleErosionInMillimeter: 0,
                    combustionEfficiencyRatio: 0.97,
                    ambiantPressureInMPa: 0.101,
                    erosiveBurningAreaRatioThreshold: 6,
                    erosiveBurningVelocityCoefficient: 0,
                    nozzleEfficiency: 0.85,
                    nozzleExpansionRatio: 8,
                    optimalNozzleDesign: false
                },
                grainType: FINOCYL,
                grainConfig: {
                    segmentLength: 70,
                    numberOfSegment: 2,
                    outerDiameter: 30,
                    innerDiameter: 10,
                    finWidth: 2.0,
                    finDiameter: 20.0,
                    finCount: 5,
                    endsSurface: EXPOSED
                },
                nozzleDesign: {
                    divergenceAngle: 18,
                    convergenceAngle: 38
                }
            }
        ]
    }
    return Object.assign(validJsonV2)
}

function createVersion2StarJsonConfig() {
    const validJsonV2 = {
        version: 2,
        configs: [
            {
                throatDiameter: 10,
                chamberInnerDiameter: 40,
                chamberLength: 150,
                propellantType: 'KNSU',
                extraConfig: {
                    densityRatio: 0.96,
                    nozzleErosionInMillimeter: 0,
                    combustionEfficiencyRatio: 0.97,
                    ambiantPressureInMPa: 0.101,
                    erosiveBurningAreaRatioThreshold: 6,
                    erosiveBurningVelocityCoefficient: 0,
                    nozzleEfficiency: 0.85,
                    nozzleExpansionRatio: 8,
                    optimalNozzleDesign: false
                },
                grainType: STAR,
                grainConfig: {
                    outerDiameter: 30,
                    segmentLength: 70,
                    numberOfSegment: 2,
                    innerDiameter: 5,
                    pointDiameter: 15,
                    pointCount: 5,
                    endsSurface: EXPOSED
                },
                nozzleDesign: {
                    divergenceAngle: 18,
                    convergenceAngle: 38
                }
            }
        ]
    }
    return Object.assign(validJsonV2)
}

function createVersion2EndBurnerJsonConfig() {
    const validJsonV2 = {
        version: 2,
        configs: [
            {
                throatDiameter: 6,
                chamberInnerDiameter: 40,
                chamberLength: 75,
                propellantType: 'KNSU',
                extraConfig: {
                    densityRatio: 0.96,
                    nozzleErosionInMillimeter: 0,
                    combustionEfficiencyRatio: 0.97,
                    ambiantPressureInMPa: 0.101,
                    erosiveBurningAreaRatioThreshold: 6,
                    erosiveBurningVelocityCoefficient: 0,
                    nozzleEfficiency: 0.85,
                    nozzleExpansionRatio: 8,
                    optimalNozzleDesign: false
                },
                grainType: END_BURNER,
                grainConfig: {
                    outerDiameter: 30,
                    segmentLength: 70,
                    holeDiameter: 10,
                    holeDepth: 10
                },
                nozzleDesign: {
                    divergenceAngle: 18,
                    convergenceAngle: 38
                }
            }
        ]
    }
    return Object.assign(validJsonV2)
}

function createVersion2MoonBurnerJsonConfig() {
    const validJsonV2 = {
        version: 2,
        configs: [
            {
                throatDiameter: 10,
                chamberInnerDiameter: 40,
                chamberLength: 75,
                propellantType: 'KNSU',
                extraConfig: {
                    densityRatio: 0.96,
                    nozzleErosionInMillimeter: 0,
                    combustionEfficiencyRatio: 0.97,
                    ambiantPressureInMPa: 0.101,
                    erosiveBurningAreaRatioThreshold: 6,
                    erosiveBurningVelocityCoefficient: 0,
                    nozzleEfficiency: 0.85,
                    nozzleExpansionRatio: 8,
                    optimalNozzleDesign: false
                },
                grainType: MOON_BURNER,
                grainConfig: {
                    outerDiameter: 30,
                    segmentLength: 80,
                    numberOfSegment: 1,
                    coreDiameter: 70,
                    coreOffset: 10,
                    endsSurface: EXPOSED
                },
                nozzleDesign: {
                    divergenceAngle: 18,
                    convergenceAngle: 38
                }
            }
        ]
    }
    return Object.assign(validJsonV2)
}

function createVersion2CSlotJsonConfig() {
    const validJsonV2 = {
        version: 2,
        configs: [
            {
                throatDiameter: 10,
                chamberInnerDiameter: 40,
                chamberLength: 75,
                propellantType: 'KNSU',
                extraConfig: {
                    densityRatio: 0.96,
                    nozzleErosionInMillimeter: 0,
                    combustionEfficiencyRatio: 0.97,
                    ambiantPressureInMPa: 0.101,
                    erosiveBurningAreaRatioThreshold: 6,
                    erosiveBurningVelocityCoefficient: 0,
                    nozzleEfficiency: 0.85,
                    nozzleExpansionRatio: 8,
                    optimalNozzleDesign: false
                },
                grainType: C_SLOT,
                grainConfig: {
                    outerDiameter: 30,
                    segmentLength: 80,
                    numberOfSegment: 1,
                    coreDiameter: 10,
                    slotWidth: 12,
                    slotDepth: 5,
                    slotOffset: 3,
                    endsSurface: EXPOSED
                },
                nozzleDesign: {
                    divergenceAngle: 18,
                    convergenceAngle: 38
                }
            }
        ]
    }
    return Object.assign(validJsonV2)
}

function createVersion2RodTubeJsonConfig() {
    const validJsonV2 = {
        version: 2,
        configs: [
            {
                throatDiameter: 10,
                chamberInnerDiameter: 40,
                chamberLength: 75,
                propellantType: 'KNSU',
                extraConfig: {
                    densityRatio: 0.96,
                    nozzleErosionInMillimeter: 0,
                    combustionEfficiencyRatio: 0.97,
                    ambiantPressureInMPa: 0.101,
                    erosiveBurningAreaRatioThreshold: 6,
                    erosiveBurningVelocityCoefficient: 0,
                    nozzleEfficiency: 0.85,
                    nozzleExpansionRatio: 8,
                    optimalNozzleDesign: false
                },
                grainType: ROD_TUBE,
                grainConfig: {
                    rodDiameter: 10,
                    segmentLength: 80,
                    numberOfSegment: 1,
                    tubeOuterDiameter: 30,
                    tubeInnerDiameter: 20,
                    endsSurface: EXPOSED
                },
                nozzleDesign: {
                    divergenceAngle: 18,
                    convergenceAngle: 38
                }
            }
        ]
    }
    return Object.assign(validJsonV2)
}

function createVersion2HollowJsonConfig() {
    const validJsonV2 = {
        version: 2,
        configs: [
            {
                throatDiameter: 10,
                chamberInnerDiameter: 40,
                chamberLength: 150,
                propellantType: 'KNSU',
                extraConfig: {
                    densityRatio: 0.96,
                    nozzleErosionInMillimeter: 0,
                    combustionEfficiencyRatio: 0.97,
                    ambiantPressureInMPa: 0.101,
                    erosiveBurningAreaRatioThreshold: 6,
                    erosiveBurningVelocityCoefficient: 0,
                    nozzleEfficiency: 0.85,
                    nozzleExpansionRatio: 8,
                    optimalNozzleDesign: false
                },
                grainType: HOLLOW,
                grainConfig: {
                    outerDiameter: 28,
                    coreDiameter: 14,
                    segmentLength: 80,
                    numberOfSegment: 1,
                    outerSurface: INHIBITED,
                    endsSurface: INHIBITED,
                    coreSurface: EXPOSED
                },
                nozzleDesign: {
                    divergenceAngle: 18,
                    convergenceAngle: 38
                }
            }
        ]
    }
    return Object.assign(validJsonV2)
}

function assertAjvError(dataPath, message = false, params = false) {
    expect(ajvValidator.errors[0].dataPath).toBe(dataPath)
    if (message) {
        expect(ajvValidator.errors[0].message).toBe(message)
    }

    if (params) {
        expect(ajvValidator.errors[0].params[params.field]).toBe(params.value)
    }
}

describe('Import Version 2Validation', () => {
    test('Convert form V1 to V2', () => {
        let loadedConfig = createVersion1JsonConfig()
        convertFromVersion1ToVersion2(loadedConfig)
        expect(validateImportVersion2(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(hollowGrainConfigVersion2ValidatorSchema, loadedConfig.configs[0].grainConfig)).toBeTruthy()
    })

    test('should check finocyl grain config', () => {
        expect(ajvValidator.validate(finocylGrainConfigVersion2ValidatorSchema, createVersion2FinocylJsonConfig().configs[0].grainConfig)).toBeTruthy()
    })

    test('should check star grain config', () => {
        let loadedConfig = createVersion2StarJsonConfig()
        expect(validateImportVersion2(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(starGrainConfigVersion2ValidatorSchema, loadedConfig.configs[0].grainConfig)).toBeTruthy()
    })

    test('should check end burner grain config', () => {
        let loadedConfig = createVersion2EndBurnerJsonConfig()
        expect(validateImportVersion2(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(endBurnerGrainConfigVersion2ValidatorSchema, loadedConfig.configs[0].grainConfig)).toBeTruthy()
    })

    test('should check moon burner grain config', () => {
        let loadedConfig = createVersion2MoonBurnerJsonConfig()
        expect(validateImportVersion2(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(moonBurnerGrainConfigVersion2ValidatorSchema, loadedConfig.configs[0].grainConfig)).toBeTruthy()
    })

    test('should check C slot grain config', () => {
        let loadedConfig = createVersion2CSlotJsonConfig()
        expect(validateImportVersion2(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(cSlotGrainConfigVersion2ValidatorSchema, loadedConfig.configs[0].grainConfig)).toBeTruthy()
    })

    test('should check rod tube grain config', () => {
        let loadedConfig = createVersion2RodTubeJsonConfig()
        expect(validateImportVersion2(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(rodTubeGrainConfigVersion2ValidatorSchema, loadedConfig.configs[0].grainConfig)).toBeTruthy()
    })

    test('should check hollow grain config', () => {
        expect(ajvValidator.validate(hollowGrainConfigVersion2ValidatorSchema, createVersion2HollowJsonConfig().configs[0].grainConfig)).toBeTruthy()
    })

    test('should import valid JSON', () => {
        expect(validateImportVersion2(createVersion2FinocylJsonConfig())).toBeTruthy()
    })

    test('should not import invalid  grain type', () => {
        let loadedConfig = createVersion2FinocylJsonConfig()
        loadedConfig.configs[0].grainType = 'NEW-GRAIN-TYPE'

        expect(validateImportVersion2(loadedConfig)).toBeFalsy()
        assertAjvError('.configs[0].grainType')
    })

    test('should not import when grain type missing', () => {
        let loadedConfig = createVersion2FinocylJsonConfig()
        delete loadedConfig.configs[0].grainType

        expect(validateImportVersion2(loadedConfig)).toBeFalsy()
        assertAjvError('.configs[0]')
    })

    test('should not import invalid grain config', () => {
        let loadedConfig = createVersion2FinocylJsonConfig()
        delete loadedConfig.configs[0].grainConfig.finCount

        expect(validateImportVersion2(loadedConfig)).toBeFalsy()
    })

    test('should not import when finocyl grain config invalid', () => {
        let loadedConfig = createVersion2FinocylJsonConfig()
        delete loadedConfig.configs[0].grainConfig.finCount

        expect(validateImportVersion2(loadedConfig)).toBeFalsy()
        assertAjvError('', "should have required property 'finCount'")
    })

    test('should not import when hollow grain config invalid', () => {
        let loadedConfig = createVersion2HollowJsonConfig()
        delete loadedConfig.configs[0].grainConfig.coreDiameter

        expect(validateImportVersion2(loadedConfig)).toBeFalsy()
        assertAjvError('', "should have required property 'coreDiameter'")
    })

    test('should not import version 1 JSON', () => {
        expect(validateImportVersion2(createVersion1JsonConfig())).toBeFalsy()
        assertAjvError('.version')
    })

    test('should not import invalid propellant', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()
        jsonToValidate.configs[0].propellantType = 'KNDXx'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].propellantType = 'xKNDX'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].propellantType = 'kndx'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        assertAjvError('.configs[0].propellantType')
    })

    test('should import custom propellant', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()
        jsonToValidate.configs[0].propellantType = 'CUSTOM_idPropellant'
        expect(validateImportVersion2(jsonToValidate)).toBeTruthy()

        jsonToValidate.configs[0].propellantType = 'custom_'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].propellantType = 'xCUSTOM_'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        assertAjvError('.configs[0].propellantType')
    })

    test('should not import invalid finocyl surface', () => {
        let jsonToValidate = createVersion2FinocylJsonConfig()
        jsonToValidate.configs[0].grainConfig.endsSurface = 'INHIBITEDd'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].grainConfig.endsSurface = 'sINHIBITED'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].grainConfig.endsSurface = 'inhibited'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        assertAjvError('.endsSurface')
    })

    test('should not import invalid hollow core surface', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()
        jsonToValidate.configs[0].grainConfig.coreSurface = 'INHIBITEDd'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].grainConfig.coreSurface = 'sINHIBITED'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].grainConfig.coreSurface = 'inhibited'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        assertAjvError('.coreSurface')
    })

    test('should not import invalid hollow end surface', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()
        jsonToValidate.configs[0].grainConfig.endsSurface = 'INHIBITEDd'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].grainConfig.endsSurface = 'sINHIBITED'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].grainConfig.endsSurface = 'inhibited'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        assertAjvError('.endsSurface')
    })

    test('should not import invalid hollow outer surface', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()
        jsonToValidate.configs[0].grainConfig.outerSurface = 'INHIBITEDd'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].grainConfig.outerSurface = 'sINHIBITED'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].grainConfig.outerSurface = 'inhibited'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        assertAjvError('.outerSurface')
    })

    test('should not import invalid version', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()
        jsonToValidate.version = 3
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.version = 0
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.version = 'fd'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        assertAjvError('.version', 'should be number')
    })

    test('should not import multi configs', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()
        jsonToValidate.configs.push({})
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()
        assertAjvError('.configs')
    })

    test('should import configs without nozzleDesign', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()
        delete jsonToValidate.configs[0].nozzleDesign
        expect(validateImportVersion2(jsonToValidate)).toBeTruthy()
    })

    test('should import measure unit', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()
        jsonToValidate.measureUnit = 'IMPERIAL'
        expect(validateImportVersion2(jsonToValidate)).toBeTruthy()
        expect(jsonToValidate.measureUnit).toBe('IMPERIAL')
    })

    test('should replace invalid measure unit with SI', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()
        jsonToValidate.measureUnit = 'xSI'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.measureUnit = 'IMPERIALx'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()

        jsonToValidate.measureUnit = 'imperial'
        expect(validateImportVersion2(jsonToValidate)).toBeFalsy()
    })

    test('should use SI as default measure unit', () => {
        let jsonToValidate = createVersion2HollowJsonConfig()

        expect(jsonToValidate.measureUnit).toBeUndefined()
        expect(validateImportVersion2(jsonToValidate)).toBeTruthy()
        expect(jsonToValidate.measureUnit).toBe(SI_UNITS)
    })

    test('should coerceTypes', () => {
        const validJson = {
            version: 2,
            configs: [
                {
                    throatDiameter: '17.39',
                    propellantType: 'KNDX',
                    chamberInnerDiameter: '75',
                    chamberLength: '470',
                    extraConfig: {
                        densityRatio: '0.95',
                        nozzleErosionInMillimeter: '0',
                        combustionEfficiencyRatio: '0.95',
                        ambiantPressureInMPa: '0.101',
                        erosiveBurningAreaRatioThreshold: '6',
                        erosiveBurningVelocityCoefficient: '0',
                        nozzleEfficiency: '0.85',
                        nozzleExpansionRatio: '8',
                        optimalNozzleDesign: 'true'
                    },
                    grainType: HOLLOW,
                    grainConfig: {
                        outerDiameter: '69',
                        coreDiameter: '20',
                        segmentLength: '115',
                        numberOfSegment: '4',
                        outerSurface: INHIBITED,
                        endsSurface: EXPOSED,
                        coreSurface: EXPOSED
                    },
                    nozzleDesign: {
                        divergenceAngle: '18',
                        convergenceAngle: '38'
                    }
                }
            ]
        }
        expect(validateImportVersion2(validJson)).toBeTruthy()
    })

    test('should failed when version is missing', () => {
        expect(validateImportVersion2({})).toBeFalsy()
        assertAjvError('', 'should have required property \'version\'', { field: 'missingProperty', value: 'version' })
    })

    test('should failed when configs is missing', () => {
        expect(validateImportVersion2({ version: 2 })).toBeFalsy()
        assertAjvError('', 'should have required property \'configs\'', { field: 'missingProperty', value: 'configs' })
    })

    test('should failed when required fields are missing in configs', () => {
        let json = { version: 2, configs: [{}] }
        const fieldsValues = {
            throatDiameter: 1,
            chamberInnerDiameter: '2',
            chamberLength: '9',
            propellantType: KNDX,
            extraConfig: {
                densityRatio: 0.96,
                nozzleErosionInMillimeter: 0,
                combustionEfficiencyRatio: 0.97,
                ambiantPressureInMPa: 0.101,
                erosiveBurningAreaRatioThreshold: 6,
                erosiveBurningVelocityCoefficient: 0,
                nozzleEfficiency: 0.85,
                nozzleExpansionRatio: 8,
                optimalNozzleDesign: false
            },
            grainType: HOLLOW,
            grainConfig: {}
        }
        let requiredFields = [
            'throatDiameter',
            'chamberInnerDiameter',
            'chamberLength',
            'propellantType',
            'extraConfig',
            'grainType',
            'grainConfig'
        ]
        requiredFields.forEach(field => {
            expect(validateImportVersion2(json)).toBeFalsy()
            assertAjvError('.configs[0]', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json.configs[0][field] = fieldsValues[field]
        })
    })

    test('should failed when required fields are missing in hollow grain', () => {
        let json = { }
        const fieldsValues = {
            outerDiameter: 28,
            coreDiameter: 14,
            segmentLength: 80,
            numberOfSegment: 1,
            outerSurface: INHIBITED,
            endsSurface: INHIBITED,
            coreSurface: EXPOSED
        }
        let requiredFields = [
            'outerDiameter',
            'coreDiameter',
            'segmentLength',
            'numberOfSegment',
            'outerSurface',
            'endsSurface',
            'coreSurface'
        ]
        requiredFields.forEach(field => {
            expect(ajvValidator.validate(hollowGrainConfigVersion2ValidatorSchema, json)).toBeFalsy()
            assertAjvError('', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json[field] = fieldsValues[field]
        })
    })

    test('should failed when required fields are missing in finocyl grain', () => {
        let json = { }
        const fieldsValues = {
            segmentLength: 70,
            numberOfSegment: 2,
            outerDiameter: 30,
            innerDiameter: 10,
            finWidth: 2.0,
            finDiameter: 20.0,
            finCount: 5,
            endsSurface: EXPOSED
        }
        let requiredFields = [
            'segmentLength',
            'numberOfSegment',
            'outerDiameter',
            'innerDiameter',
            'finWidth',
            'finDiameter',
            'finCount',
            'endsSurface'
        ]
        requiredFields.forEach(field => {
            expect(ajvValidator.validate(finocylGrainConfigVersion2ValidatorSchema, json)).toBeFalsy()
            assertAjvError('', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json[field] = fieldsValues[field]
        })
    })

    test('should failed when required fields are missing in star grain', () => {
        let json = { }
        const fieldsValues = {
            segmentLength: 70,
            numberOfSegment: 2,
            outerDiameter: 30,
            innerDiameter: 10,
            pointDiameter: 2.0,
            pointCount: 5,
            endsSurface: EXPOSED
        }
        let requiredFields = [
            'segmentLength',
            'numberOfSegment',
            'outerDiameter',
            'innerDiameter',
            'pointDiameter',
            'pointCount',
            'endsSurface'
        ]
        requiredFields.forEach(field => {
            expect(ajvValidator.validate(starGrainConfigVersion2ValidatorSchema, json)).toBeFalsy()
            assertAjvError('', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json[field] = fieldsValues[field]
        })
    })

    test('should failed when required fields are missing in end burner grain', () => {
        let json = { }
        const fieldsValues = {
            segmentLength: 70,
            outerDiameter: 30,
            holeDiameter: 2,
            holeDepth: 10
        }
        let requiredFields = [
            'segmentLength',
            'outerDiameter',
            'holeDiameter',
            'holeDepth'
        ]
        requiredFields.forEach(field => {
            expect(ajvValidator.validate(endBurnerGrainConfigVersion2ValidatorSchema, json)).toBeFalsy()
            assertAjvError('', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json[field] = fieldsValues[field]
        })
    })

    test('should failed when required fields are missing in moon burner grain', () => {
        let json = { }
        const fieldsValues = {
            segmentLength: 70,
            numberOfSegment: 2,
            outerDiameter: 30,
            coreDiameter: 2,
            coreOffset: 10,
            endsSurface: EXPOSED
        }
        let requiredFields = [
            'segmentLength',
            'numberOfSegment',
            'outerDiameter',
            'coreDiameter',
            'coreOffset',
            'endsSurface'
        ]
        requiredFields.forEach(field => {
            expect(ajvValidator.validate(moonBurnerGrainConfigVersion2ValidatorSchema, json)).toBeFalsy()
            assertAjvError('', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json[field] = fieldsValues[field]
        })
    })

    test('should failed when required fields are missing in C slot grain', () => {
        let json = { }
        const fieldsValues = {
            segmentLength: 70,
            numberOfSegment: 2,
            outerDiameter: 23,
            coreDiameter: 25,
            slotWidth: 26,
            slotDepth: 27,
            slotOffset: 2,
            endsSurface: EXPOSED
        }
        let requiredFields = [
            'segmentLength',
            'numberOfSegment',
            'outerDiameter',
            'coreDiameter',
            'slotWidth',
            'slotDepth',
            'slotOffset',
            'endsSurface'
        ]
        requiredFields.forEach(field => {
            expect(ajvValidator.validate(cSlotGrainConfigVersion2ValidatorSchema, json)).toBeFalsy()
            assertAjvError('', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json[field] = fieldsValues[field]
        })
    })

    test('should failed when required fields are missing in rod and tube grain', () => {
        let json = { }
        const fieldsValues = {
            segmentLength: 70,
            numberOfSegment: 2,
            rodDiameter: 10,
            tubeOuterDiameter: 30,
            tubeInnerDiameter: 10,
            endsSurface: EXPOSED
        }
        let requiredFields = [
            'segmentLength',
            'numberOfSegment',
            'rodDiameter',
            'tubeOuterDiameter',
            'tubeInnerDiameter',
            'endsSurface'
        ]
        requiredFields.forEach(field => {
            expect(ajvValidator.validate(rodTubeGrainConfigVersion2ValidatorSchema, json)).toBeFalsy()
            assertAjvError('', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json[field] = fieldsValues[field]
        })
    })

    test('should failed when required fields are missing in extraConfig', () => {
        let json = createVersion2HollowJsonConfig()
        json.configs[0].extraConfig = {}

        const requiredFields = {
            densityRatio: 1,
            nozzleErosionInMillimeter: 1,
            combustionEfficiencyRatio: 1,
            ambiantPressureInMPa: 1,
            erosiveBurningAreaRatioThreshold: 1,
            erosiveBurningVelocityCoefficient: 1,
            nozzleEfficiency: 1,
            nozzleExpansionRatio: 1,
            optimalNozzleDesign: true
        }

        Object.keys(requiredFields).forEach((key, value) => {
            expect(validateImportVersion2(json)).toBeFalsy()
            assertAjvError('.configs[0].extraConfig', `should have required property '${key}'`, { field: 'missingProperty', value: key })

            json.configs[0].extraConfig[key] = value
        })
    })

    test('should failed when required fields are missing in nozzleDesign', () => {
        let json = createVersion2HollowJsonConfig()
        json.configs[0].nozzleDesign = {}

        const requiredFields = {
            divergenceAngle: 60,
            convergenceAngle: 35
        }
        const fields = [
            'divergenceAngle',
            'convergenceAngle'
        ]

        fields.forEach(field => {
            expect(validateImportVersion2(json)).toBeFalsy()
            assertAjvError('.configs[0].nozzleDesign', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json.configs[0].nozzleDesign[field] = requiredFields[field]
        })
    })

    test('should failed when nozzleDesign has invalid field', () => {
        let json = createVersion2HollowJsonConfig()
        json.configs[0].nozzleDesign = {
            divergenceAngle: 0.9,
            convergenceAngle: 35
        }

        expect(validateImportVersion2(json)).toBeFalsy()
        assertAjvError('.configs[0].nozzleDesign.divergenceAngle', 'should be >= 1')

        json.configs[0].nozzleDesign = {
            divergenceAngle: 90.1,
            convergenceAngle: 35
        }
        expect(validateImportVersion2(json)).toBeFalsy()
        assertAjvError('.configs[0].nozzleDesign.divergenceAngle', 'should be <= 90')

        json.configs[0].nozzleDesign = {
            divergenceAngle: 45,
            convergenceAngle: 0.9
        }
        expect(validateImportVersion2(json)).toBeFalsy()
        assertAjvError('.configs[0].nozzleDesign.convergenceAngle', 'should be >= 1')

        json.configs[0].nozzleDesign = {
            divergenceAngle: 45,
            convergenceAngle: 91
        }
        expect(validateImportVersion2(json)).toBeFalsy()
        assertAjvError('.configs[0].nozzleDesign.convergenceAngle', 'should be <= 90')
    })
})
