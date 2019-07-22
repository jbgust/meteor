// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


function getLengthUnit(units) {
    return units === 'SI' ? 'mm' : 'inch'
}

Cypress.Commands.add('fillForm', (formValues, units, submit = true) => {

    cy.contains(units).click()
    cy.get('input#name').should('have.value', '')

    cy.get('.v-select__selections')
        .as('coreSurfaces').eq(0)
        .click()

    cy.contains(formValues.propellantType).click()

    cy.get('@coreSurfaces').eq(1).click()
    cy.get('div.menuable__content__active')
        .contains(formValues.endsSurface).click()

    cy.get('@coreSurfaces').eq(2).click()
    cy.get('div.menuable__content__active')
        .contains(formValues.coreSurface).click()

    cy.get('@coreSurfaces').eq(3).click()
    cy.get('div.menuable__content__active')
        .contains(formValues.outerSurface).click()

    cy.get('input#throatDiameter')
        .type(formValues.throatDiameter)
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#coreDiameter')
        .type(formValues.coreDiameter)
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#outerDiameter')
        .type(formValues.outerDiameter)
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#segmentLength')
        .type(formValues.segmentLength)
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#numberOfSegment')
        .type(formValues.numberOfSegment)

    cy.get('input#chamberInnerDiameter')
        .type(formValues.chamberInnerDiameter)
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberLength')
        .type(formValues.chamberLength)
        .parent()
        .contains(getLengthUnit(units))

    if(submit){
        cy.contains('Submit').click()
    }
})
