const express = require('express')
const cookieParser = require('cookie-parser')


const carService = require('./services/car.service')

const app = express()

// Express Config:
app.use(express.static('public'))
app.use(cookieParser())


// Express Routing:
app.get('/puki', (req, res) => {
    var visitCount = req.cookies.visitCount || 0
    visitCount++
    res.cookie('visitCount', visitCount)

    res.send('Hello Puki ')
})
app.get('/nono', (req, res) => res.redirect('/'))


app.get('/api/car', (req, res) => {
    carService.query()
        .then(cars => {
            res.send(cars)
        })
})

app.get('/api/car/save', (req, res) => {
    console.log('req.query', req.query)
    const car = {
        _id: req.query._id,
        vendor: req.query.vendor,
        speed: +req.query.speed
    }
    carService.save(car)
        .then(savedCar => {
            res.send(savedCar)
        })
})

app.get('/api/car/:carId', (req, res) => {
    const { carId } = req.params
    carService.getById(carId)
        .then(car => {
            res.send(car)
        })
})

app.get('/api/car/:carId/remove', (req, res) => {
    const { carId } = req.params
    carService.remove(carId)
        .then(() => {
            res.send('Removed!')
        })
})

app.listen(3030, () => console.log('Server listening on port 3030!'))
