import {
    computeNozzleLength,
    hasSelectedUnits, IMPERIAL_UNITS,
    setSelectedUnits, SI_UNITS
    , getSelectedUnit, getSelectedUnitOrSI
} from '../../src/modules/computationUtils'

describe('Nozzle length calculation (divergence and convergence length)', () => {
    test('should compute nozzle length', () => {
        // Assert divergence length (same value as SRM 2014
        expect(computeNozzleLength(31.8119348430684, 24).toFixed(2)).toBe('74.83')

        // Assert convergence length (same value as SRM 2014
        expect(computeNozzleLength(57.6014751080198, 70).toFixed(2)).toBe('41.13')
    })
})

describe('Units management', () => {
    test('should retrieve selected unit', () => {
        expect(hasSelectedUnits()).toBe(false)

        localStorage.setItem('unitSelected', 'badUnits')
        expect(hasSelectedUnits()).toBe(false)
    })

    test('should set selected unit', () => {
        setSelectedUnits(SI_UNITS)
        expect(hasSelectedUnits()).toBe(true)

        setSelectedUnits(IMPERIAL_UNITS)
        expect(hasSelectedUnits()).toBe(true)
    })

    test('should not set invalid unit', () => {
        localStorage.clear()
        setSelectedUnits('bad unit')
        expect(hasSelectedUnits()).toBe(false)
    })

    test('should get default unit', () => {
        localStorage.clear()
        expect(getSelectedUnit()).toBe(null)

        setSelectedUnits(SI_UNITS)
        expect(getSelectedUnit()).toBe(SI_UNITS)
    })

    test('should get default unit or return SI_UNITS', () => {
        localStorage.clear()
        expect(getSelectedUnitOrSI()).toBe(SI_UNITS)

        setSelectedUnits(IMPERIAL_UNITS)
        expect(getSelectedUnitOrSI()).toBe(IMPERIAL_UNITS)
    })
})
