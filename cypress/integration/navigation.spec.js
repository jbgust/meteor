describe('Navigation check', function() {
    it('Should open notification', function() {
        cy.visit('/#/demo')
        cy.get('i#newsMeteorBtn')
            .click()
        cy.get('#bottomPageNews')
            .contains('What\'s new')
    })
    it('Should open forum', function() {
        cy.visit('/')
        cy.get('i#btnForumMeteor')
            .parent()
            .parent()
            .should('have.attr', 'href')
            .and('eq', 'http://meteor.boards.net/')
    })
    it('Should open meteor from menu', function() {
        cy.visit('/')
        cy.get('i#btnMeteor').click()

        cy.url().should('include', '/#/motorDesign')

        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').parent().contains('inch')
    })

    it('Should open meteor from demo page', function() {
        cy.visit('/#/demo')
        cy.contains('Try it !').click()

        cy.url().should('include', '/#/motorDesign')

        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').parent().contains('inch')
    })

    it('Should open meteor from home page', function() {
        cy.visit('/')
        cy.get('#btnTryIt').click()

        cy.url().should('include', '/#/motorDesign')

        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').parent().contains('inch')
    })
})
