describe('Run computation with advanced settings', function() {

    it('Should set advanced config settings', function() {

        cy.visit('http://localhost:8080/#/motorDesign')

        cy.url().should('include', '/#/motorDesign')
        cy.contains('SI').click()
        cy.get('input#name').should('have.value', '')

        cy.get('button').contains('settings').click()

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

        cy.get('div.v-card__title').contains('Advanced settings').parent().contains('Close').click()
    })

    it('Should fill and submit the form', function(){

        const formDatas = {
            throatDiameter: 7,
            outerDiameter: 28,
            coreDiameter: 14,
            segmentLength: 80,
            numberOfSegment: 1,
            endsSurface: 'Inhibited',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantType: 'KNSB (oxidizer finely milled)',
            chamberInnerDiameter: 28,
            chamberLength: 80
        }

        cy.fillForm(formDatas, 'SI')
    })

    it('Should check result', () => {
        cy.get('input#motor-class')
            .should('have.value', 'F72')

        cy.get('input#thrust-time')
            .should('have.value', '0.91')
            .parent()
            .contains('s')

        cy.get('input#max-thrust')
            .should('have.value', '95.18')
            .parent()
            .contains('N')

        cy.get('input#total-impulse')
            .should('have.value', '64.85')
            .parent()
            .contains('Ns')

        cy.get('input#specific-impulse')
            .should('have.value', '102.35')
            .parent()
            .contains('s')

        cy.get('input#max-pressure')
            .should('have.value', '21.87')
            .parent()
            .contains('Bar')

        cy.get('input#average-pressure')
            .should('have.value', '15.99')
            .parent()
            .contains('Bar')

        cy.get('input#nozzle-exit-speed')
            .should('have.value', '1.00')
            .parent()
            .contains('Mach')

        cy.get('span').should('not.contain', 'Optimally designed')
    })
})
