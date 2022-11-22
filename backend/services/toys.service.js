
const fs = require('fs')
const toys = require('../data/toys.json')


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
