describe('Authentication', function() {

    it('Should sign in', () => {

        cy.visit('/')
        cy.contains('Sign out').click()

        //Check redirect to login page
        cy.visit('/#/motorDesign')
        cy.url().should('include', '/#/signin')

        cy.get('#signinEmail')
            .clear()
            .type(Cypress.env('user'))
        cy.get('#signinPassword')
            .clear()
            .type(Cypress.env('password'))

        cy.get('form').contains('Sign in').click()

        cy.url().should('include', '/#/motorDesign')

    })

    it('Should sign up', () => {
        //suppression de l'authentification
        localStorage.removeItem('token')

        cy.visit('/#/signin')

        cy.contains('Create an account.')
            .click()

        const emailPrefix = 'cypress-' + Number(Math.random()*1000).toFixed(0);
        cy.get('input#signupEmail')
            .clear()
            .type(`${emailPrefix}@meteor.fr`)

        let password = 'JYgf284!@ds';
        cy.get('input#signupPassword')
            .clear()
            .type(password)

        cy.get('input#signupPasswordConfirm')
            .clear()
            .type(password)

        cy.get('form').contains('Create account').click()

        cy.contains('An activation link has been sent to your address.')

    })

    it('Should validate account', () => {
        //suppression de l'authentification
        localStorage.removeItem('token')

        cy.visit('/#/validate?token=TOKEN-validate&tokenType=CREATION_COMPTE')

        cy.contains('Your account has been validated')

        cy.get('.v-alert')
            .contains('Sign in')
            .click()

        cy.get('#signinEmail')
            .clear()
            .type('token-test@meteor.fr')
        cy.get('#signinPassword')
            .clear()
            .type(Cypress.env('passwordUserTestToken'))

        cy.get('form').contains('Sign in').click()

        cy.url().should('include', '/#/motorDesign')
    })

    it('Should reset password', () => {
        //suppression de l'authentification
        localStorage.removeItem('token')

        cy.visit('/#/signin')

        cy.contains('Forgot password?')
            .click()

        cy.get('#emailResetPassword').clear().type('token-test@meteor.fr')
        cy.get('.v-form').contains('Reset').click()

        cy.contains("A reset link has been sent to your address.")
    })

    it('Should change password from reset link', () => {
        //suppression de l'authentification
        localStorage.removeItem('token')

        cy.visit('/#/validate?token=TOKEN-reset-pwd&tokenType=RESET_PASSWORD')

        const newPassword = Number(Math.random()*100000000).toFixed(0) + 'JHgt!hfNBv$' + Number(Math.random()*100000000).toFixed(0)

        cy.get('#newPassword').clear().type(newPassword)
        cy.get('#newPasswordConfirm').clear().type(newPassword)

        cy.get('.v-form').contains('Change password').click()

        cy.get('.v-alert')
            .contains('Sign in')
            .click()

        cy.get('#signinEmail')
            .clear()
            .type('token-test@meteor.fr')
        cy.get('#signinPassword')
            .clear()
            .type(newPassword)

        cy.get('form').contains('Sign in').click()

        cy.url().should('include', '/#/motorDesign')

    })

    it('Should ask for new validation link', () => {
        //suppression de l'authentification
        localStorage.removeItem('token')

        cy.visit('/#/validate?token=expired-token&tokenType=CREATION_COMPTE')

        cy.contains('Click here to get a new link').click()

        cy.contains('A new activation link has been sent to your address.')

    })

})
