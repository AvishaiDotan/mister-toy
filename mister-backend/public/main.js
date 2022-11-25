import { toyService } from './services/toy.service.js'


toyService.query()
    .then(toys => {
        console.log('Toys:', toys)
    })