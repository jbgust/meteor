import { expect, test, describe } from 'vitest'
import { news, getNewNewsIds, getReadNewsIds, markNewsAsRead } from '../../src/modules/news'

describe('News content tests', () => {
    test('Should get ids of read news', () => {
        expect(getReadNewsIds()).toEqual([])

        localStorage.setItem('newsRead', JSON.stringify([1, 2, 3]))
        expect(getReadNewsIds()).toEqual([1, 2, 3])
    })

    test('Should return unread news Ids', () => {
        localStorage.removeItem('newsRead')
        const allNewsIds = news.map(value => value.id)

        expect(getNewNewsIds()).toEqual(allNewsIds)

        // read first news
        localStorage.setItem('newsRead', JSON.stringify(allNewsIds.filter(id => id === 1)))
        expect(getNewNewsIds()).toEqual(allNewsIds.filter(value => value !== 1))

        // reset
        localStorage.removeItem('newsRead')
        expect(getNewNewsIds()).toEqual(allNewsIds)
    })

    test('Save readed news', () => {
        localStorage.setItem('newsRead', JSON.stringify([1]))
        markNewsAsRead([2, 4])
        expect(getReadNewsIds()).toEqual([1, 2, 4])

        localStorage.removeItem('newsRead')
        markNewsAsRead([2, 4])
        expect(getReadNewsIds()).toEqual([2, 4])
    })
})
