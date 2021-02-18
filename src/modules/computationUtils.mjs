export const SI_UNITS = 'SI'
export const IMPERIAL_UNITS = 'IMPERIAL'

export function getUnit(unitSelected) {
    if (unitSelected === SI_UNITS) {
        return { type: unitSelected, lengthUnit: 'mm', pressureUnit: 'MPa', resultPressureUnit: 'Bar', massUnit: 'Kg', massFluxUnit: 'Kg/s', speedUnit: 'm/s', densityUnit: 'g/cm3' }
    } else {
        return { type: unitSelected, lengthUnit: 'inch', pressureUnit: 'psi', resultPressureUnit: 'psi', massUnit: 'lb', massFluxUnit: 'lb/s', speedUnit: 'feet/sec', densityUnit: 'lb/cubic inch' }
    }
}

export function comparePerformanceResults(currentComputation, previousComputation) {
    if (!previousComputation) {
        return undefined
    }
    return {
        class: getComparisonMotorDescription(currentComputation.motorDescription, previousComputation.motorDescription),
        maxThrust: getComparisonResult(currentComputation.maxThrust, previousComputation.maxThrust),
        totalImpulse: getComparisonResult(currentComputation.totalImpulse, previousComputation.totalImpulse),
        specificImpulse: getComparisonResult(currentComputation.specificImpulse, previousComputation.specificImpulse),
        maxPressure: getComparisonResult(currentComputation.maxPressure, previousComputation.maxPressure),
        thrustTime: getComparisonResult(currentComputation.thrustTime, previousComputation.thrustTime),
        averagePressure: getComparisonResult(currentComputation.averagePressure, previousComputation.averagePressure),
        exitSpeedInitial: getComparisonResult(currentComputation.exitSpeedInitial, previousComputation.exitSpeedInitial),
        grainMass: getComparisonResult(currentComputation.exitSpeedInitial, previousComputation.exitSpeedInitial)
    }
}

const betterPerformanceStyle = { icon: 'mdi-menu-up', cssColor: 'green' }
const worstPerformanceStyle = { icon: 'mdi-menu-down', cssColor: 'red' }
const samePerformanceStyle = { icon: 'mdi-equal', cssColor: 'darkgray' }

function getComparisonResult(currentValue, previousValue) {
    const numberCurrentValue = Number(currentValue)
    const numberPreviousValue = Number(previousValue)
    if (isNaN(numberCurrentValue) && isNaN(numberPreviousValue)) {
        return null
    } else {
        if (numberCurrentValue > numberPreviousValue) {
            return betterPerformanceStyle
        } else if (numberCurrentValue < numberPreviousValue) {
            return worstPerformanceStyle
        } else {
            return samePerformanceStyle
        }
    }
}

function getComparisonMotorDescription(currentValue, previousValue) {
    if (currentValue[0] > previousValue[0]) {
        return betterPerformanceStyle
    } else if (currentValue[0] < previousValue[0]) {
        return worstPerformanceStyle
    } else {
        const totalImpulseCurrentMotor = Number(currentValue.substring(1, currentValue.length))
        const totalImpulsePreviousMotor = Number(previousValue.substring(1, previousValue.length))
        if (totalImpulseCurrentMotor > totalImpulsePreviousMotor) {
            return betterPerformanceStyle
        } else if (totalImpulseCurrentMotor < totalImpulsePreviousMotor) {
            return worstPerformanceStyle
        } else {
            return samePerformanceStyle
        }
    }
}

export function computeNozzleLength(sectionDiameter, angle) {
    return Number.parseFloat(sectionDiameter / 2 / Math.tan(angle / 2 * Math.PI / 180))
}

export function hasSelectedUnits() {
    const selectedUnit = getSelectedUnit()
    return selectedUnit === IMPERIAL_UNITS || selectedUnit === SI_UNITS
}

export function setSelectedUnits(unit) {
    if (unit === IMPERIAL_UNITS || unit === SI_UNITS) {
        localStorage.setItem('unitSelected', unit)
    } else {
        console.error(`Unit ${unit} not known.`)
    }
}

export function getSelectedUnit() {
    return localStorage.getItem('unitSelected')
}

export function getSelectedUnitOrSI() {
    return getSelectedUnit() || SI_UNITS
}
