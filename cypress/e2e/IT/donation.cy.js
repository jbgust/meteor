describe('Navigation check', function() {
    it('Should open donation page', function() {
        cy.visit('/')
        cy.get('#btnDonate').click()

        cy.get('#btnDonateNow')
            .should('have.attr', 'href')
            .and('eq', 'https://pages.donately.com/meteor/campaign/meteor/donate')
    })
})
