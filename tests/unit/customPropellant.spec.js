import { isCustomPropellant } from '../../src/modules/customPropellant'

describe('Custom propellant utils', () => {
    test('should identify custom propellant', () => {
        expect(isCustomPropellant('CUSTOM_my_propellant')).toBeTruthy()
    })

    test('should identify native propellant', () => {
        expect(isCustomPropellant('-CUSTOM_my_propellant')).toBeFalsy()
        expect(isCustomPropellant('KNDX')).toBeFalsy()
    })

    test('should not crash when undefined or null', () => {
        expect(isCustomPropellant(undefined)).toBeFalsy()
        expect(isCustomPropellant(null)).toBeFalsy()
    })
})
