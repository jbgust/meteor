import { generateId } from '../../support/commands'

const TOKEN_STORAGE_KEY = 'accessToken-1'

describe('Authentication', function() {
    it('Should sign in', () => {
        cy.visit('/')
        cy.contains('Sign out').click()

        // Check redirect to login page
        cy.visit('/motorDesign')
        cy.url().should('include', '/signin')

        cy.get('#signinEmail')
            .clear()
        cy.get('#signinEmail')
            .type(Cypress.env('user'))
        cy.get('#signinPassword')
            .clear()
        cy.get('#signinPassword')
            .type(Cypress.env('password'))

        cy.get('form').contains('Sign in').click()

        cy.url().should('include', '/motorDesign')
    })

    it('Should sign up', () => {
        // suppression de l'authentification
        localStorage.removeItem(TOKEN_STORAGE_KEY)

        cy.visit('/signin')

        cy.contains('Create an account')
            .click()

        const emailPrefix = 'cypress-' + generateId()
        cy.get('input#signupEmail')
            .clear()
        cy.get('input#signupEmail')
            .type(`${emailPrefix}@meteor.fr`)

        let password = 'JYgf284!@ds'
        cy.get('input#signupPassword')
            .clear()
        cy.get('input#signupPassword')
            .type(password)

        cy.get('input#signupPasswordConfirm')
            .clear()
        cy.get('input#signupPasswordConfirm')
            .type(password)

        cy.get('form').contains('Create account').click()

        cy.contains('An activation link has been sent to your address. Also please check the Spam folder in your mailbox.')
    })

    it('Should validate account', () => {
        // suppression de l'authentification
        localStorage.removeItem(TOKEN_STORAGE_KEY)

        cy.visit('/validate?token=TOKEN-validate&tokenType=CREATION_COMPTE')

        cy.contains('Your account has been validated')

        cy.get('.v-alert')
            .contains('Sign in')
            .click()

        cy.get('#signinEmail')
            .clear()
        cy.get('#signinEmail')
            .type('token-test@meteor.fr')
        cy.get('#signinPassword')
            .clear()
        cy.get('#signinPassword')
            .type(Cypress.env('passwordUserTestToken'))

        cy.get('form').contains('Sign in').click()

        cy.url().should('include', '/motorDesign')
    })

    it('Should reset password', () => {
        // suppression de l'authentification
        localStorage.removeItem(TOKEN_STORAGE_KEY)

        cy.visit('/signin')

        cy.contains('Forgot password?')
            .click()

        cy.get('#emailResetPassword').clear()
        cy.get('#emailResetPassword').type('token-test@meteor.fr')

        cy.get('.v-form').contains('Reset').click()

        cy.contains('A reset link has been sent to your address. Also please check the Spam folder in your mailbox.')
    })

    it('Should change password from reset link', () => {
        // suppression de l'authentification
        localStorage.removeItem(TOKEN_STORAGE_KEY)

        cy.visit('/validate?token=TOKEN-reset-pwd&tokenType=RESET_PASSWORD')

        const newPassword = generateId(100000000) + 'JHgt!hfNBv$' + generateId(100000000)

        cy.get('#newPassword').clear()
        cy.get('#newPassword').type(newPassword)

        cy.get('#newPasswordConfirm').clear()
        cy.get('#newPasswordConfirm').type(newPassword)

        cy.get('.v-form').contains('Change password').click()

        cy.get('.v-alert')
            .contains('Sign in')
            .click()

        cy.get('#signinEmail')
            .clear()
        cy.get('#signinEmail')
            .type('token-test@meteor.fr')
        cy.get('#signinPassword')
            .clear()
        cy.get('#signinPassword')
            .type(newPassword)

        cy.get('form').contains('Sign in').click()

        cy.url().should('include', '/motorDesign')
    })

    it('Should ask for new validation link', () => {
        // suppression de l'authentification
        localStorage.removeItem(TOKEN_STORAGE_KEY)

        cy.visit('/validate?token=expired-token&tokenType=CREATION_COMPTE')

        cy.contains('Click here to get a new link').click()

        cy.contains('A new activation link has been sent to your address. Also please check the Spam folder in your mailbox.')
    })
})
