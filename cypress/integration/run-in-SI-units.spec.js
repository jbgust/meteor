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
            propellantType: 'KNSB (oxidizer finely milled)',
            chamberInnerDiameter: 28,
            chamberLength: 80
        }

        cy.fillForm(formDatas, 'METRIC')
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'F82',
            thrustTime: '0.91',
            maxThrust: '111.61',
            totalImpulse: '73.99',
            isp: '116.78',
            maxPressure: '21.87',
            averagePressure: '16.00',
            nozzleExitSpeed: '2.53',
            optimalExpansionRatio: '4.00'
        }

        cy.get('input#motor-class')
            .parent()
            .contains("85%")

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
        cy.get('span').contains('Divergence length:').parent().contains('22.09 mm')
        cy.get('span').contains('Nozzle exit diameter:').parent().contains('14.00 mm')
    })
})

describe('Should dislay error from backend', function() {
    it('Should dislay error from backend', function() {
        cy.visit('/#/motorDesign')

        const formDatas = {
            throatDiameter: 7,
            outerDiameter: 28,
            coreDiameter: 14,
            segmentLength: 80,
            numberOfSegment: 1,
            endsSurface: 'Inhibited',
            coreSurface: 'Inhibited',
            outerSurface: 'Inhibited',
            propellantType: 'KNSB (oxidizer finely milled)',
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
