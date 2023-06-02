// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

const bodyParser = require("body-parser")

const cors = require('cors')

/* 在路由前封装错误函数 */
app.use((req, resposne, next) => {
  //status默认值为表示失败的情况
  resposne.cc = function (err, status = 1) {
      //err的值可能是一个错误的对象，也可能是一个错误的描述字符串
      resposne.send({
          status,
          message: err instanceof Error ? err.message : err
      })
  }
  next();
})

// 将 cors 注册为全局中间件,解决跨域问题
app.use(cors())
//引入中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))//配置解析表单数据的中间件


// 导入并注册路由模块

// const deliveryRouter = require('./router/delivery')
// app.use('/delivery',deliveryRouter)

// const dmRouter = require('./router/delivery_man')
// app.use('/delivery_man',dmRouter)

// const userRouter = require('./router/user')
// app.use('/user', userRouter)

// const restRouter = require('./router/restaurant')
// app.use('/restaurant',restRouter)

// const orderRouter = require('./router/orders')
// app.use = ('/orders',orderRouter)

const userRouter = require('./router/ordinary')
app.use('/user',userRouter)

const managerRouter = require('./router/manager')
app.use('/manager',managerRouter)

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://120.79.36.120:3007')
})
