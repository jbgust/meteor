import { expect, test, describe } from 'vitest'
import { validateImportVersion1, ajvValidator } from '../../src/modules/importValidator'
import { SI_UNITS } from '../../src/modules/computationUtils'
import { EXPOSED, INHIBITED } from '../../src/modules/grainsConstants'

export function createVersion1JsonConfig() {
    const validJsonV1 = {
        version: 1,
        configs: [
            {
                throatDiameter: 17.39,
                outerDiameter: 69,
                coreDiameter: 20,
                segmentLength: 115,
                numberOfSegment: 4,
                outerSurface: INHIBITED,
                endsSurface: EXPOSED,
                coreSurface: EXPOSED,
                propellantType: 'KNDX',
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
                nozzleDesign: {
                    divergenceAngle: 18,
                    convergenceAngle: 38
                }
            }
        ]
    }
    return Object.assign(validJsonV1)
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

describe('Import Validation Version 1', () => {
    test('should import valid JSON', () => {
        expect(validateImportVersion1(createVersion1JsonConfig())).toBeTruthy()
    })

    test('should not import invalid propellant', () => {
        let jsonToValidate = createVersion1JsonConfig()
        jsonToValidate.configs[0].propellantType = 'KNDXx'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].propellantType = 'xKNDX'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].propellantType = 'kndx'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        assertAjvError('.configs[0].propellantType')
    })

    test('should import custom propellant', () => {
        let jsonToValidate = createVersion1JsonConfig()
        jsonToValidate.configs[0].propellantType = 'CUSTOM_idPropellant'
        expect(validateImportVersion1(jsonToValidate)).toBeTruthy()

        jsonToValidate.configs[0].propellantType = 'custom_'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].propellantType = 'xCUSTOM_'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        assertAjvError('.configs[0].propellantType')
    })

    test('should not import invalid core surface', () => {
        let jsonToValidate = createVersion1JsonConfig()
        jsonToValidate.configs[0].coreSurface = 'INHIBITEDd'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].coreSurface = 'sINHIBITED'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].coreSurface = 'inhibited'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        assertAjvError('.configs[0].coreSurface')
    })

    test('should not import invalid end surface', () => {
        let jsonToValidate = createVersion1JsonConfig()
        jsonToValidate.configs[0].endsSurface = 'INHIBITEDd'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].endsSurface = 'sINHIBITED'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].endsSurface = 'inhibited'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        assertAjvError('.configs[0].endsSurface')
    })

    test('should not import invalid outer surface', () => {
        let jsonToValidate = createVersion1JsonConfig()
        jsonToValidate.configs[0].outerSurface = 'INHIBITEDd'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].outerSurface = 'sINHIBITED'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].outerSurface = 'inhibited'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        assertAjvError('.configs[0].outerSurface')
    })

    test('should not import invalid version', () => {
        let jsonToValidate = createVersion1JsonConfig()
        jsonToValidate.version = 2
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.version = 0
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.version = 'fd'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        assertAjvError('.version', 'should be number')
    })

    test('should not import multi configs', () => {
        let jsonToValidate = createVersion1JsonConfig()
        jsonToValidate.configs.push({})
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()
        assertAjvError('.configs')
    })

    test('should import configs without nozzleDesign', () => {
        let jsonToValidate = createVersion1JsonConfig()
        delete jsonToValidate.configs[0].nozzleDesign
        expect(validateImportVersion1(jsonToValidate)).toBeTruthy()
    })

    test('should import measure unit', () => {
        let jsonToValidate = createVersion1JsonConfig()
        jsonToValidate.measureUnit = 'IMPERIAL'
        expect(validateImportVersion1(jsonToValidate)).toBeTruthy()
        expect(jsonToValidate.measureUnit).toBe('IMPERIAL')
    })

    test('should replace invalid measure unit with SI', () => {
        let jsonToValidate = createVersion1JsonConfig()
        jsonToValidate.measureUnit = 'xSI'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.measureUnit = 'IMPERIALx'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()

        jsonToValidate.measureUnit = 'imperial'
        expect(validateImportVersion1(jsonToValidate)).toBeFalsy()
    })

    test('should use SI as default measure unit', () => {
        let jsonToValidate = createVersion1JsonConfig()

        expect(jsonToValidate.measureUnit).toBeUndefined()
        expect(validateImportVersion1(jsonToValidate)).toBeTruthy()
        expect(jsonToValidate.measureUnit).toBe(SI_UNITS)
    })

    test('should coerceTypes', () => {
        const validJson = {
            version: 1,
            configs: [
                {
                    throatDiameter: '17.39',
                    outerDiameter: '69',
                    coreDiameter: '20',
                    segmentLength: '115',
                    numberOfSegment: '4',
                    outerSurface: INHIBITED,
                    endsSurface: EXPOSED,
                    coreSurface: EXPOSED,
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
                    nozzleDesign: {
                        divergenceAngle: '18',
                        convergenceAngle: '38'
                    }
                }
            ]
        }
        expect(validateImportVersion1(validJson)).toBeTruthy()
    })

    test('should failed when version is missing', () => {
        expect(validateImportVersion1({})).toBeFalsy()
        assertAjvError('', 'should have required property \'version\'', { field: 'missingProperty', value: 'version' })
    })

    test('should failed when configs is missing', () => {
        expect(validateImportVersion1({ version: 1 })).toBeFalsy()
        assertAjvError('', 'should have required property \'configs\'', { field: 'missingProperty', value: 'configs' })
    })

    test('should failed when required fields are missing in configs', () => {
        let json = { version: 1, configs: [{}] }
        const fieldsValues = {
            throatDiameter: 1,
            outerDiameter: 2,
            coreDiameter: 3,
            segmentLength: 4,
            numberOfSegment: 5,
            outerSurface: INHIBITED,
            endsSurface: EXPOSED,
            coreSurface: EXPOSED,
            propellantType: 'KNDX',
            chamberInnerDiameter: '2',
            chamberLength: '9',
            extraConfig: {}
        }
        let requiredFields = [
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
        requiredFields.forEach(field => {
            expect(validateImportVersion1(json)).toBeFalsy()
            assertAjvError('.configs[0]', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json.configs[0][field] = fieldsValues[field]
        })
    })

    test('should failed when required fields are missing in extraConfig', () => {
        let json = createVersion1JsonConfig()
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
            expect(validateImportVersion1(json)).toBeFalsy()
            assertAjvError('.configs[0].extraConfig', `should have required property '${key}'`, { field: 'missingProperty', value: key })

            json.configs[0].extraConfig[key] = value
        })
    })

    test('should failed when required fields are missing in nozzleDesign', () => {
        let json = createVersion1JsonConfig()
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
            expect(validateImportVersion1(json)).toBeFalsy()
            assertAjvError('.configs[0].nozzleDesign', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json.configs[0].nozzleDesign[field] = requiredFields[field]
        })
    })

    test('should failed when nozzleDesign has invalid field', () => {
        let json = createVersion1JsonConfig()
        json.configs[0].nozzleDesign = {
            divergenceAngle: 0.9,
            convergenceAngle: 35
        }

        expect(validateImportVersion1(json)).toBeFalsy()
        assertAjvError('.configs[0].nozzleDesign.divergenceAngle', 'should be >= 1')

        json.configs[0].nozzleDesign = {
            divergenceAngle: 90.1,
            convergenceAngle: 35
        }
        expect(validateImportVersion1(json)).toBeFalsy()
        assertAjvError('.configs[0].nozzleDesign.divergenceAngle', 'should be <= 90')

        json.configs[0].nozzleDesign = {
            divergenceAngle: 45,
            convergenceAngle: 0.9
        }
        expect(validateImportVersion1(json)).toBeFalsy()
        assertAjvError('.configs[0].nozzleDesign.convergenceAngle', 'should be >= 1')

        json.configs[0].nozzleDesign = {
            divergenceAngle: 45,
            convergenceAngle: 91
        }
        expect(validateImportVersion1(json)).toBeFalsy()
        assertAjvError('.configs[0].nozzleDesign.convergenceAngle', 'should be <= 90')
    })
})
