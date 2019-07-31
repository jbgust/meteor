import { greaterThanValidator, greaterThanValidatorNotRequired } from '../modules/formValidationRules'

function getPropellantID(propellantName) {
    return 'CUSTOM_' + propellantName
}

export function isCustomPropellant(propellantType) {
    return propellantType && propellantType.startsWith('CUSTOM_')
}

export function getCustomPropellant(propellantId) {
    return JSON.parse(localStorage.getItem(propellantId))
}

export function validatePropellant(propellant) {
    return (greaterThanValidator(0)(propellant.cstar) || greaterThanValidator(0)(propellant.chamberTemperature)) &&
        (
            (greaterThanValidator(0)(propellant.burnRateCoefficient) && greaterThanValidator(0)(propellant.pressureExponent)) ||
            validateComplexBurnRateData(propellant.burnRateDataSet)
        ) &&
        greaterThanValidator(0)(propellant.k) &&
        greaterThanValidator(0)(propellant.density) &&
        greaterThanValidator(0)(propellant.molarMass) &&
        greaterThanValidatorNotRequired(0)(propellant.k2ph) &&
        greaterThanValidatorNotRequired(0)(propellant.chamberTemperature)
}

export function validateComplexBurnRateData(burnRateDataSet) {
    return burnRateDataSet && burnRateDataSet.length > 0
}

export function setCustomPropellant(propellantName, propellant) {
    let propellantID = getPropellantID(propellantName)
    localStorage.setItem(propellantID, JSON.stringify(propellant))
    return propellantID
}
