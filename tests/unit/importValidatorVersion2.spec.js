import { validateImportVersion2, ajvValidator } from '../../src/modules/importValidator'
import { EXPOSED, FINOCYL } from '../../src/modules/grainsConstants'

function createVersion2JsonConfig() {
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
                grain: {
                    type: FINOCYL,
                    value: {
                        segmentLength: 70,
                        numberOfSegment: 2,
                        outerDiameter: 30,
                        innerDiameter: 10,
                        finWidth: 2.0,
                        finDiameter: 20.0,
                        finCount: 5,
                        endsSurface: EXPOSED
                    }
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
    test('should import valid JSON', () => {
        let result = validateImportVersion2(createVersion2JsonConfig())
        expect(result).toBeTruthy()
    })
})
