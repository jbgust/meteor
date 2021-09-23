export function extractIdFromHateoasResponse(response) {
    const self = response.data._links.self.href
    return self.substring(self.lastIndexOf('/') + 1, self.length)
}

export function shortLabel(label, maxLength = 50) {
    if (label && label.length > maxLength) {
        return `${label.substring(0, maxLength)}...`
    }
    return label
}
