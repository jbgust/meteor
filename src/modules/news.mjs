export const news = [
    {
        id: 1,
        html: `<ul>
                    <li>
                        <b>New features, April 2019</b>
                        <ul>
                            <li>Adding: KN, mass flow rate and chamber pressure in chart result</li>
                            <li>Documentation</li>
                        </ul>
                    </li>
                </ul>`
    }, {
        id: 2,
        html: `<ul>
                    <li>
                        <b>New feature, May 2019</b>
                        <ul>
                            <li>Custom propellant setting (like APCP or other)</li>
                        </ul>
                    </li>
                </ul>`
    }, {
        id: 3,
        html: `<ul>
                        <li>
                            <b>New features, August 2019</b>
                            <ul>
                                <li>Atmospheric pressure setting</li>
                                <li>Adding grain mass to results</li>
                                <li>Define burn rate data by pressure</li>
                                <li>Reduce computation failure for low KN motors</li>
                            </ul>
                        </li>
                    </ul>`
    }, {
        id: 4,
        html: `<ul>
                    <li><b>New forum to share experience, request feature, report bug, ... See <a href="http://meteor.boards.net/">HERE</a></b></li>
                </ul>`
    }, {
        id: 5,
        html: `<ul>
                    <li><b>Motor export in RASP format (.eng)</a></b></li>
                </ul>`
    }
]

export function getReadNewsIds() {
    let newsRead = []
    if (localStorage.getItem('newsRead')) {
        newsRead = JSON.parse(localStorage.getItem('newsRead'))
    }
    return newsRead
}

export function getNewNewsIds() {
    let newsRead = getReadNewsIds()
    return news.filter((value) => newsRead.indexOf(value.id) < 0).map(value => value.id)
}

export function markNewsAsRead(readedNews) {
    let newsIds = getReadNewsIds()
    newsIds.push(...readedNews)
    localStorage.setItem('newsRead', JSON.stringify(newsIds))
}
