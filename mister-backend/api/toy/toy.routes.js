const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy, addReview } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getToys)
router.get('/:_id', getToyById)
router.post('/', addToy) //, requireAuth
router.put('/:id', updateToy) //requireAuth,
router.delete('/:id', removeToy) //, requireAuth, requireAdmin

module.exports = router