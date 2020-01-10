describe('Run end burner in SI units', function() {
    it('Should set end burner advanced config settings', function() {
        cy.visit('/#/motorDesign')

        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').parent().contains('mm')

        cy.get('input#name').should('have.value', '')
        cy.get('#btnAdvancedSettings').click()

        cy.get('label').contains('Optimal nozzle design').click()
        cy.get('input#nozzleExpansionRatio').type(8)

        cy.get('input#densityRatio').clear().type(0.96)
        cy.get('input#combustionEfficiencyRatio').clear().type(0.97)

        cy.get('div.v-card__title').contains('Advanced settings').parent().contains('Save').click()
    })

    it('Should submit form', function() {
        cy.url().should('include', '/#/motorDesign')

        const formDatas = {
            throatDiameter: 6,
            chamberInnerDiameter: 40,
            chamberLength: 75,
            propellantType: 'KNSU',
            segmentLength: 70,
            outerDiameter: 30,
            holeDiameter: 10,
            holeDepth: 10
        }

        // Flag cypress test in production
        localStorage.setItem('computationHash', 'cypress')
        cy.fillEndBurnerForm(formDatas, 'METRIC')

        // Check presence of computationHash
        expect(localStorage.getItem('computationHash')).not.to.be.null

        // Le calcul peut mettre plus de temps que le timeout sur la CI.
        cy.wait(5000)
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'G9',
            thrustTime: '10.04',
            maxThrust: '33.97',
            totalImpulse: '92.36',
            isp: '106.66',
            maxPressure: '9.79',
            averagePressure: '2.74',
            nozzleExitSpeed: '2.96'
        }

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })
})
