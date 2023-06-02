// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
    host:"120.79.36.120",
    user:"root",
    password:"denglei@123",
    port:3306,
    database:'food_delivery'
})

// 向外共享 db 数据库连接对象
module.exports = db