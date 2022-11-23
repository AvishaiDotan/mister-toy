const express = require('express')
const path = require('path')
const cors = require('cors')
const toysService = require('./services/toys.service')
// const cookieParser = require('cookie-parser')



if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3030',
            'http://localhost:3030',
            'http://127.0.0.1:3000',
            'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}





const app = express()

// Express Config:
// app.use(express.static('public'))
// app.use(cookieParser())
app.use(express.json())



// Get Requests
app.get('/api/toy', (req, res) => {

    const { filterBy } = req.query
    if (filterBy) {
        if (!filterBy.labels) filterBy.labels = []
        filterBy.sortBy.isDesc = (filterBy.sortBy.isDesc === 'false') ? false : true
        filterBy.inStock = (filterBy.inStock === 'false') ? false : true
    }

    toysService.query(filterBy)
        .then(data => res.send(data))
})

app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toysService.getById(toyId)
        .then((toy) => { res.send(toy) })
})

// Post
app.post('/api/toy/', (req, res) => {

    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot add bug')

    const {toy} = JSON.parse(JSON.stringify(req.body))

    toy.createdAt = Date.now()

    toysService.save(toy)
        .then(savedToy => {
            res.send(savedToy)
        })
})

//Put
app.put('/api/toy/:id', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) {
    //     return res.status(401).send('Cannot add bug')
    // }

    // if (!loggedinUser.username === 'ADMIN' && loggedinUser._id !== req.body.creator._id) {
    //     return res.status(401).send('Cannot update bug')
    // }

    const {toy} = JSON.parse(JSON.stringify(req.body))

    toysService.save(toy)
        .then(savedToy => {
            res.send(savedToy)
        })
        .catch(err => err)
})

app.delete('/api/toy/:toyId', (req, res) => {

    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) {
    //     return res.status(401).send('Cannot add bug')
    // }

    // if (!loggedinUser.username === 'ADMIN' && loggedinUser._id !== req.body.creator._id) {
    //     return res.status(401).send('Cannot update bug')
    // }

    const { toyId } = req.params

    toysService.remove(toyId)
        .then(() => {
            res.send('deleted')
        })
})


// app.get('/api/toy/downloadPdf', (req, res) => {
//     toysService.query().then((result) => {
//         toysService.downloadPdf(result)
//             .then(() => {
//                 res(result)
//             })
//             .catch(err => err)

//     })
// })

// app.get('/api/toy/:toyId', (req, res) => {

//     const { toyId } = req.params

//     const visitedToys = req.cookies.visitedToys || []

//     if (!visitedToys.includes(toyId)) {
//         visitedToys.push(toyId)
//         console.log('visited toys', visitedToys);
//     }

//     if (visitedToys.length >= 3) {
//         return res.status(401).send('hold on you are magzim')
//     }

//     toysService.getById(toyId)
//         .then(toy => {
//             res.cookie('visitedToys', visitedToys, { maxAge: 1000 * 7 })
//             res.send(toy)
//         })

// })

// // Logout
// app.post('/api/auth/logout', (req, res) => {
//     res.clearCookie('loginToken')
//     res.send('logged out')
// })

// // Signup
// app.post('/api/auth/signup', (req, res) => {
//     userService.save(req.body)
//         .then(user => {
//             const loginToken = userService.getLoginToken(user)
//             res.cookie('loginToken', loginToken)
//             res.send(user)
//         })
// })

// //LOGIN
// app.post('/api/auth/login', (req, res) => {
//     userService.checkLogin(req.body)
//         .then(user => {
//             const loginToken = userService.getLoginToken(user)
//             res.cookie('loginToken', loginToken)
//             res.send(user)
//         })
//         .catch((err) => {
//             res.status(401).send(err)
//         })
// })

// //Get User
// app.get('/api/user/toys', (req, res) => {

//     const loggedinUser = userService.validateToken(req.cookies.loginToken)
//     if (!loggedinUser) return res.status(401).send('No User Connected')

//     toysService.queryByUserId(loggedinUser._id)
//         .then(toys => res.send(toys))
//         .catch(err => {
//             console.log(err)
//             res.status(401).send(err)
//         })
// })

// app.delete('/api/user/:userId', (req, res) => {

//     const { userId } = req.params

//     toysService.queryByUserId(userId)
//         .then(toys => {
//             if (!toys.length) {
//                 userService.remove(userId)
//                     .then(() => {
//                         res.send('deleted')
//                     })
//                     .catch(err => {
//                         console.log(err)
//                         res.status(401).send(err)
//                     })
//             } else {
//                 res.status(401).send('Has Toys')
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(401).send(err)
//         })
// })

// app.get('/api/user', (req, res) => {

//     userService.getUsers()
//         .then(users => res.send(users))
//         .catch(err => console.log(err))
// })


const PORT = process.env.PORT || 3030

app.listen(PORT, () => console.log(`Server ready at port ${PORT}`))

