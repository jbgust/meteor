chai.use(require('chai-string'))

describe('Run computation in imperial units', function() {

    it('Should open meteor', function() {
        cy.visit('/#/motorDesign')
        cy.get('input#name').should('have.value', '')
    })

    it('Should submit form', function() {

        const formDatas = {
            throatDiameter: 0.68464,
            outerDiameter: 2.7165354,
            coreDiameter: 0.787401,
            segmentLength: 4.527559,
            numberOfSegment: 4,
            endsSurface: 'Exposed',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantType: 'KNDX',
            chamberInnerDiameter: 2.95275,
            chamberLength: 18.503937
        }

        cy.fillForm(formDatas, 'IMPERIAL')
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'L1672',
            thrustTime: '2.15',
            maxThrust: '2060.35',
            totalImpulse: '3603.08',
            isp: '130.65',
            maxPressure: '860.89',
            averagePressure: '711.50',
            nozzleExitSpeed: '3.07',
            optimalExpansionRatio: '9.65'
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

        cy.get('span').contains('Convergence length:').parent().contains('1.96 inch')
        cy.get('span').contains('Divergence length:').parent().contains('3.39 inch')
        cy.get('span').contains('Nozzle exit diameter:').parent().contains('2.13 inch')

        cy.get('#btnCloseNozzleDesign').click()
    })

    it('Should export to RASP in IMPERIAL', function() {
        cy.server()
        cy.route('POST', '/export/rasp').as('postExportRASP')

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

        cy.wait('@postExportRASP')

        // Assert on XHR
        cy.get('@postExportRASP').then(function(xhr) {
            console.log(xhr)
            expect(xhr.status).to.eq(200)
            expect(xhr.method).to.eq('POST')
            expect(xhr.responseBody).to.startsWith(`L1672 80.0 500.0 0-1-P 2.812 4.230 METEOR
    0.0 0.0
    0.0253 917`)
        })
    })
})
