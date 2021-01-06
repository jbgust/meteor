describe('Run computation with advanced settings', function() {

    it('Should set advanced config settings', function() {

        cy.visit('/#/motorDesign')

        cy.url().should('include', '/#/motorDesign')
        cy.contains('METRIC').click()
        cy.get('input#name').should('have.value', '')

        cy.get('#btnAdvancedSettings').click()

        cy.get('label').contains('Optimal nozzle design').click()
        cy.get('input#nozzleExpansionRatio').type(1)

        cy.get('input#ambiantPressureInMPa')
            .clear()
            .type(0.0845)
            .parent()
            .contains('MPa')
            .parent()
            .parent()
            .parent()
            .contains('12.255 psi')

        cy.get('div.v-card__title').contains('Advanced settings').parent().contains('Save').click()
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
            propellantId: 'KNSB (oxidizer finely milled)',
            chamberInnerDiameter: 28,
            chamberLength: 80
        }

        cy.fillForm(formDatas, 'METRIC')
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'F72',
            thrustTime: '0.91',
            maxThrust: '95.18',
            totalImpulse: '64.85',
            isp: '102.35',
            maxPressure: '21.87',
            averagePressure: '15.99',
            nozzleExitSpeed: '1.00'
        }

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })
})
