import {
    computeNozzleLength,
    hasSelectedUnits, IMPERIAL_UNITS,
    setSelectedUnits, SI_UNITS
    , getSelectedUnit, getSelectedUnitOrSI, comparePerformanceResults
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

describe('Motor performance comparison', () => {
    test('Current motor better than the previous one', () => {
        const motorPerformanceResult1 = {
            motorDescription: 'M1672',
            maxThrust: '2060.35',
            totalImpulse: '3603.07',
            specificImpulse: '130.65',
            maxPressure: '59.36',
            thrustTime: '12.15',
            optimalDesign: true,
            nozzleExitDiameter: '54.03',
            convergenceCrossSectionDiameter: 57.61,
            divergenceCrossSectionDiameter: 36.6356,
            exitSpeedInitial: '3.07',
            grainMass: '2.812',
            averagePressure: '49.06',
            optimalNozzleExpansionRatio: '9.65',
            classPercentage: 41
        }

        const motorPerformanceResult2 = {
            motorDescription: 'L1671',
            maxThrust: '2060.34',
            totalImpulse: '3603.06',
            specificImpulse: '130.64',
            maxPressure: '59.35',
            thrustTime: '2.14',
            optimalDesign: true,
            nozzleExitDiameter: '54.03',
            convergenceCrossSectionDiameter: 57.61,
            divergenceCrossSectionDiameter: 36.6356,
            exitSpeedInitial: '3.06',
            grainMass: '2.812',
            averagePressure: '49.05',
            optimalNozzleExpansionRatio: '9.65',
            classPercentage: 41
        }

        expect(comparePerformanceResults(motorPerformanceResult1, motorPerformanceResult2))
            .toEqual({
                class: { icon: 'mdi-menu-up', cssColor: 'green' },
                maxThrust: { icon: 'mdi-menu-up', cssColor: 'green' },
                totalImpulse: { icon: 'mdi-menu-up', cssColor: 'green' },
                specificImpulse: { icon: 'mdi-menu-up', cssColor: 'green' },
                maxPressure: { icon: 'mdi-menu-up', cssColor: 'green' },
                thrustTime: { icon: 'mdi-menu-up', cssColor: 'green' },
                averagePressure: { icon: 'mdi-menu-up', cssColor: 'green' },
                exitSpeedInitial: { icon: 'mdi-menu-up', cssColor: 'green' },
                grainMass: { icon: 'mdi-menu-up', cssColor: 'green' }
            })
    })

    test('Previous motor better than the current', () => {
        const motorPerformanceResult1 = {
            motorDescription: 'L1671',
            maxThrust: '2060.34',
            totalImpulse: '3603.06',
            specificImpulse: '130.64',
            maxPressure: '59.35',
            thrustTime: '2.14',
            optimalDesign: true,
            nozzleExitDiameter: '54.03',
            convergenceCrossSectionDiameter: 57.61,
            divergenceCrossSectionDiameter: 36.6356,
            exitSpeedInitial: '3.06',
            grainMass: '2.812',
            averagePressure: '49.05',
            optimalNozzleExpansionRatio: '9.65',
            classPercentage: 41
        }

        const motorPerformanceResult2 = {
            motorDescription: 'M1672',
            maxThrust: '2060.35',
            totalImpulse: '3603.07',
            specificImpulse: '130.65',
            maxPressure: '59.36',
            thrustTime: '12.15',
            optimalDesign: true,
            nozzleExitDiameter: '54.03',
            convergenceCrossSectionDiameter: 57.61,
            divergenceCrossSectionDiameter: 36.6356,
            exitSpeedInitial: '3.07',
            grainMass: '2.812',
            averagePressure: '49.06',
            optimalNozzleExpansionRatio: '9.65',
            classPercentage: 41
        }

        expect(comparePerformanceResults(motorPerformanceResult1, motorPerformanceResult2))
            .toEqual({
                class: { icon: 'mdi-menu-down', cssColor: 'red' },
                maxThrust: { icon: 'mdi-menu-down', cssColor: 'red' },
                totalImpulse: { icon: 'mdi-menu-down', cssColor: 'red' },
                specificImpulse: { icon: 'mdi-menu-down', cssColor: 'red' },
                maxPressure: { icon: 'mdi-menu-down', cssColor: 'red' },
                thrustTime: { icon: 'mdi-menu-down', cssColor: 'red' },
                averagePressure: { icon: 'mdi-menu-down', cssColor: 'red' },
                exitSpeedInitial: { icon: 'mdi-menu-down', cssColor: 'red' },
                grainMass: { icon: 'mdi-menu-down', cssColor: 'red' }
            })
    })

    test('Previous motor class better than the current', () => {
        const motorPerformanceResult1 = {
            motorDescription: 'L9',
            maxThrust: '2060.34',
            totalImpulse: '3603.06',
            specificImpulse: '130.64',
            maxPressure: '59.35',
            thrustTime: '2.14',
            optimalDesign: true,
            nozzleExitDiameter: '54.03',
            convergenceCrossSectionDiameter: 57.61,
            divergenceCrossSectionDiameter: 36.6356,
            exitSpeedInitial: '3.06',
            grainMass: '2.812',
            averagePressure: '49.05',
            optimalNozzleExpansionRatio: '9.65',
            classPercentage: 41
        }

        const motorPerformanceResult2 = {
            motorDescription: 'L1672',
            maxThrust: '2060.35',
            totalImpulse: '3603.07',
            specificImpulse: '130.65',
            maxPressure: '59.36',
            thrustTime: '12.15',
            optimalDesign: true,
            nozzleExitDiameter: '54.03',
            convergenceCrossSectionDiameter: 57.61,
            divergenceCrossSectionDiameter: 36.6356,
            exitSpeedInitial: '3.07',
            grainMass: '2.812',
            averagePressure: '49.06',
            optimalNozzleExpansionRatio: '9.65',
            classPercentage: 41
        }

        expect(comparePerformanceResults(motorPerformanceResult1, motorPerformanceResult2))
            .toEqual({
                class: { icon: 'mdi-menu-down', cssColor: 'red' },
                maxThrust: { icon: 'mdi-menu-down', cssColor: 'red' },
                totalImpulse: { icon: 'mdi-menu-down', cssColor: 'red' },
                specificImpulse: { icon: 'mdi-menu-down', cssColor: 'red' },
                maxPressure: { icon: 'mdi-menu-down', cssColor: 'red' },
                thrustTime: { icon: 'mdi-menu-down', cssColor: 'red' },
                averagePressure: { icon: 'mdi-menu-down', cssColor: 'red' },
                exitSpeedInitial: { icon: 'mdi-menu-down', cssColor: 'red' },
                grainMass: { icon: 'mdi-menu-down', cssColor: 'red' }
            })
    })

    test('Current motor class better than the previous one', () => {
        const motorPerformanceResult1 = {
            motorDescription: 'L1672',
            maxThrust: '2060.35',
            totalImpulse: '3603.07',
            specificImpulse: '130.65',
            maxPressure: '59.36',
            thrustTime: '12.15',
            optimalDesign: true,
            nozzleExitDiameter: '54.03',
            convergenceCrossSectionDiameter: 57.61,
            divergenceCrossSectionDiameter: 36.6356,
            exitSpeedInitial: '3.07',
            grainMass: '2.812',
            averagePressure: '49.06',
            optimalNozzleExpansionRatio: '9.65',
            classPercentage: 41
        }

        const motorPerformanceResult2 = {
            motorDescription: 'L9',
            maxThrust: '2060.34',
            totalImpulse: '3603.06',
            specificImpulse: '130.64',
            maxPressure: '59.35',
            thrustTime: '2.14',
            optimalDesign: true,
            nozzleExitDiameter: '54.03',
            convergenceCrossSectionDiameter: 57.61,
            divergenceCrossSectionDiameter: 36.6356,
            exitSpeedInitial: '3.06',
            grainMass: '2.812',
            averagePressure: '49.05',
            optimalNozzleExpansionRatio: '9.65',
            classPercentage: 41
        }

        expect(comparePerformanceResults(motorPerformanceResult1, motorPerformanceResult2))
            .toEqual({
                class: { icon: 'mdi-menu-up', cssColor: 'green' },
                maxThrust: { icon: 'mdi-menu-up', cssColor: 'green' },
                totalImpulse: { icon: 'mdi-menu-up', cssColor: 'green' },
                specificImpulse: { icon: 'mdi-menu-up', cssColor: 'green' },
                maxPressure: { icon: 'mdi-menu-up', cssColor: 'green' },
                thrustTime: { icon: 'mdi-menu-up', cssColor: 'green' },
                averagePressure: { icon: 'mdi-menu-up', cssColor: 'green' },
                exitSpeedInitial: { icon: 'mdi-menu-up', cssColor: 'green' },
                grainMass: { icon: 'mdi-menu-up', cssColor: 'green' }
            })
    })

    test('Current motor equals previous one', () => {
        const motorPerformanceResult1 = {
            motorDescription: 'L1672',
            maxThrust: '2060.35',
            totalImpulse: '3603.07',
            specificImpulse: '130.65',
            maxPressure: '59.36',
            thrustTime: '12.15',
            optimalDesign: true,
            nozzleExitDiameter: '54.03',
            convergenceCrossSectionDiameter: 57.61,
            divergenceCrossSectionDiameter: 36.6356,
            exitSpeedInitial: '3.07',
            grainMass: '2.812',
            averagePressure: '49.06',
            optimalNozzleExpansionRatio: '9.65',
            classPercentage: 41
        }

        const motorPerformanceResult2 = {
            motorDescription: 'L1672',
            maxThrust: '2060.35',
            totalImpulse: '3603.07',
            specificImpulse: '130.65',
            maxPressure: '59.36',
            thrustTime: '12.15',
            optimalDesign: true,
            nozzleExitDiameter: '54.03',
            convergenceCrossSectionDiameter: 57.61,
            divergenceCrossSectionDiameter: 36.6356,
            exitSpeedInitial: '3.07',
            grainMass: '2.812',
            averagePressure: '49.06',
            optimalNozzleExpansionRatio: '9.65',
            classPercentage: 41
        }

        expect(comparePerformanceResults(motorPerformanceResult1, motorPerformanceResult2))
            .toEqual({
                class: { icon: 'mdi-equal', cssColor: 'darkgray' },
                maxThrust: { icon: 'mdi-equal', cssColor: 'darkgray' },
                totalImpulse: { icon: 'mdi-equal', cssColor: 'darkgray' },
                specificImpulse: { icon: 'mdi-equal', cssColor: 'darkgray' },
                maxPressure: { icon: 'mdi-equal', cssColor: 'darkgray' },
                thrustTime: { icon: 'mdi-equal', cssColor: 'darkgray' },
                averagePressure: { icon: 'mdi-equal', cssColor: 'darkgray' },
                exitSpeedInitial: { icon: 'mdi-equal', cssColor: 'darkgray' },
                grainMass: { icon: 'mdi-equal', cssColor: 'darkgray' }
            })
    })

    test('Should return undefined if no previous computation', () => {
        expect(comparePerformanceResults({}, null))
            .toEqual(undefined)

        expect(comparePerformanceResults({}, undefined))
            .toEqual(undefined)
    })
})
