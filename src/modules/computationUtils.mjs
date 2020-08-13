export const SI_UNITS = 'SI'
export const IMPERIAL_UNITS = 'IMPERIAL'

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
