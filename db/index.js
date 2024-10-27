const mysql = require('mysql2/promise')

// const connection = mysql.createConnection({
//   host: '118.31.73.67',
//   user: 'tammy',
//   password: 'tammy123456',
//   database: 'sign_db'
// })

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL', err)
//     return
//   }
//   console.log('Connected to MYSQL')
// })

// const pool = mysql.createPool({
//   host: '118.31.73.67',
//   user: 'tammy',
//   password: 'tammy123456',
//   database: 'sign_db'
// });

module.exports = mysql.createPool({
  host: '118.31.73.67',
  user: 'tammy',
  password: 'tammy123456',
  database: 'sign_db'
});