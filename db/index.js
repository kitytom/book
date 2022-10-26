const mysql = require('mysql')
const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'root',
  port:'3306',
  database:'bokeapi'
})

module.exports=db