import Fingerprint2 from 'fingerprintjs2'

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
    let hash = localStorage.getItem(computationHashItem);
    return hash || 'INCONNU'
}
