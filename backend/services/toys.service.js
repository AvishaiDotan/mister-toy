
const fs = require('fs')
const { utilService } = require('./util-service.js')
const toys = require('../data/toys.json')
// var randomWords = require('random-words');




const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]


module.exports = {
    query,
    getById,
    remove,
    save
}


function query(filterBy) {
    return Promise.resolve(toys)
        .then(toys => {
            if (!filterBy) return toys
            const regex = new RegExp(filterBy.txt, 'i')
            //By Name
            let filteredToys = toys.filter(toy => {
                return regex.test(toy.name) && filterBy.labels.every(label => toy.labels.includes(label)) && (toy.inStock | filterBy.inStock)
            })

            let sortedToys = filteredToys.sort((toy1, toy2) => {
                const order = (filterBy.sortBy.isDesc) ? [toy1, toy2] : [toy2, toy1]
                if (filterBy.sortBy.prop === 'price') return order[0].price - order[1].price
                else return order[0].name.localeCompare(order[1].name)
            })
            return sortedToys
        }
        )
}

function getById(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    toys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const idx = toys.findIndex(currToy => currToy._id === toy._id)
        toys[idx] = toy
    } else {
        toy._id = _makeId()
        toys.unshift(toy)
    }
    return _saveToysToFile().then(() => toy)
}



function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(toys, null, 2)

        fs.writeFile('data/toys.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

// function _enrichData(toys) {
//     return toys.map(toy => {
//         const randomNumber = _getRandomIntInclusive(0, 4)
//         if (!toy.labels?.length) toy.labels = [labels[randomNumber], labels[randomNumber + 1]]
//         if (!toy.reviews?.length) toy.reviews = _getRandomReviews()
//         return toy
//     })
// }




// function _getRandomReviews() {
//     const reviews = [
//         'מאוד טוב אהבתי גדול באיכות',
//         'גם קיבל מהיר חינם תיבה יפה',
//         'очень красиво, очень быстро пришла посылка, товар качественный ',
//         'картина скперского качества , очень красивая, все детали на месте. я в восторге :)))))',
//         'Conforme à la description. Colis très bien préparé, emballé et protégé. Parfait très bien',
//         'למרבה הצער, את צבעים הם קל יותר מאשר בתמונה. סגול-יותר כמו סרינה, וטורקיז-יותר אור כחול, ואני רק צורך בדיוק אלה צבעים כי בתמונה. הפאזל לא גדול ואיכות טובה',
//         'מאוד יפה פאזל, סופר מהיר חינם, הורה 13. יוני, נמסר 23. יוני!',
//         'Fast postage. Looks a good puzzle',
//         'Can’t wait to do it! ',
//         'וואו זה דברים למעשה עובד-זה לפני ואחרי תמונה!! תמשיך להשתמש עבור המומלץ עד שזה נגמר. (לקחת לא מעט זמן לייבוש) 18 Oct 2022',
//         'לפני יקטרינבורג במשך חודש. זה כמו את תיאור. משמש בתיאור, כלומר. אם אתה מבחין את מצב-2 פעמים ביום על נקי ויבש ציפורניים, הכל יהיה בסדר.',
//         'ת אור קטן קיבל, את בהירות הוא מאוד טוב, קל לנשיאה, את צד אור הוא מאוד בהיר, מיקרו USB מטען, מאוד נוח, כמו זה, יהיה לקנות שוב.',
//         'את הסחורה הוא בשלמותה, את אור הוא בהיר מאוד, זה הוא מאוד קל לנשיאה, זול, zoomable נוח וקל, את איכות הוא גם מאוד טוב, חזק. נחמד!',
//         'אוד טוב מצגת והסוללה הוא לטווח ארוך. נהדר קניות. אני כבר היה אחד ואני קנה שנייה אחת. 100% מומלץ',
//         'הוא מוגדר זה מחיר, אבל את שטח אחסון הוא באמת כפי שתואר. אתה מפחד לי!',
//         'אני לא תהסס במחיר הזה, ושטח האחסון הוא הסביר בכנות. זה מהבהב. אני כמו זה מאוד. רכישה מספקת! ',
//         'המוצר הגיע בשבועות במהירות, אבל USB זה לא מהיר, זה נורמלי '
//     ]

//     const toyReviews = []
//     const amount = _getRandomIntInclusive(0, 5)

//     for (var i = 0; i < amount; i++) {
//         toyReviews.push(reviews[_getRandomIntInclusive(0, reviews.length)])
//     }
//     return toyReviews
// }

// _randomToy()
// function _randomToy() {
//     const toys = []
//     for (var i = 0; i < 100; i++) {
//         toys.push({
//             name: randomWords(),
//             price: _getRandomIntInclusive(10, 550),
//             labels: _getLabels(),
//             inStock: (Math.random() > 0.5),
//             createdAt: Date.now() - _getRandomIntInclusive(0, 10) * 100000 * Math.random(),
//             _id: _makeId(),
//             reviews: _getRandomReviews()
//         })
        
//     }
//     const data = JSON.stringify(toys, null, 2)

//     fs.writeFile('data/toys.json', data, (err) => {
//         if (err) return reject(err)
//         resolve()
//     })
// }


// function _getRandomIntInclusive(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1) + min)
// }

// function _getLabels() {
//     const toyLabels = []
//     labels.forEach(label => {
//         if (Math.random() > 0.8) toyLabels.push(label)
//     })
//     return toyLabels
// }





