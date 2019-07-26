describe('Use custom propellant with advance burn rate in SI', function() {
    it('Should set custom propellant in SI', function() {
        cy.visit('http://localhost:8080/#/motorDesign')

        cy.url().should('include', '/#/motorDesign')
        cy.contains('SI').click()

        const propellant = {
            name: 'custom KNDX',
            k: 1.131,
            density: 1.879,
            molarMass: 42.39,
            k2ph: 1.043,
            chamberTemperature: 1710,
            burnRateDataSet: [
                {
                    fromPressureIncluded: '0.1',
                    toPressureExcluded: '0.779',
                    burnRateCoefficient: '8.87544496778536',
                    pressureExponent: '0.6193'
                },
                {
                    fromPressureIncluded: '0.779',
                    toPressureExcluded: '2.572',
                    burnRateCoefficient: '7.55278442387944',
                    pressureExponent: '-0.0087'
                },
                {
                    fromPressureIncluded: '2.572',
                    toPressureExcluded: '5.930',
                    burnRateCoefficient: '3.84087990499602',
                    pressureExponent: '0.6882'
                },
                {
                    fromPressureIncluded: '5.930',
                    toPressureExcluded: '8.502',
                    burnRateCoefficient: '17.2041864098062',
                    pressureExponent: '-0.1481'
                },
                {
                    fromPressureIncluded: '8.502',
                    toPressureExcluded: '11.20',
                    burnRateCoefficient: '4.77524086347659',
                    pressureExponent: '0.4417'
                }
            ]
        }

        cy.addPropellant(propellant, 'SI', false)
        cy.addComplexeBurnRate(propellant.burnRateDataSet)
        // To check default selection of custom propellant
        cy.contains('custom KNDX')

        const formDatas = {
            throatDiameter: 17.39,
            outerDiameter: 69,
            coreDiameter: 20,
            segmentLength: 115,
            numberOfSegment: 4,
            endsSurface: 'Exposed',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantType: 'custom KNDX',
            chamberInnerDiameter: 75,
            chamberLength: 470
        }

        cy.fillForm(formDatas, 'SI')

        // check result
        const expectedResults = {
            motorClasss: 'L1672',
            thrustTime: '2.15',
            maxThrust: '2060.22',
            totalImpulse: '3602.79',
            isp: '130.64',
            maxPressure: '59.35',
            averagePressure: '49.05',
            nozzleExitSpeed: '3.07',
            optimalExpansionRatio: '9.65'
        }

        cy.checkPerformanceResults(expectedResults, 'SI')
    })
})
