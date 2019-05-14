function getPropellantID(propellantName) {
    return 'CUSTOM_' + propellantName
}

export function isCustomPropellant(propellantType) {
    return propellantType && propellantType.startsWith('CUSTOM_')
}

export function getCustomPropellant(propellantId) {
    return JSON.parse(localStorage.getItem(propellantId))
}

export function setCustomPropellant(propellantName, propellant) {
    return localStorage.setItem(getPropellantID(propellantName), JSON.stringify(propellant))
}
