import { isCustomPropellant, getCustomPropellant, setCustomPropellant } from '../../src/modules/customPropellant'

describe('Identify custom propellant', () => {
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

describe('Load/save custom propellant', () => {

    test('should save propellant', () => {
        let propellant = { text: 'fakePropellant' }
        setCustomPropellant('my Propellant', propellant)

        expect(localStorage.getItem('CUSTOM_my Propellant')).toBe(JSON.stringify(propellant))
    })

    test('should get propellant', () => {
        let propellant = { text: 'fakePropellant' }
        setCustomPropellant('my Propellant', propellant)

        expect(getCustomPropellant('CUSTOM_my Propellant')).toEqual(propellant)
    })
})
