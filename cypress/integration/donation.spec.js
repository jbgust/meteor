describe('Navigation check', function() {
    it('Should open donation page', function() {
        cy.visit('/')
        cy.get('#btnDonate').click()

        cy.get('#btnDonateNow')
            .should('have.attr', 'href')
            .and('eq', 'https://pages.donately.com/meteor/campaign/meteor/donate')
    })

    it('Should automatically open donation form', function() {

        localStorage.setItem('nextShowDonationPage', new Date())
        cy.visit('/')
        cy.get('#btnTryIt').click()

        cy.url().should('include', '/#/motorDesign')

        cy.get('#btnDonateNow')
            .should('have.attr', 'href')
            .and('eq', 'https://pages.donately.com/meteor/campaign/meteor/donate')
    })
})
