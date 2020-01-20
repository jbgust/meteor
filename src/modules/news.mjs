export const news = [
    {
    //     id: 1,
    //     html: `<ul>
    //                 <li>
    //                     <b>New features, April 2019</b>
    //                     <ul>
    //                         <li>Adding: KN, mass flow rate and chamber pressure in chart result</li>
    //                         <li>Documentation</li>
    //                     </ul>
    //                 </li>
    //             </ul>`
    // }, {
    //     id: 2,
    //     html: `<ul>
    //                 <li>
    //                     <b>New feature, May 2019</b>
    //                     <ul>
    //                         <li>Custom propellant setting (like APCP or other)</li>
    //                     </ul>
    //                 </li>
    //             </ul>`
    // }, {
    //     id: 3,
    //     html: `<ul>
    //                     <li>
    //                         <b>New features, August 2019</b>
    //                         <ul>
    //                             <li>Atmospheric pressure setting</li>
    //                             <li>Adding grain mass to results</li>
    //                             <li>Define burn rate data by pressure</li>
    //                             <li>Reduce computation failure for low KN motors</li>
    //                         </ul>
    //                     </li>
    //                 </ul>`
    // }, {
    //     id: 4,
    //     html: `<ul>
    //                 <li><b>New forum to share experience, request feature, report bug, ... See <a href="http://meteor.boards.net/">HERE</a></b></li>
    //             </ul>`
    // }, {
        id: 6,
        html: `<ul>
                        <li>
                            <b>New features, December 2019</b>
                            <ul>
                                <li>Finocyl grain configuration : thanks to <a href="https://github.com/bkuker/motorsim" target="_blank">Bill Kuker</a> for his work on finocyl grain calculation.</li>
                                <li>Motor export in RASP format (.eng)</li>
                            </ul>
                        </li>
                    </ul>`
    }, {
        id: 7,
        html: `<ul>
                        <li>
                            <b>New features, January 2020</b>
                            <ul>
                                <li>Star grain configuration </li>
                                <li>End burner grain configuration</li>
                                <li>Motor class percentage</li>
                                <li>Thanks to <a href="https://github.com/bkuker/motorsim" target="_blank">Bill Kuker</a> for his work on this grain.</li>
                            </ul>
                        </li>
                    </ul>`
    }, {
        id: 8,
        html: `<ul>
                        <li>
                            <b>New grains, January 2020</b>
                            <ul>
                                <li>C slot</li>
                                <li>Moon burner</li>
                                <li>Rod and tube</li>
                                <li>Thanks to <a href="https://github.com/bkuker/motorsim" target="_blank">Bill Kuker</a> for his work on C slot and moon burner grain.</li>
                            </ul>
                        </li>
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
