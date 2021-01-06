export function extractIdFromHateoasResponse(response) {
    const self = response.data._links.self.href
    return self.substring(self.lastIndexOf('/') + 1, self.length)
}

export function shortLabel(label, maxLength = 50) {
    const maxLineLength = 40
    if (label && label.length > maxLineLength) {
        var ret = []
        var i
        var len
        for (i = 0, len = label.length; i < len; i += maxLineLength) {
            ret.push(label.substr(i, maxLineLength))
        }
        label = ret.join('\n')
    }
    if (label && label.length > maxLength) {
        return `${label.substring(0, maxLength)}...`
    }
    return label
}
