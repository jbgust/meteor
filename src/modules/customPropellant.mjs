import { greaterThanValidator, greaterThanValidatorNotRequired } from '../modules/formValidationRules'
import { NATIVE_PROPELLANTS } from '@/modules/grainsConstants'

export function isCustomPropellant(propellantId) {
    return propellantId && !NATIVE_PROPELLANTS.map(propellant => propellant.value).includes(propellantId)
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
