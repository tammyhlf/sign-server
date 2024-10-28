const express = require('express')
const multer = require('multer')

const app = express()

const router = express.Router()
const controllers = require('../controllers/index')
const upload = multer({ dest: '.tmp/' })

// 获取全部名单
router.get('/list', controllers.getSignList)
// 获取未签到名单
router.get('/no-sign/list', controllers.getNoSignList)
// 导入
router.post('/upload', upload.single('file'), controllers.postImport)
// 签到
router.post('/sign', controllers.postSign)
// 获取名单
router.get('/sign', controllers.getSign)

module.exports = router
