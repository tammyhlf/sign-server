const services = require('../services')

// 获取未签到名单
exports.getNoSignList = async (req, res) => {
  const data = await services.getNoSignList()

  if (data.error) {
    res.send({
      code: 500,
      data: [],
      error: data.error,
      msg: 'error'
    })
  } else {
    res.send({
      code: 200,
      data: data.data,
      msg: 'OK'
    })
  }
}

// 获取全部名单
exports.getSignList = async (req, res) => {
  const data = await services.getSignList()

  if (data.error) {
    res.send({
      code: 500,
      data: [],
      error: data.error,
      msg: 'error'
    })
  } else {
    res.send({
      code: 200,
      data: data.data,
      msg: 'OK'
    })
  }
}

// 签到
exports.postSign = async (req, res) => {
  const { name } = req.body
  const data = await services.postSign(name)

  if (data.error) {
    res.send({
      code: 500,
      data: [],
      error: data.error,
      msg: 'error'
    })
  } else {
    res.send({
      code: 200,
      data,
      msg: 'OK'
    })
  }
}

// 查询名单
exports.getSign = async (req, res) => {
  const { name } = req.query
  const data = await services.getSign(name)

  if (data.error) {
    res.send({
      code: 500,
      data: [],
      error: data.error,
      msg: 'error'
    })
  } else {
    res.send({
      code: 200,
      data: data.data,
      msg: 'OK'
    })
  }
}

// 导入(在这里解析 excel,录入数据库)
exports.postImport = async (req, res) => {
  const filePath = req.file.path
  const data = await services.postImport(filePath)
  
  if (data.error) {
    res.send({
      code: 500,
      data: {},
      error: data.error,
      msg: 'error'
    })
  } else {
    res.send({
      code: 200,
      data,
      msg: 'OK'
    })
  }
}