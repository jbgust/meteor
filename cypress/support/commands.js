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
    return units === 'METRIC' ? 'mm' : 'inch'
}

function getResultPressureUnit(units) {
    return units === 'METRIC' ? 'Bar' : 'psi'
}

function getPressureUnit(units) {
    return units === 'METRIC' ? 'MPa' : 'psi'
}

function getDensityUnit(units) {
    return units === 'METRIC' ? 'g/cm3' : 'lb/cubic inch'
}

function getCstarUnit(units) {
    return units === 'METRIC' ? 'm/s' : 'feet/sec'
}
function getUnitLabel(units) {
    return units === 'METRIC' ? 'Metric' : 'Imperial'
}

export function generateId(maxInt = 1000) {
    return Number(Math.random() * maxInt).toFixed(0)
}

function applyCommonCheck(formValues, units) {
    if (!formValues.name) {
        formValues.name = `Motor-${Number(Math.random() * 1000).toFixed(0)}`
    }
    cy.contains(units).click()
    cy.get('#throatDiameter').click()
    cy.get('#throatDiameter').parent().contains(getLengthUnit(units))

    cy.get('input#name').should('have.value', '')

    cy.get('input#name').type(formValues.name)
}

Cypress.Commands.add('saveMotor', () => {
    cy.get('#btnSaveMotor').click()
    cy.contains('Motor saved')
})

Cypress.Commands.add('runSavedMotor', (motorName) => {
    cy.get('#btnOpenMotor').click()

    cy.contains(motorName)
        .parent()
        .find('button')
        .eq(0)
        .click()
})

Cypress.Commands.add('saveAndRunCheck', (motorName, expectedResults) => {
    cy.get('input#name').clear()
    cy.get('input#name').type(motorName)

    cy.saveMotor()
    cy.contains('Reset').click()
    cy.runSavedMotor(motorName)
    cy.checkPerformanceResults(expectedResults, 'METRIC')
})

Cypress.Commands.add('fillForm', (formValues, units, submit = true) => {
    applyCommonCheck(formValues, units)

    cy.get('.v-select--single')
        .as('coreSurfaces').eq(0)
        .click()

    cy.contains(formValues.propellantId).click()

    cy.get('@coreSurfaces').eq(1).click()
    cy.contains('Hollow cylinder').click()

    cy.get('.v-select--single')
        .as('coreSurfaces').eq(2).click()
    cy.get('.v-overlay__content > .v-list').contains(formValues.coreSurface).click()

    cy.get('@coreSurfaces').eq(3).click()
    cy.get('.v-overlay__content > .v-list').contains(formValues.outerSurface).click()

    cy.get('@coreSurfaces').eq(4).click()
    cy.get('.v-overlay__content > .v-list').contains(formValues.endsSurface).click()

    cy.get('input#throatDiameter')
        .type(formValues.throatDiameter)
    cy.get('input#throatDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#coreDiameter')
        .type(formValues.coreDiameter)
    cy.get('input#coreDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#outerDiameter')
        .type(formValues.outerDiameter)
    cy.get('input#outerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#segmentLength')
        .type(formValues.segmentLength)
    cy.get('input#segmentLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#numberOfSegment')
        .type(formValues.numberOfSegment)

    cy.get('input#chamberInnerDiameter')
        .type(formValues.chamberInnerDiameter)
    cy.get('input#chamberInnerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberLength')
        .type(formValues.chamberLength)
    cy.get('input#chamberLength')
        .parent()
        .contains(getLengthUnit(units))

    if (submit) {
        cy.contains('Submit').click()
    }
})

Cypress.Commands.add('fillFinocylForm', (formValues, units, submit = true) => {
    applyCommonCheck(formValues, units)

    cy.get('.v-select--single')
        .as('coreSurfaces').eq(0)
        .click()

    cy.contains(formValues.propellantId).click()

    cy.get('@coreSurfaces').eq(1).click()
    cy.get('.v-overlay__content > .v-list')
        .contains('Finocyl').click()

    cy.get('.v-select--single')
        .as('coreSurfaces')
        .eq(2).click()
    cy.get('.v-overlay__content > .v-list')
        .contains(formValues.endsSurface).click()

    cy.get('input#throatDiameter')
        .type(formValues.throatDiameter)
    cy.get('input#throatDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberInnerDiameter')
        .type(formValues.chamberInnerDiameter)
    cy.get('input#chamberInnerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberLength')
        .type(formValues.chamberLength)
    cy.get('input#chamberLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#finocylSegmentLength')
        .type(formValues.segmentLength)
    cy.get('input#finocylSegmentLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#finocylNumberOfSegment')
        .type(formValues.numberOfSegment)

    cy.get('input#finocylOuterDiameter')
        .type(formValues.outerDiameter)
    cy.get('input#finocylOuterDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#finocylInnerDiameter')
        .type(formValues.innerDiameter)
    cy.get('input#finocylInnerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#finocylFinWidth')
        .type(formValues.finWidth)
    cy.get('input#finocylFinWidth')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#finocylFinDiameter')
        .type(formValues.finDiameter)
    cy.get('input#finocylFinDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#finocylFinCount')
        .type(formValues.finCount)

    if (submit) {
        cy.contains('Submit').click()
    }
})

Cypress.Commands.add('fillStarForm', (formValues, units, submit = true) => {
    applyCommonCheck(formValues, units)

    cy.get('.v-select--single')
        .as('coreSurfaces').eq(0)
        .click()

    cy.contains(formValues.propellantId).click()

    cy.get('@coreSurfaces').eq(1).click()
    cy.get('.v-overlay__content > .v-list')
        .contains('Star').click()

    cy.get('.v-select--single')
        .as('coreSurfaces')
        .eq(2).click()
    cy.get('.v-overlay__content > .v-list')
        .contains(formValues.endsSurface).click()

    cy.get('input#throatDiameter')
        .type(formValues.throatDiameter)
    cy.get('input#throatDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberInnerDiameter')
        .type(formValues.chamberInnerDiameter)
    cy.get('input#chamberInnerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberLength')
        .type(formValues.chamberLength)
    cy.get('input#chamberLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#starSegmentLength')
        .type(formValues.segmentLength)
    cy.get('input#starSegmentLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#starNumberOfSegment')
        .type(formValues.numberOfSegment)

    cy.get('input#starOuterDiameter')
        .type(formValues.outerDiameter)
    cy.get('input#starOuterDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#starInnerDiameter')
        .type(formValues.innerDiameter)
    cy.get('input#starInnerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#starPointDiameter')
        .type(formValues.pointDiameter)
    cy.get('input#starPointDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#starPointCount')
        .type(formValues.pointCount)

    if (submit) {
        cy.contains('Submit').click()
    }
})

Cypress.Commands.add('fillMoonBurnerForm', (formValues, units, submit = true) => {
    applyCommonCheck(formValues, units)

    cy.get('.v-select--single')
        .as('coreSurfaces').eq(0)
        .click()

    cy.contains(formValues.propellantId).click()

    cy.get('@coreSurfaces').eq(1).click()
    cy.get('.v-overlay__content > .v-list')
        .contains('Moon burner').click()

    cy.get('.v-select--single')
        .as('coreSurfaces')
        .eq(2).click()
    cy.get('.v-overlay__content > .v-list')
        .contains(formValues.endsSurface).click()

    cy.get('input#throatDiameter')
        .type(formValues.throatDiameter)
    cy.get('input#throatDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberInnerDiameter')
        .type(formValues.chamberInnerDiameter)
    cy.get('input#chamberInnerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberLength')
        .type(formValues.chamberLength)
    cy.get('input#chamberLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#moonBurnerSegmentLength')
        .type(formValues.segmentLength)
    cy.get('input#moonBurnerSegmentLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#moonBurnerNumberOfSegment')
        .type(formValues.numberOfSegment)

    cy.get('input#moonBurnerOuterDiameter')
        .type(formValues.outerDiameter)
    cy.get('input#moonBurnerOuterDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#moonBurnerCoreDiameter')
        .type(formValues.coreDiameter)
    cy.get('input#moonBurnerCoreDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#moonBurnerCoreOffset')
        .type(formValues.coreOffset)
    cy.get('input#moonBurnerCoreOffset')
        .parent()
        .contains(getLengthUnit(units))

    if (submit) {
        cy.contains('Submit').click()
    }
})

Cypress.Commands.add('fillCSlotForm', (formValues, units, submit = true) => {
    applyCommonCheck(formValues, units)

    cy.get('.v-select--single')
        .as('coreSurfaces').eq(0)
        .click()

    cy.contains(formValues.propellantId).click()

    cy.get('@coreSurfaces').eq(1).click()
    cy.get('.v-overlay__content > .v-list')
        .contains('C slot').click()

    cy.get('.v-select--single')
        .as('coreSurfaces')
        .eq(2).click()
    cy.get('.v-overlay__content > .v-list')
        .contains(formValues.endsSurface).click()

    cy.get('input#throatDiameter')
        .type(formValues.throatDiameter)
    cy.get('input#throatDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberInnerDiameter')
        .type(formValues.chamberInnerDiameter)
    cy.get('input#chamberInnerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberLength')
        .type(formValues.chamberLength)
    cy.get('input#chamberLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#cSlotSegmentLength')
        .type(formValues.segmentLength)
    cy.get('input#cSlotSegmentLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#cSlotNumberOfSegment')
        .type(formValues.numberOfSegment)

    cy.get('input#cSlotOuterDiameter')
        .type(formValues.outerDiameter)
    cy.get('input#cSlotOuterDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#cSlotCoreDiameter')
        .type(formValues.coreDiameter)
    cy.get('input#cSlotCoreDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#cSlotSlotWidth')
        .type(formValues.slotWidth)
    cy.get('input#cSlotSlotWidth')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#cSlotSlotDepth')
        .type(formValues.slotDepth)
    cy.get('input#cSlotSlotDepth')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#cSlotSlotOffset')
        .type(formValues.slotOffset)
    cy.get('input#cSlotSlotOffset')
        .parent()
        .contains(getLengthUnit(units))

    if (submit) {
        cy.contains('Submit').click()
    }
})

Cypress.Commands.add('fillRodTubeForm', (formValues, units, submit = true) => {
    applyCommonCheck(formValues, units)

    cy.get('.v-select--single')
        .as('coreSurfaces').eq(0)
        .click()

    cy.contains(formValues.propellantId).click()

    cy.get('@coreSurfaces').eq(1).click()
    cy.get('.v-overlay__content > .v-list')
        .contains('Rod and tube').click()

    cy.get('.v-select--single')
        .as('coreSurfaces')
        .eq(2).click()
    cy.get('.v-overlay__content > .v-list')
        .contains(formValues.endsSurface).click()

    cy.get('input#throatDiameter')
        .type(formValues.throatDiameter)
    cy.get('input#throatDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberInnerDiameter')
        .type(formValues.chamberInnerDiameter)
    cy.get('input#chamberInnerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberLength')
        .type(formValues.chamberLength)
    cy.get('input#chamberLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#rodTubeSegmentLength')
        .type(formValues.segmentLength)
    cy.get('input#rodTubeSegmentLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#rodTubeNumberOfSegment')
        .type(formValues.numberOfSegment)

    cy.get('input#rodTubeRodDiameter')
        .type(formValues.rodDiameter)
    cy.get('input#rodTubeRodDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#rodTubeTubeOuterDiameter')
        .type(formValues.tubeOuterDiameter)
    cy.get('input#rodTubeTubeOuterDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#rodTubeTubeInnerDiameter')
        .type(formValues.tubeInnerDiameter)
    cy.get('input#rodTubeTubeInnerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    if (submit) {
        cy.contains('Submit').click()
    }
})

Cypress.Commands.add('setMotorSimAdvancedConfig', () => {
    cy.get('input#name').should('have.value', '')
    cy.get('#throatDiameter').parent().contains('mm')

    cy.get('input#name').should('have.value', '')
    cy.get('#btnAdvancedSettings').click()

    cy.get('label').contains('Optimal nozzle design').click()
    cy.get('input#nozzleExpansionRatio').type(8)

    cy.get('input#densityRatio').clear()
    cy.get('input#densityRatio').type(0.96)

    cy.get('input#combustionEfficiencyRatio').clear()
    cy.get('input#combustionEfficiencyRatio').type(0.97)

    cy.contains('Advanced settings').parent().contains('Save').click()
})

Cypress.Commands.add('fillEndBurnerForm', (formValues, units, submit = true) => {
    applyCommonCheck(formValues, units)

    cy.get('.v-select--single')
        .as('coreSurfaces').eq(0)
        .click()

    cy.contains(formValues.propellantId).click()

    cy.get('@coreSurfaces').eq(1).click()
    cy.get('.v-overlay__content > .v-list')
        .contains('End burner').click()

    cy.get('input#throatDiameter')
        .type(formValues.throatDiameter)
    cy.get('input#throatDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberInnerDiameter')
        .type(formValues.chamberInnerDiameter)
    cy.get('input#chamberInnerDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#chamberLength')
        .type(formValues.chamberLength)
    cy.get('input#chamberLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#endBurnerSegmentLength')
        .type(formValues.segmentLength)
    cy.get('input#endBurnerSegmentLength')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#endBurnerOuterDiameter')
        .type(formValues.outerDiameter)
    cy.get('input#endBurnerOuterDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#endBurnerHoleDiameter')
        .type(formValues.holeDiameter)
    cy.get('input#endBurnerHoleDiameter')
        .parent()
        .contains(getLengthUnit(units))

    cy.get('input#endBurnerHoleDepth')
        .type(formValues.holeDepth)
    cy.get('input#endBurnerHoleDepth')
        .parent()
        .contains(getLengthUnit(units))

    if (submit) {
        cy.contains('Submit').click()
    }
})

Cypress.Commands.add('checkPerformanceResults', (expectedResults, units) => {
    cy.get('input#motor-class')
        .should('have.value', expectedResults.motorClasss)

    cy.get('input#thrust-time')
        .should('have.value', expectedResults.thrustTime)
        .parent()
        .contains('s')

    cy.get('input#max-thrust')
        .should('have.value', expectedResults.maxThrust)
        .parent()
        .contains('N')

    cy.get('input#total-impulse')
        .should('have.value', expectedResults.totalImpulse)
        .parent()
        .contains('Ns')

    cy.get('input#specific-impulse')
        .should('have.value', expectedResults.isp)
        .parent()
        .contains('s')

    cy.get('input#max-pressure')
        .should('have.value', expectedResults.maxPressure)
        .parent()
        .contains(getResultPressureUnit(units))

    cy.get('input#average-pressure')
        .should('have.value', expectedResults.averagePressure)
        .parent()
        .contains(getResultPressureUnit(units))

    cy.get('input#nozzle-exit-speed')
        .should('have.value', expectedResults.nozzleExitSpeed)
        .parent()
        .contains('Mach')

    if (expectedResults.optimalExpansionRatio) {
        cy.get('p')
            .contains('Optimally designed nozzle with an expansion ratio of ' + expectedResults.optimalExpansionRatio)
    }
})

Cypress.Commands.add("addPropellant", (propellant, unit, closeForm = true) => {

    cy.get('.v-dialog--fullscreen > .v-overlay__content > .v-card > .v-card-title').contains('Custom propellant')

    cy.get('.v-select--single')
        .eq(3)
        .click()
    cy.get('.v-overlay__content > .v-list')
        .contains(getUnitLabel(unit)).click()

    cy.get('input#propellantName')
        .type(propellant.name)

    if (propellant.cstar) {
        cy.get('input#cstar')
            .type(propellant.cstar)
        cy.get('input#cstar')
            .parent()
            .contains(getCstarUnit(unit))
    } else {
        cy.get('input#cstar')
            .parent()
            .contains(getCstarUnit(unit))
    }

    if (propellant.burnRateCoefficient) {
        cy.get('input#burnRateCoefficient')
            .type(propellant.burnRateCoefficient)
    }

    if(propellant.pressureExponent) {
        cy.get('input#pressureExponent')
            .type(propellant.pressureExponent)
    }

    cy.get('input#k')
        .type(propellant.k)

    cy.get('input#density')
        .type(propellant.density)
    cy.get('input#density')
        .parent()
        .contains(getDensityUnit(unit))

    cy.get('input#molarMass')
        .type(propellant.molarMass)
    cy.get('input#molarMass')
        .parent()
        .contains('kg/kmol')

    if (propellant.k2ph) {
        cy.get('input#k2ph-switch')
            .parent()
            .click()
        cy.get('input#k2ph')
            .type(propellant.k2ph)
    }

    if (propellant.chamberTemperature) {
        cy.get('input#chamberTemperature-switch')
            .parent()
            .click()
        cy.get('input#chamberTemperature')
            .type(propellant.chamberTemperature)
    }

    if(closeForm) {
        cy.get('#savePropellant').click()
    }
})

Cypress.Commands.add('addComplexeBurnRate', (burnRateDataSet, unit) => {
    cy.get('input#complexBurnRate-switch')
        .parent()
        .click()

    burnRateDataSet.forEach(item => {
        cy.get('#addBurRateDateBtn')
            .click()

        cy.get('input#startPressureInput')
            .type(item.fromPressureIncluded)
        cy.get('input#startPressureInput').parent()
            .contains(getPressureUnit(unit))

        cy.get('input#endPressureInput')
            .type(item.toPressureExcluded)
        cy.get('input#endPressureInput')
            .parent()
            .contains(getPressureUnit(unit))

        cy.get('input#burnRateCoeffInput')
            .type(item.burnRateCoefficient)
        cy.get('input#burnRateCoeffInput')
            .parent()

        cy.get('input#pressureExponentInput').type(item.pressureExponent)
        cy.get('input#pressureExponentInput').parent()

        cy.get('#saveBurnRateDataBtn')
            .click()
    })
    cy.get('#savePropellant').click()
})
