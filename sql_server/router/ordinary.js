const express = require('express')
const router = express.Router()

const ordersHandler = require('../router_handler/orders');
//显示未发货订单
router.get('/selectUser_0',ordersHandler.selectUser_0);
//显示正在送货中订单
router.get('/selectUser_1',ordersHandler.selectUser_1);
//显示已送达订单
router.get('/selectUser_2',ordersHandler.selectUser_2);
//插入新订单
router.post('/insert_o',ordersHandler.insert_o)
//取消订单;
router.post('/del_o',ordersHandler.del_o);
//修改订单信息
router.post('/write_o',ordersHandler.write_o);



const restHandler = require('../router_handler/restaurant');
//查看所有餐馆的信息
router.get('/selectAll_rest',restHandler.selectAll_rest);



const userHandler = require('../router_handler/user')

//查看用户所有信息
router.get('/select_all_user',userHandler.selectAllUser)
//修改用户信息
router.post('/writeuser',userHandler.writeUser)
// 注册新用户
router.post('/reguser', userHandler.regUser)
// 登录
router.post('/login', userHandler.login)

module.exports = router
