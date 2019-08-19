describe('Use custom propellant in SI', function() {

    it('Should set custom propellant in SI', function() {
        cy.visit('/#/motorDesign')

        cy.url().should('include', '/#/motorDesign')
        cy.contains('SI').click()


        const propellant = {
            name: 'custom KNSU',
            burnRateCoefficient: 8.26,
            pressureExponent: 0.319,
            k: 1.133,
            density: 1.889,
            molarMass: 41.98,
            k2ph: 1.044,
            chamberTemperature: 1720
        }
        cy.addPropellant(propellant, 'SI')

        // To check default selection of custom propellant
        cy.contains('custom KNSU')

        const formDatas = {
            throatDiameter: 17.39,
            outerDiameter: 69,
            coreDiameter: 20,
            segmentLength: 115,
            numberOfSegment: 4,
            endsSurface: 'Exposed',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantType: 'custom KNSU',
            chamberInnerDiameter: 75,
            chamberLength: 470
        }

        cy.fillForm(formDatas, 'SI')

        // check result
        const expectedResults = {
            motorClasss: 'L2174',
            thrustTime: '1.71',
            maxThrust: '2479.63',
            totalImpulse: '3726.09',
            isp: '134.39',
            maxPressure: '70.36',
            averagePressure: '62.07',
            nozzleExitSpeed: '3.19',
            optimalExpansionRatio: '11.71'
        }

        cy.checkPerformanceResults(expectedResults, 'SI')
    })
})
