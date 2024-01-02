const formDatas = {
    throatDiameter: 0.68464,
    outerDiameter: 2.7165354,
    coreDiameter: 0.787401,
    segmentLength: 4.527559,
    numberOfSegment: 4,
    endsSurface: 'Exposed',
    coreSurface: 'Exposed',
    outerSurface: 'Inhibited',
    propellantId: 'KNDX',
    chamberInnerDiameter: 2.95275,
    chamberLength: 18.503937
}
describe('Run computation in imperial units', function() {
    it('Should open meteor', function() {
        cy.visit('/motorDesign')
        cy.get('input#name').should('have.value', '')
    })

    it('Should submit form', function() {
        cy.fillForm(formDatas, 'IMPERIAL')
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'L1607',
            thrustTime: '2.16',
            maxThrust: '1977.74',
            totalImpulse: '3464.48',
            isp: '125.62',
            maxPressure: '860.62',
            averagePressure: '710.88',
            nozzleExitSpeed: '2.95',
            optimalExpansionRatio: '7.95'
        }

        cy.checkPerformanceResults(expectedResults, 'IMPERIAL')
    })

    it('Should design nozzle', () => {
        cy.get('button').contains('Nozzle design').click()

        cy.get('input#convergenceAngle')
            .clear()
            .type(60)

        cy.get('input#divergenceAngle')
            .clear()
            .type(24)

        cy.get('span').contains('Convergence length:').parent().contains('1.9642 inch')
        cy.get('span').contains('Divergence length:').parent().contains('2.9299 inch')
        cy.get('span').contains('Nozzle exit diameter:').parent().contains('1.9302 inch')

        cy.get('#btnCloseNozzleDesign').click()
    })

    it.skip('Should export to RASP in IMPERIAL', function() {

        cy.get('button#btnShowRASPExport').click()

        cy.get('input#motorDiameter').clear().type(3.14961)
            .parent()
            .contains('inch')
        cy.get('input#motorLength').clear().type(19.685)
            .parent()
            .contains('inch')
        cy.get('input#motorWeight').clear().type(9.325554)
            .parent()
            .contains('lb')
        cy.get('input#delay').clear().type('0-1-P')
            .parent()
            .contains('s')

        cy.get('button#btnExportRASP').click()

        cy.readFile(`cypress/downloads/meteor-RASP_${formDatas.name}.eng`)
            .should('contain',`L1607 80.0 500.0 0-1-P 2.812 4.230 METEOR
    0.0 0.0
    0.0253 889.141`)
    })
})
