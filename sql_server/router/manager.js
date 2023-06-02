const express = require('express');
const router = express.Router();

const dmHandler = require("../router_handler/delivery_man");
//查看所有快递员信息
router.get('/seekAll_dm',dmHandler.seekAll_dm);
//查看所有快递员的编号
router.get('/seekId_dm',dmHandler.seekId_dm);
//雇佣新的快递员
router.post('/add_dm',dmHandler.add_dm);
//解雇某一快递员
router.post('/del_dm',dmHandler.del_dm);


const deliHandler = require('../router_handler/delivery');
//查看运送中的物流信息
router.get('/Onsend',deliHandler.Onsend);
//查看已完成的物流信息
router.get('/Sended',deliHandler.Sended);
//插入新的物流信息
router.post('/insert_d',deliHandler.insert_d);




const ordersHandler = require('../router_handler/orders');
//显示未发货订单
router.get('/selectAll0_o',ordersHandler.select0_o);
//显示正在送货中订单
router.get('/selectAll1_o',ordersHandler.select1_o);
//显示已送达订单
router.get('/selectAll2_o',ordersHandler.select2_o);




const restHandler = require('../router_handler/restaurant');

//查看所有餐馆的信息
router.get('/selectAll_rest',restHandler.selectAll_rest);

//修改餐馆信息
router.post('/writeRest',restHandler.writeRest);

// 增加餐馆
router.post('/addRest',restHandler.addRest);
  
//关闭餐馆
router.post('/shutRest', restHandler.shutRest);


module.exports = router;