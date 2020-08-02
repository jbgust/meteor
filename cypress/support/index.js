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

// Alternatively you can use CommonJS syntax:
// require('./commands')

let jwtToken = null

beforeEach(function() {
    // Flag cypress test in production
    localStorage.setItem('computationHash', 'cypress')

    localStorage.setItem('nextShowDonationPage', new Date().setMonth(new Date().getMonth() + 1))

    localStorage.setItem('token', Cypress.env('jwtToken'))
})

before(() => {
    cy.request('POST', 'http://localhost:8090/auth/signin',
        {
            username: Cypress.config('user'),
            password: Cypress.config('password')
        })
        .then((response) => {
            Cypress.env('jwtToken', JSON.stringify(response.body))
            Cypress.env('hasJjwtToken', true)
        })
})
