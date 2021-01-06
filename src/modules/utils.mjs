export function extractIdFromHateoasResponse(response) {
    const self = response.data._links.self.href
    return self.substring(self.lastIndexOf('/') + 1, self.length)
}
