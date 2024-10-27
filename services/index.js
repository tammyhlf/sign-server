const db = require('../db/index')

// 获取未签到名单
exports.getNoSignList = async () => {
  try {
    const data = await db.query('SELECT * FROM sign_table WHERE sign_status = 0')
    return {
      data: data?.[0] || []
    }
  } catch (error) {
    return {
      error
    }
  }
}

// 获取全部名单
exports.getSignList = async () => {
  try {
    const data = await db.query('SELECT * FROM sign_table')
    return {
      data: data?.[0] || []
    }
  } catch (error) {
    return {
      error
    }
  }
}

// 签到
exports.postSign = async () => {

}

// 导入
exports.postImport = async (req, res) => {

}