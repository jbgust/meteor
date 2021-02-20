// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './mockCommands'
// Alternatively you can use CommonJS syntax:
// require('./commands')

const TOKEN_STORAGE_KEY = 'accessToken'

beforeEach(function() {
    localStorage.setItem('nextShowDonationPage', new Date().setMonth(new Date().getMonth() + 1))

    localStorage.setItem(TOKEN_STORAGE_KEY, Cypress.env('jwtToken'))

    // Do not show registration info
    localStorage.setItem('authenticationInfoRead', '1')
})

before(() => {
    cy.request('POST', Cypress.env('urlAuth'),
        {
            username: Cypress.env('user'),
            password: Cypress.env('password')
        })
        .then((response) => {
            Cypress.env('jwtToken', response.body.accessToken)
            Cypress.env('hasJjwtToken', true)
        })
})
