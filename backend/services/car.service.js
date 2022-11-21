
const fs = require('fs')
const cars = require('../data/car.json')

module.exports = {
    query,
    getById,
    remove,
    save
}


function query() {
    return Promise.resolve(cars)
}

function getById(carId) {
    const car = cars.find(car => car._id === carId)
    return Promise.resolve(car)
}

function remove(carId) {
    const idx = cars.findIndex(car => car._id === carId)
    cars.splice(idx, 1)
    return _saveCarsToFile()
}

function save(car) {
    if (car._id) {
        const idx = cars.findIndex(currCar => currCar._id === car._id)
        cars[idx] = car
    } else {
        car._id = _makeId()
        cars.unshift(car)
    }
    return _saveCarsToFile().then(() => car)
}



function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
function _saveCarsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(cars, null, 2)

        fs.writeFile('data/car.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}
