import { validateJSONImport, ajvValidator } from '../../src/modules/importValidator'

function createDefaultJsonConfig() {
    const validJsonV1 = {
        version: 1,
        configs: [
            {
                throatDiameter: 17.39,
                outerDiameter: 69,
                coreDiameter: 20,
                segmentLength: 115,
                numberOfSegment: 4,
                outerSurface: 'INHIBITED',
                endsSurface: 'EXPOSED',
                coreSurface: 'EXPOSED',
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
    expect(ajvValidator.errors[0].dataPath).toMatch(dataPath)
    if (message) {
        expect(ajvValidator.errors[0].message).toMatch(message)
    }

    if (params) {
        expect(ajvValidator.errors[0].params[params.field]).toMatch(params.value)
    }
}

describe('Import Validation', () => {
    test('should import valid JSON', () => {
        expect(createDefaultJsonConfig()).toBeTruthy()
    })

    test('should not import invalid propellant', () => {
        let jsonToValidate = createDefaultJsonConfig()
        jsonToValidate.configs[0].propellantType = 'KNDXx'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].propellantType = 'xKNDX'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].propellantType = 'kndx'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        assertAjvError('.propellantType')
    })

    test('should not import invalid core surface', () => {
        let jsonToValidate = createDefaultJsonConfig()
        jsonToValidate.configs[0].coreSurface = 'INHIBITEDd'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].coreSurface = 'sINHIBITED'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].coreSurface = 'inhibited'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        assertAjvError('.coreSurface')
    })

    test('should not import invalid end surface', () => {
        let jsonToValidate = createDefaultJsonConfig()
        jsonToValidate.configs[0].endsSurface = 'INHIBITEDd'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].endsSurface = 'sINHIBITED'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].endsSurface = 'inhibited'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        assertAjvError('.endsSurface')
    })

    test('should not import invalid outer surface', () => {
        let jsonToValidate = createDefaultJsonConfig()
        jsonToValidate.configs[0].outerSurface = 'INHIBITEDd'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].outerSurface = 'sINHIBITED'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        jsonToValidate.configs[0].outerSurface = 'inhibited'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        assertAjvError('.outerSurface')
    })

    test('should not import invalid version', () => {
        let jsonToValidate = createDefaultJsonConfig()
        jsonToValidate.version = 2
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        jsonToValidate.version = 0
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        jsonToValidate.version = 'fd'
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()

        assertAjvError('.version', 'should be number')
    })

    test('should not import multi configs', () => {
        let jsonToValidate = createDefaultJsonConfig()
        jsonToValidate.configs.push({})
        expect(validateJSONImport(jsonToValidate)).toBeFalsy()
        assertAjvError('.configs')
    })

    test('should import configs without nozzleDesign', () => {
        let jsonToValidate = createDefaultJsonConfig()
        delete jsonToValidate.configs[0].nozzleDesign
        expect(validateJSONImport(jsonToValidate)).toBeTruthy()
    })

    test('should import configs without nozzleDesign', () => {
        let jsonToValidate = createDefaultJsonConfig()
        delete jsonToValidate.configs[0].nozzleDesign
        expect(validateJSONImport(jsonToValidate)).toBeTruthy()
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
                    outerSurface: 'INHIBITED',
                    endsSurface: 'EXPOSED',
                    coreSurface: 'EXPOSED',
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
        expect(validateJSONImport(validJson)).toBeTruthy()
    })

    test('should failed when version is missing', () => {
        expect(validateJSONImport({})).toBeFalsy()
        assertAjvError('', 'should have required property \'version\'', { field: 'missingProperty', value: 'version' })
    })

    test('should failed when configs is missing', () => {
        expect(validateJSONImport({ version: 1 })).toBeFalsy()
        assertAjvError('', 'should have required property \'configs\'', { field: 'missingProperty', value: 'configs' })
    })

    test('should failed when configs is missing', () => {
        expect(validateJSONImport({ version: 1 })).toBeFalsy()
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
            outerSurface: 'INHIBITED',
            endsSurface: 'EXPOSED',
            coreSurface: 'EXPOSED',
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
            expect(validateJSONImport(json)).toBeFalsy()
            assertAjvError('', `should have required property '${field}'`, { field: 'missingProperty', value: field })

            json.configs[0][field] = fieldsValues[field]
        })
    })

    test('should failed when required fields are missing in extraConfig', () => {
        let json = createDefaultJsonConfig()
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
            expect(validateJSONImport(json)).toBeFalsy()
            assertAjvError('', `should have required property '${key}'`, { field: 'missingProperty', value: key })

            json.configs[0].extraConfig[key] = value
        })
    })

    test('should failed when required fields are missing in nozzleDesign', () => {
        let json = createDefaultJsonConfig()
        json.configs[0].nozzleDesign = {}

        const requiredFields = {
            divergenceAngle: 60,
            convergenceAngle: 35
        }

        Object.keys(requiredFields).forEach((key, value) => {
            expect(validateJSONImport(json)).toBeFalsy()
            assertAjvError('', `should have required property '${key}'`, { field: 'missingProperty', value: key })

            json.configs[0].nozzleDesign[key] = value
        })
    })
})