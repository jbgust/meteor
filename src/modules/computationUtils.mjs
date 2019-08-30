import Fingerprint2 from 'fingerprintjs2'

export const SI_UNITS = 'SI'
export const IMPERIAL_UNITS = 'IMPERIAL'

export function computeNozzleLength(sectionDiameter, angle) {
    return Number.parseFloat(sectionDiameter / 2 / Math.tan(angle / 2 * Math.PI / 180))
}

const optionsFingerprint2 = { excludes: {
    availableScreenResolution: true,
    enumerateDevices: true,
    doNotTrack: true
} }

const computationHashItem = 'computationHash'

export function computeHash() {
    Fingerprint2.get(optionsFingerprint2, function (components) {
        const values = components.map(function (component) {
            return component.value
        })
        localStorage.setItem(computationHashItem, Fingerprint2.x64hash128(values.join(''), 31))
    })
}

export function generateComputeHash() {
    if (window.requestIdleCallback) {
        requestIdleCallback(computeHash)
    } else {
        setTimeout(computeHash, 500)
    }
}

export function getComputeHash() {
    let hash = localStorage.getItem(computationHashItem)
    return hash || 'INCONNU'
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
