const propellantName = 'CrudPropellant'
const propellant = {
    name: propellantName,
    burnRateCoefficient: 8.26,
    pressureExponent: 0.319,
    k: 1.133,
    density: 1.889,
    molarMass: 41.98,
    k2ph: 1.044,
    chamberTemperature: 1720
}

describe('Crud propellant', () => {
    it('Should save form', () => {
        cy.visit('/#/motorDesign')
        cy.get('button#custom-propellant-add').click()
        cy.contains('New propellant').click()

        cy.addPropellant(propellant, 'METRIC')

        cy.contains(propellantName)
    })

    it('Should not save 2 propellant with same name', () => {
        cy.contains('New propellant').click()

        cy.addPropellant(propellant, 'METRIC')

        cy.contains('A propellant already own this name, please change it.')

        cy.get('#closePropellantEditor').click()
    })

    it('Should update propellant', () => {
        const description = 'My new description'

        cy.contains(propellantName)
            .parent()
            .find('button')
            .eq(0)
            .click()

        cy.get('textarea#propellantDescription')
            .type(description)

        cy.get('#savePropellant').click()

        cy.contains('Propellants')
            .parent()
            .contains(description)
    })

    it('Should delete saved propellant', () => {
        cy.contains(propellantName)
            .parent()
            .find('button')
            .eq(1)
            .click()

        cy.contains(`Delete "${propellantName}"`)
            .parent()
            .find('button')
            .contains('No')
            .click()

        cy.contains(propellantName)
            .parent()
            .find('button')
            .eq(1)
            .click()

        cy.contains(`Delete "${propellantName}"`)
            .parent()
            .find('button')
            .contains('Yes')
            .click()

        cy.contains('Propellants')
            .parent()
            .contains(propellantName).should('not.exist')
    })

    it('Should display units correctly', () => {
        cy.visit('/#/motorDesign')
        // set main form to metric
        cy.contains('METRIC').click()

        cy.get('button#custom-propellant-add').click()
        cy.contains('New propellant').click()

        // set propellant unit to IMPERIAL
        cy.get('.v-select__selections')
            .eq(3)
            .click()
        cy.get('div.menuable__content__active')
            .contains('Imperial').click()

        // check propellant form are in imperial
        cy.contains('lb/cubic inch')

        // check burn rate form are in imperial
        cy.get('input#complexBurnRate-switch')
            .parent()
            .click()
        cy.get('#addBurRateDateBtn')
            .click()
        cy.contains('psi')
    })
})
