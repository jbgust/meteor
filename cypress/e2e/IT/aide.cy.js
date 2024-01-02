describe('Help page', function() {

    it('Go to Meteor', function() {
        cy.visit('/')
        cy.get('i#btnMeteor').click()
        cy.url().should('include', '/motorDesign')
    })

    it('Should display help content', function() {
        cy.get('button#btnHelp').click()
        cy.contains('Meteor Manual')
    })

    it('Should close help', function() {
        cy.get('#btnCloseHelp').click()
        cy.should('not.contain', 'Meteor Manual')
    })

    it('Should display help when computation failed', function() {

        const formDatas = {
            throatDiameter: 7,
            outerDiameter: 28,
            coreDiameter: 6,
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

        cy.contains('Read documentation').click()

        cy.contains("Meteor Manual")
    })

})
