import {
    isCustomPropellant,
    validatePropellant, validateComplexBurnRateData
} from '../../src/modules/customPropellant'
import { KNDX } from '@/modules/grainsConstants'

describe('Identify custom propellant', () => {
    test('should identify custom propellant', () => {
        expect(isCustomPropellant('CUSTOM_my_propellant')).toBeTruthy()
    })

    test('should identify native propellant', () => {
        expect(isCustomPropellant(KNDX)).toBeFalsy()
    })

    test('should not crash when undefined or null', () => {
        expect(isCustomPropellant(undefined)).toBeFalsy()
        expect(isCustomPropellant(null)).toBeFalsy()
    })
})

describe('Custom propellant validation', () => {
    test('should validate propellant', () => {
        expect(validatePropellant(createCustomPropellant())).toBeTruthy()
    })

    test('should validate propellant without k2ph', () => {
        const propellant = createCustomPropellant()
        propellant.k2ph = null
        expect(validatePropellant(propellant)).toBeTruthy()
    })

    test('should validate propellant without chamber temperature', () => {
        const propellant = createCustomPropellant()
        propellant.chamberTemperature = null
        expect(validatePropellant(propellant)).toBeTruthy()
    })

    test('should fail if cstar is invalid', () => {
        const propellant = createCustomPropellant()
        propellant.chamberTemperature = null

        propellant.cstar = 0
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.cstar = null
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.cstar = 'r'
        expect(validatePropellant(propellant)).toBeFalsy()
    })

    test('should fail if burnRateCoefficient is invalid', () => {
        const propellant = createCustomPropellant()

        propellant.burnRateCoefficient = 0
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.burnRateCoefficient = null
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.burnRateCoefficient = 'r'
        expect(validatePropellant(propellant)).toBeFalsy()
    })

    test('should fail if pressureExponent is invalid', () => {
        const propellant = createCustomPropellant()

        propellant.pressureExponent = 0
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.pressureExponent = null
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.pressureExponent = 'r'
        expect(validatePropellant(propellant)).toBeFalsy()
    })

    test('should use advance burn rate datas', () => {
        const propellant = createCustomPropellant()
        propellant.burnRateCoefficient = null
        propellant.pressureExponent = null
        propellant.burnRateDataSet = [{ data: 1 }]
        expect(validatePropellant(propellant)).toBeTruthy()
    })

    test('should not validate invalide advance burn rate datas', () => {
        expect(validateComplexBurnRateData([])).toBeFalsy()
        expect(validateComplexBurnRateData(null)).toBeFalsy()
    })

    test('should validate advance burn rate datas', () => {
        expect(validateComplexBurnRateData([{ data: 1 }])).toBeTruthy()
    })

    test('should fail if k is invalid', () => {
        const propellant = createCustomPropellant()

        propellant.k = 0
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.k = null
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.k = 'r'
        expect(validatePropellant(propellant)).toBeFalsy()
    })

    test('should fail if density is invalid', () => {
        const propellant = createCustomPropellant()

        propellant.density = 0
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.density = null
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.density = 'r'
        expect(validatePropellant(propellant)).toBeFalsy()
    })

    test('should fail if molarMass is invalid', () => {
        const propellant = createCustomPropellant()

        propellant.molarMass = 0
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.molarMass = null
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.molarMass = 'r'
        expect(validatePropellant(propellant)).toBeFalsy()
    })

    test('should fail if k2ph is invalid', () => {
        const propellant = createCustomPropellant()

        propellant.k2ph = 0
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.k2ph = 'r'
        expect(validatePropellant(propellant)).toBeFalsy()

        // not required
        propellant.k2ph = null
        expect(validatePropellant(propellant)).toBeTruthy()
    })

    test('should fail if chamberTemperature is invalid', () => {
        const propellant = createCustomPropellant()

        propellant.chamberTemperature = 0
        expect(validatePropellant(propellant)).toBeFalsy()

        propellant.chamberTemperature = 'r'
        expect(validatePropellant(propellant)).toBeFalsy()

        // not required
        propellant.chamberTemperature = null
        expect(validatePropellant(propellant)).toBeTruthy()
    })

    test('C* should not be required if chamber temperature is set and vice versa', () => {
        const propellant = createCustomPropellant()

        propellant.chamberTemperature = 1720
        propellant.cstar = null
        expect(validatePropellant(propellant)).toBeTruthy()

        propellant.chamberTemperature = null
        propellant.cstar = 880
        expect(validatePropellant(propellant)).toBeTruthy()

        propellant.chamberTemperature = null
        propellant.cstar = null
        expect(validatePropellant(propellant)).toBeFalsy()
    })
})

function createCustomPropellant() {
    return Object.assign({
        name: 'TEST',
        cstar: 23.4,
        burnRateCoefficient: 1.12,
        pressureExponent: 4.56,
        k: 1.76,
        density: 0.07,
        molarMass: 45,
        chamberTemperature: 1752,
        k2ph: 23
    })
}
