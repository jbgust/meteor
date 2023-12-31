import jwtDecode from 'jwt-decode'

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

export function decodeToken(token) {
    try {
        return token ? jwtDecode(token) : false
    } catch (e) {
        console.error('Invalid token')
        return false
    }
}

export function isTokenValid(accessToken) {
    try {
        const jsonToken = decodeToken(accessToken)
        if (jsonToken !== false) {
            return jsonToken.exp * 1000 > new Date().getTime() ? jsonToken : false
        }
        return false
    } catch (e) {
        console.error('Token expired')
        return false
    }
}

export function scrollToElement(elementId, options = { behavior: "smooth", block: "start", inline: "start" }) {
    document.getElementById(elementId).scrollIntoView(options);
}
