describe('Run Star in SI units', function() {
    it('Should set star advanced config settings', function() {
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
            throatDiameter: 10,
            chamberInnerDiameter: 40,
            chamberLength: 150,
            propellantType: 'KNSU',
            segmentLength: 70,
            numberOfSegment: 2,
            outerDiameter: 30,
            innerDiameter: 5,
            pointDiameter: 15,
            pointCount: 5,
            endsSurface: 'Exposed'
        }

        // Flag cypress test in production
        localStorage.setItem('computationHash', 'cypress')
        cy.fillStarForm(formDatas, 'METRIC')

        // Check presence of computationHash
        expect(localStorage.getItem('computationHash')).not.to.be.null

        // Le calcul peut mettre plus de temps que le timeout sur la CI.
        cy.wait(5000)
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'H197',
            thrustTime: '1.02',
            maxThrust: '366.78',
            totalImpulse: '201.53',
            isp: '124.17',
            maxPressure: '33.75',
            averagePressure: '20.27',
            nozzleExitSpeed: '2.96'
        }

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })
})
