const debounce = (func, wait) => {
  let timeout

  return (...args) => {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

module.exports = {
  saveToStorage,
  loadFromStorage,
  makeId,
  debounce
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function makeId(length = 8) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

