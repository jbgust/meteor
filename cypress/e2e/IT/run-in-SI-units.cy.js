describe('Run computation in SI units', function() {
    it('Should open meteor from menu', function() {
        cy.visit('/#/motorDesign')

        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').parent().contains('mm')

        // check message about default unit
        cy.contains('By default you are on metric units. You can change it above.')
    })

    it('Should submit form', function() {
        cy.url().should('include', '/#/motorDesign')

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
            motorClasss: 'F80',
            thrustTime: '0.91',
            maxThrust: '108.77',
            totalImpulse: '72.37',
            isp: '114.21',
            maxPressure: '21.86',
            averagePressure: '16.00',
            nozzleExitSpeed: '2.43',
            optimalExpansionRatio: '3.47'
        }

        cy.get('input#motor-class')
            .parent()
            .contains("81%")

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })

    it('Should design nozzle', () => {
        cy.get('button').contains('Nozzle design').click()

        cy.get('input#convergenceAngle')
            .clear()
            .type(38)

        cy.get('input#divergenceAngle')
            .clear()
            .type(18)

        cy.get('span').contains('Convergence length:').parent().contains('30.49 mm')
        cy.get('span').contains('Divergence length:').parent().contains('19.08 mm')
        cy.get('span').contains('Nozzle exit diameter:').parent().contains('13.04 mm')

        cy.get('#btnCloseNozzleDesign > .v-btn__content > .v-icon').click()
    })
})

describe('Should dislay error from backend', function() {
    it('Should dislay error from backend', function() {
        cy.visit('/#/motorDesign')
        cy.reload()


        const formDatas = {
            throatDiameter: 7,
            outerDiameter: 28,
            coreDiameter: 14,
            segmentLength: 80,
            numberOfSegment: 1,
            endsSurface: 'Inhibited',
            coreSurface: 'Inhibited',
            outerSurface: 'Inhibited',
            propellantId: 'Sorbitol (KNSB - oxidizer finely milled)',
            chamberInnerDiameter: 28,
            chamberLength: 80
        }

        cy.fillForm(formDatas, 'METRIC')

        cy.get('.v-dialog > .v-card')
            .contains('Computation failed')

        cy.get('.v-dialog > .v-card')
            .contains('The motor should have at least core surface or outer surface exposed.')
    })
})
