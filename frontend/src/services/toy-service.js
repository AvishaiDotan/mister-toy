import { storageService } from './storage-service.js'
import { utilService } from './util-service.js'

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
const KEY = 'toys_db'
_createToys()

export const toyService = {
  query,
  getById,
  remove,
  save,
}

function query() {
  return storageService.query(KEY)
}

function getById(toyId) {
  return storageService.get(KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(KEY, toyId)
}

function save(toy) {
  if (toy.id) return storageService.put(KEY, toy)
  return storageService.post(KEY, toy)
}


function _createToys() {
  let toys = utilService.loadFromStorage(KEY)
  if (!toys || !toys.length) {
    toys = [
      {
        "_id": "t101",
        "name": "Talking Robot",
        "price": 280,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031801011,
        "inStock": false,
        reviews: _getRandomReviews(),
      },
      {
        "_id": "t102",
        "name": "Baz sHENOT oR",
        "price": 233,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031801011,
        "inStock": true,
        reviews: _getRandomReviews(),
      },
      {
        "_id": "t103",
        "name": "f-16",
        "price": 153,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031801011,
        "inStock": true,
        reviews: _getRandomReviews(),
      },
    ]
    utilService.saveToStorage(KEY, toys)
  }
  return toys
}

function _getRandomReviews() {
    const reviews = [
      'מאוד טוב אהבתי גדול באיכות',
      'גם קיבל מהיר חינם תיבה יפה',
      'очень красиво, очень быстро пришла посылка, товар качественный ',
      'картина скперского качества , очень красивая, все детали на месте. я в восторге :)))))',
      'Conforme à la description. Colis très bien préparé, emballé et protégé. Parfait très bien',
      'למרבה הצער, את צבעים הם קל יותר מאשר בתמונה. סגול-יותר כמו סרינה, וטורקיז-יותר אור כחול, ואני רק צורך בדיוק אלה צבעים כי בתמונה. הפאזל לא גדול ואיכות טובה',
      'מאוד יפה פאזל, סופר מהיר חינם, הורה 13. יוני, נמסר 23. יוני!',
      'Fast postage. Looks a good puzzle',
      'Can’t wait to do it! ',
      'וואו זה דברים למעשה עובד-זה לפני ואחרי תמונה!! תמשיך להשתמש עבור המומלץ עד שזה נגמר. (לקחת לא מעט זמן לייבוש) 18 Oct 2022',
      'לפני יקטרינבורג במשך חודש. זה כמו את תיאור. משמש בתיאור, כלומר. אם אתה מבחין את מצב-2 פעמים ביום על נקי ויבש ציפורניים, הכל יהיה בסדר.',
      'ת אור קטן קיבל, את בהירות הוא מאוד טוב, קל לנשיאה, את צד אור הוא מאוד בהיר, מיקרו USB מטען, מאוד נוח, כמו זה, יהיה לקנות שוב.',
      'את הסחורה הוא בשלמותה, את אור הוא בהיר מאוד, זה הוא מאוד קל לנשיאה, זול, zoomable נוח וקל, את איכות הוא גם מאוד טוב, חזק. נחמד!',
      'אוד טוב מצגת והסוללה הוא לטווח ארוך. נהדר קניות. אני כבר היה אחד ואני קנה שנייה אחת. 100% מומלץ',
      'הוא מוגדר זה מחיר, אבל את שטח אחסון הוא באמת כפי שתואר. אתה מפחד לי!',
      'אני לא תהסס במחיר הזה, ושטח האחסון הוא הסביר בכנות. זה מהבהב. אני כמו זה מאוד. רכישה מספקת! ',
      'המוצר הגיע בשבועות במהירות, אבל USB זה לא מהיר, זה נורמלי '
    ]

    const toyReviews = []
    const amount = utilService.getRandomIntInclusive(0, 5)

    for (var i = 0; i < amount; i++) {
      toyReviews.push(reviews[utilService.getRandomIntInclusive(0, reviews.length)])
    }

    return toyReviews
}


