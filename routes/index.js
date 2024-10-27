const express = require('express')
const router = express.Router()
const controllers = require('../controllers/index')

router.get('/no-sign/list', controllers.getNoSignList)

module.exports = router
