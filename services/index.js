const xlsx = require('xlsx')
const fs = require('fs')
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
exports.postSign = async (name) => {
  try {
    // 查询最大 sign_in_number
    const data = await db.query(`
      SELECT MAX(sign_in_number) AS maxSignInNumber FROM sign_table
    `);

    const sign_in_number = data?.[0]?.[0]?.maxSignInNumber || 0

    await db.query(`
      UPDATE sign_table
      SET sign_status = 1,
          sign_in_number = ?
      WHERE name = ? AND sign_status = 0
      LIMIT 1;
    `, [sign_in_number + 1, name])

    return { }
  } catch (error) {
    return { error }
  }
}

// 查询名单
exports.getSign = async (name) => {
  try {
    const data = await db.query('SELECT * FROM sign_table WHERE name = ?', [name])
    return {
      data: data?.[0] || []
    }
  } catch (error) {
    return {
      error
    }
  }
}

// 导入
exports.postImport = async (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  const headerMapping = {
    '姓名': 'name',
    '第一排座位号': 'first_seat',
    '第二排座位号': 'second_seat'
  }

  const insertPromises = jsonData.map(async (row) => {
    const mappedRow = {}
    for (const [key, value] of Object.entries(row)) {
      const mappedKey = headerMapping[key] // 将中文字段映射到英文
      if (mappedKey) {
        mappedRow[mappedKey] = value
      }
    }

    const { name, first_seat, second_seat } = mappedRow // 使用映射后的字段

    // 检查数据是否存在相同 name
    const [existingRows] = await db.query(
      'SELECT * FROM sign_table WHERE name = ?',
      [name]
    )

    if (existingRows.length > 0) {
      if (existingRows[0].sign_status === 0) {
        return db.query(
          'UPDATE sign_table SET first_seat = ?, second_seat = ? WHERE name = ? AND sign_status = 0',
          [first_seat, second_seat, name]
        )
      }
    } else {
      return db.query('INSERT INTO sign_table (name, first_seat, second_seat) VALUES (?, ?, ?)', [name, first_seat, second_seat])
    }
  })

  try {
    await Promise.all(insertPromises)
    return {}
  } catch (error) {
    return { error }
  } finally {
    fs.unlinkSync(filePath) // 删除上传的文件
  }
}
