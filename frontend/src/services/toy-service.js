import { storageService } from './storage-service.js'
import { utilService } from './util-service.js'
import { httpService } from './http.service.js'

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
const KEY = 'toys_db'

const api_key = 'toy/'


export const toyService = {
  query,
  getById,
  remove,
  save,
  getLabels,
}

function query(filterBy) {
  return httpService.get(api_key, {filterBy})

  return storageService.query(KEY)
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
  return httpService.get(api_key + toyId)
  return storageService.get(KEY, toyId)
}

function remove(toyId) {
  return httpService.delete(api_key + toyId)
  return storageService.remove(KEY, toyId)
}

function save(toy) {
  if (toy._id) httpService.put(api_key + toy._id, {toy})
  return httpService.post(api_key, {toy})
  // if (toy._id) return storageService.put(KEY, toy)
  // return storageService.post(KEY, toy)
}

function getLabels() {
  return labels
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



