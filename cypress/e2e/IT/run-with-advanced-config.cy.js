describe('Run computation with advanced settings', function() {

    it('Should set advanced config settings', function() {

        cy.visit('/motorDesign')

        cy.url().should('include', '/motorDesign')
        cy.contains('METRIC').click()
        cy.get('input#name').should('have.value', '')

        cy.get('#btnAdvancedSettings').click()

        cy.get('label').contains('Optimal nozzle design').click()
        cy.get('input#nozzleExpansionRatio').type('1')

        cy.get('input#ambiantPressureInMPa')
            .clear()
        cy.get('input#ambiantPressureInMPa')
            .type('0.0845')
        cy.get('input#ambiantPressureInMPa')
            .parent()
            .contains('MPa')
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .contains('12.255 psi')

        cy.contains('Advanced settings').parent().contains('Save').click()
    })

    it ('Should fill and submit the form', function() {
        const formDatas = {
            throatDiameter: 7,
            outerDiameter: 28,
            coreDiameter: 14,
            segmentLength: 80,
            numberOfSegment: 1,
            endsSurface: 'Inhibited',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantId: 'Sorbitol (KNSB - oxidizer finely milled)',
            chamberInnerDiameter: 28,
            chamberLength: 80
        }

        cy.fillForm(formDatas, 'METRIC')
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'F72',
            thrustTime: '0.91',
            maxThrust: '95.91',
            totalImpulse: '65.35',
            isp: '103.14',
            maxPressure: '21.86',
            averagePressure: '15.99',
            nozzleExitSpeed: '1.00'
        }

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })
})
