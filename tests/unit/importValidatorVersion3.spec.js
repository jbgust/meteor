import {
    validateImportVersion3,
    ajvValidator,
    finocylGrainConfigVersion2ValidatorSchema,
    hollowGrainConfigVersion2ValidatorSchema,
    starGrainConfigVersion2ValidatorSchema,
    endBurnerGrainConfigVersion2ValidatorSchema,
    moonBurnerGrainConfigVersion2ValidatorSchema,
    cSlotGrainConfigVersion2ValidatorSchema,
    rodTubeGrainConfigVersion2ValidatorSchema
} from '../../src/modules/importValidator'
import {
    C_SLOT,
    END_BURNER,
    EXPOSED,
    FINOCYL,
    HOLLOW,
    INHIBITED,
    MOON_BURNER, ROD_TUBE,
    STAR
} from '../../src/modules/grainsConstants'
import { createVersion1JsonConfig } from './importValidatorVersion1.spec'
import { SI_UNITS } from '../../src/modules/computationUtils'
import { createVersion2FinocylJsonConfig } from './importValidatorVersion2.spec'
import { convertFromVersion2ToVersion3 } from '@/modules/importValidator'
import { validatePropellant } from '@/modules/customPropellant'

function buildMotorV2WithComplexeCustomPropellant() {
    return Object.assign({
        version: 2,
        configs: [
            {
                throatDiameter: 17.39,
                propellantType: 'CUSTOM_propellant',
                chamberInnerDiameter: 75,
                chamberLength: 470,
                extraConfig: {
                    densityRatio: 0.95,
                    nozzleErosionInMillimeter: 0,
                    combustionEfficiencyRatio: 0.95,
                    ambiantPressureInMPa: 0.101,
                    erosiveBurningAreaRatioThreshold: 6,
                    erosiveBurningVelocityCoefficient: 0,
                    nozzleEfficiency: 0.85,
                    nozzleExpansionRatio: null,
                    optimalNozzleDesign: true
                },
                grainType: HOLLOW,
                grainConfig: {
                    outerDiameter: 69,
                    coreDiameter: 20,
                    segmentLength: 115,
                    numberOfSegment: 4,
                    outerSurface: INHIBITED,
                    endsSurface: EXPOSED,
                    coreSurface: EXPOSED
                },
                nozzleDesign: {
                    divergenceAngle: 18,
                    convergenceAngle: 38
                },
                name: 'TEST-CUSTOM-KNDX-SRM',
                customPropellant: {
                    name: 'CUSTOM KNDX SI',
                    burnRateCoefficient: 0.0665,
                    pressureExponent: 0.319,
                    cstar: null,
                    density: 1.879,
                    k: 1.131,
                    k2ph: 1.043,
                    chamberTemperature: 1710,
                    molarMass: 42.39,
                    burnRateDataSet: [
                        {
                            fromPressureIncluded: 0.1,
                            toPressureExcluded: 0.779,
                            burnRateCoefficient: 8.87544496778536,
                            pressureExponent: 0.6193
                        },
                        {
                            fromPressureIncluded: 0.779,
                            toPressureExcluded: 2.572,
                            burnRateCoefficient: 7.55278442387944,
                            pressureExponent: -0.0087
                        },
                        {
                            fromPressureIncluded: 2.572,
                            toPressureExcluded: 5.930,
                            burnRateCoefficient: 3.84087990499602,
                            pressureExponent: 0.6882
                        },
                        {
                            fromPressureIncluded: 5.930,
                            toPressureExcluded: 8.502,
                            burnRateCoefficient: 17.2041864098062,
                            pressureExponent: -0.1481
                        },
                        {
                            fromPressureIncluded: 8.502,
                            toPressureExcluded: 11.20,
                            burnRateCoefficient: 4.77524086347659,
                            pressureExponent: 0.4417
                        }
                    ]
                }
            }
        ],
        measureUnit: 'SI'
    })
}

function createVersion3FinocylJsonConfig() {
    const validJson = {
        version: 3,
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
    return Object.assign(validJson)
}

function createVersion3StarJsonConfig() {
    const validJson = {
        version: 3,
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
    return Object.assign(validJson)
}

function createVersion3EndBurnerJsonConfig() {
    const validJson = {
        version: 3,
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
    return Object.assign(validJson)
}

function createVersion3MoonBurnerJsonConfig() {
    const validJson = {
        version: 3,
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
    return Object.assign(validJson)
}

function createVersion3CSlotJsonConfig() {
    const validJson = {
        version: 3,
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
    return Object.assign(validJson)
}

function createVersion3RodTubeJsonConfig() {
    const validJson = {
        version: 3,
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
    return Object.assign(validJson)
}

function createVersion3HollowJsonConfig() {
    const validJson = {
        version: 3,
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
    return Object.assign(validJson)
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

describe('Import Version 3 Validation', () => {
    test('Convert From Version 2 to Version 3', () => {
        let motorVersion3 = convertFromVersion2ToVersion3(createVersion2FinocylJsonConfig())
        expect(validateImportVersion3(motorVersion3.motor)).toBeTruthy()
        expect(ajvValidator.validate(finocylGrainConfigVersion2ValidatorSchema, motorVersion3.motor.grainConfig)).toBeTruthy()
    })

    test('Convert From Version 2 to Version 3 with custom propellant', () => {
        let motorVersion3 = convertFromVersion2ToVersion3(buildMotorV2WithComplexeCustomPropellant())
        // tweak car lors de la validation le custom propellan,t n'est pas encore importé
        motorVersion3.motor.customPropellant = 'UUID_OF_NEW_PROPELLANT'
        expect(validateImportVersion3(motorVersion3.motor)).toBeTruthy()
        expect(motorVersion3.name).toEqual('TEST-CUSTOM-KNDX-SRM')
        expect(motorVersion3.motor.name).toBeUndefined()
        expect(ajvValidator.validate(hollowGrainConfigVersion2ValidatorSchema, motorVersion3.motor.grainConfig)).toBeTruthy()
        expect(validatePropellant(motorVersion3.customPropellant)).toBeTruthy()
    })

    test('should check finocyl grain config', () => {
        expect(ajvValidator.validate(finocylGrainConfigVersion2ValidatorSchema, createVersion3FinocylJsonConfig().grainConfig)).toBeTruthy()
    })

    test('should check star grain config', () => {
        let loadedConfig = createVersion3StarJsonConfig()
        expect(validateImportVersion3(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(starGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)).toBeTruthy()
    })

    test('should check end burner grain config', () => {
        let loadedConfig = createVersion3EndBurnerJsonConfig()
        expect(validateImportVersion3(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(endBurnerGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)).toBeTruthy()
    })

    test('should check moon burner grain config', () => {
        let loadedConfig = createVersion3MoonBurnerJsonConfig()
        expect(validateImportVersion3(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(moonBurnerGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)).toBeTruthy()
    })

    test('should check C slot grain config', () => {
        let loadedConfig = createVersion3CSlotJsonConfig()
        expect(validateImportVersion3(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(cSlotGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)).toBeTruthy()
    })

    test('should check rod tube grain config', () => {
        let loadedConfig = createVersion3RodTubeJsonConfig()
        expect(validateImportVersion3(loadedConfig)).toBeTruthy()
        expect(ajvValidator.validate(rodTubeGrainConfigVersion2ValidatorSchema, loadedConfig.grainConfig)).toBeTruthy()
    })

    test('should check hollow grain config', () => {
        expect(ajvValidator.validate(hollowGrainConfigVersion2ValidatorSchema, createVersion3HollowJsonConfig().grainConfig)).toBeTruthy()
    })

    test('should import valid JSON', () => {
        expect(validateImportVersion3(createVersion3FinocylJsonConfig())).toBeTruthy()
    })

    test('should not import invalid  grain type', () => {
        let loadedConfig = createVersion3FinocylJsonConfig()
        loadedConfig.grainType = 'NEW-GRAIN-TYPE'

        expect(validateImportVersion3(loadedConfig)).toBeFalsy()
        assertAjvError('.grainType')
    })

    test('should not import when grain type missing', () => {
        let loadedConfig = createVersion3FinocylJsonConfig()
        delete loadedConfig.grainType

        expect(validateImportVersion3(loadedConfig)).toBeFalsy()
        assertAjvError('')
    })

    test('should not import invalid grain config', () => {
        let loadedConfig = createVersion3FinocylJsonConfig()
        delete loadedConfig.grainConfig.finCount

        expect(validateImportVersion3(loadedConfig)).toBeFalsy()
    })

    test('should not import when finocyl grain config invalid', () => {
        let loadedConfig = createVersion3FinocylJsonConfig()
        delete loadedConfig.grainConfig.finCount

        expect(validateImportVersion3(loadedConfig)).toBeFalsy()
        assertAjvError('', "should have required property 'finCount'")
    })

    test('should not import when hollow grain config invalid', () => {
        let loadedConfig = createVersion3HollowJsonConfig()
        delete loadedConfig.grainConfig.coreDiameter

        expect(validateImportVersion3(loadedConfig)).toBeFalsy()
        assertAjvError('', "should have required property 'coreDiameter'")
    })

    test('should not import version 1 JSON', () => {
        expect(validateImportVersion3(createVersion1JsonConfig())).toBeFalsy()
        assertAjvError('.version')
    })

    test('should not import invalid propellant', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        jsonToValidate.propellantType = 'KNDXx'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.propellantType = 'xKNDX'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.propellantType = 'kndx'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        assertAjvError('.propellantType')
    })

    test('should import custom propellant', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        delete jsonToValidate.propellantType

        jsonToValidate.customPropellant = 'UUID'
        expect(validateImportVersion3(jsonToValidate)).toBeTruthy()
    })

    test('should not import when no propellant or custom propellant', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        delete jsonToValidate.propellantType
        delete jsonToValidate.customPropellant
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()
    })

    test('should not import when propellant and custom propellant are present', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        jsonToValidate.propellantType = 'KNSU'
        jsonToValidate.customPropellant = 'UUID'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()
    })

    test('should not import invalid finocyl surface', () => {
        let jsonToValidate = createVersion3FinocylJsonConfig()
        jsonToValidate.grainConfig.endsSurface = 'INHIBITEDd'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.grainConfig.endsSurface = 'sINHIBITED'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.grainConfig.endsSurface = 'inhibited'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        assertAjvError('.endsSurface')
    })

    test('should not import invalid hollow core surface', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        jsonToValidate.grainConfig.coreSurface = 'INHIBITEDd'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.grainConfig.coreSurface = 'sINHIBITED'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.grainConfig.coreSurface = 'inhibited'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        assertAjvError('.coreSurface')
    })

    test('should not import invalid hollow end surface', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        jsonToValidate.grainConfig.endsSurface = 'INHIBITEDd'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.grainConfig.endsSurface = 'sINHIBITED'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.grainConfig.endsSurface = 'inhibited'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        assertAjvError('.endsSurface')
    })

    test('should not import invalid hollow outer surface', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        jsonToValidate.grainConfig.outerSurface = 'INHIBITEDd'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.grainConfig.outerSurface = 'sINHIBITED'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.grainConfig.outerSurface = 'inhibited'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        assertAjvError('.outerSurface')
    })

    test('should not import invalid version', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        jsonToValidate.version = 2
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.version = 0
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.version = 'fd'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        assertAjvError('.version', 'should be number')
    })

    test('should import configs without nozzleDesign', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        delete jsonToValidate.nozzleDesign
        expect(validateImportVersion3(jsonToValidate)).toBeTruthy()
    })

    test('should import measure unit', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        jsonToValidate.measureUnit = 'IMPERIAL'
        expect(validateImportVersion3(jsonToValidate)).toBeTruthy()
        expect(jsonToValidate.measureUnit).toBe('IMPERIAL')
    })

    test('should replace invalid measure unit with SI', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()
        jsonToValidate.measureUnit = 'xSI'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.measureUnit = 'IMPERIALx'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()

        jsonToValidate.measureUnit = 'imperial'
        expect(validateImportVersion3(jsonToValidate)).toBeFalsy()
    })

    test('should use SI as default measure unit', () => {
        let jsonToValidate = createVersion3HollowJsonConfig()

        expect(jsonToValidate.measureUnit).toBeUndefined()
        expect(validateImportVersion3(jsonToValidate)).toBeTruthy()
        expect(jsonToValidate.measureUnit).toBe(SI_UNITS)
    })

    test('should coerceTypes', () => {
        const validJson = {
            version: 3,
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
        expect(validateImportVersion3(validJson)).toBeTruthy()
    })

    test('should failed when version is missing', () => {
        expect(validateImportVersion3({})).toBeFalsy()
        assertAjvError('', 'should have required property \'version\'', { field: 'missingProperty', value: 'version' })
    })

    test('should failed when required fields are missing in configs', () => {
        let json = { version: 3 }
        const fieldsValues = {
            throatDiameter: 1,
            chamberInnerDiameter: '2',
            chamberLength: '9',
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
            'extraConfig',
            'grainType',
            'grainConfig'
        ]
        requiredFields.forEach(field => {
            expect(validateImportVersion3(json)).toBeFalsy()
            assertAjvError('', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json[field] = fieldsValues[field]
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
        let json = createVersion3HollowJsonConfig()
        json.extraConfig = {}

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
            expect(validateImportVersion3(json)).toBeFalsy()
            assertAjvError('.extraConfig', `should have required property '${key}'`, { field: 'missingProperty', value: key })

            json.extraConfig[key] = value
        })
    })

    test('should failed when required fields are missing in nozzleDesign', () => {
        let json = createVersion3HollowJsonConfig()
        json.nozzleDesign = {}

        const requiredFields = {
            divergenceAngle: 60,
            convergenceAngle: 35
        }
        const fields = [
            'divergenceAngle',
            'convergenceAngle'
        ]

        fields.forEach(field => {
            expect(validateImportVersion3(json)).toBeFalsy()
            assertAjvError('.nozzleDesign', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json.nozzleDesign[field] = requiredFields[field]
        })
    })

    test('should failed when nozzleDesign has invalid field', () => {
        let json = createVersion3HollowJsonConfig()
        json.nozzleDesign = {
            divergenceAngle: 0.9,
            convergenceAngle: 35
        }

        expect(validateImportVersion3(json)).toBeFalsy()
        assertAjvError('.nozzleDesign.divergenceAngle', 'should be >= 1')

        json.nozzleDesign = {
            divergenceAngle: 90.1,
            convergenceAngle: 35
        }
        expect(validateImportVersion3(json)).toBeFalsy()
        assertAjvError('.nozzleDesign.divergenceAngle', 'should be <= 90')

        json.nozzleDesign = {
            divergenceAngle: 45,
            convergenceAngle: 0.9
        }
        expect(validateImportVersion3(json)).toBeFalsy()
        assertAjvError('.nozzleDesign.convergenceAngle', 'should be >= 1')

        json.nozzleDesign = {
            divergenceAngle: 45,
            convergenceAngle: 91
        }
        expect(validateImportVersion3(json)).toBeFalsy()
        assertAjvError('.nozzleDesign.convergenceAngle', 'should be <= 90')
    })
})
