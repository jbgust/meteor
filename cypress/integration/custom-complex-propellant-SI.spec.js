describe('Use custom propellant with advance burn rate in SI', function() {
    it('Should set custom propellant in SI', function() {
        cy.visit('/#/motorDesign')

        cy.url().should('include', '/#/motorDesign')
        cy.contains('SI').click()

        cy.fixture('custom-KNDX-complexe-si.json').then(propellant => {

            cy.addPropellant(propellant, 'SI', false)
            cy.addComplexeBurnRate(propellant.burnRateDataSet, 'SI')
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
})
