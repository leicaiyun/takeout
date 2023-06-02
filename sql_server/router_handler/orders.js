const db = require('../db/index')
//显示所有订单
exports.selectAll_o = (req, res) => {
    let selectAllSql = 'select * from orders;'
    db.query(selectAllSql,(err,result)=>{
      if(err){
        return res.cc(err);
      }
      return res.send(result);
    })
  }

//显示未发货订单
exports.select0_o = (req, res) => {
    let select0_Sql = 'select order_id,rest_name,order_money,user_tel,user_name,user_add from orders where status = 0;'
    db.query(select0_Sql,(err,result)=>{
      //console.log(result);
      if(err){
        return res.cc(err);
      }
      return res.send({status:200,data:result});
    })
  }
//显示正在送货中订单
exports.select1_o = (req, res) => {
    let select1_Sql = 'select * from SendingOrder';
    db.query(select1_Sql,(err,result)=>{
      if(err){
        return res.cc(err);
      }
      return res.send({status:200,data:result});
    })
  }
//显示已送达订单
exports.select2_o = (req, res) => {
    let select2_Sql = 'select * from SendedOrder';
    db.query(select2_Sql,(err,result)=>{
      if(err){
        return res.cc(err);
      }
      return res.send({status:200,data:result});
    })
  }

  //显示某用户未发货订单
exports.selectUser_0 = (req, res) => {
  let select0_Sql = 'select order_id,rest_name,order_money,user_tel,user_name,user_add from orders where status = 0 and user_name = ?;'
  username = req.query.username;
  db.query(select0_Sql,[username],(err,result)=>{
    if(err){
      return res.cc(err);
    }
    return res.send({status:200,data:result});
  })
}
//显示某用户正在送货中订单
exports.selectUser_1 = (req, res) => {
  let select1_Sql = 'select * from SendingOrder where user_name = ?';
  username = req.query.username;
  //console.log(username);
  db.query(select1_Sql,[username],(err,result)=>{
    if(err){
      return res.cc(err);
    }
    return res.send({status:200,data:result});
  })
}
//显示某用户已送达订单
exports.selectUser_2 = (req, res) => {
  let select2_Sql = 'select * from SendedOrder where user_name = ?';
  //console.log(req.query);
  username = req.query.username;
  db.query(select2_Sql,[username],(err,result)=>{
    if(err){
      return res.cc(err);
    }
    return res.send({status:200,data:result});
  })
}
//插入新订单
exports.insert_o = (req,res)=>{
    let sql = 'insert into orders (rest_name,order_money,user_tel,user_name,user_add,status) values(?,?,?,?,?,0);'
    const Info = {
        rest_name:req.body.rest_name,
        order_money:req.body.order_money,
        user_tel:req.body.user_tel,
        user_name:req.body.user_name,
        user_add:req.body.user_add
    }
    db.query(sql,[Info.rest_name,Info.order_money,Info.user_tel,Info.user_name,Info.user_add],(err,result)=>{
        if(err){
            return res.send({status:0,meg:err});
        }
        if(result.affectedRows === 1){
            return res.send({status:200,meg:"成功插入"});
        }else{
            return res.send({status:0,meg:"插入失败"});
        }
    })
}
//取消订单
exports.del_o = (req,res)=>{
    let sql = 'delete from orders where ?;'
    const del_id = req.body.data.delete_id;
    //console.log(del_id);
    db.query(sql,{order_id:del_id},(err,result)=>{
        if(err){
            return res.send({status:0,meg:err});
        }
        if(result.affectedRows === 1){
            return res.send({status:200,meg:"成功删除"});
        }else{
            return res.send({status:0,meg:'删除失败'});
        }
    })
}
//修改订单信息
exports.write_o = (req, res) => {
    let writeSql = 'update orders set user_add = ? where order_id = ?;'
    const parm1 = req.body.user_add;
    const parm2 = req.body.order_id;
    db.query(writeSql, [parm1,parm2], (err, result) => {
        if (err) { return res.send({ status: 0, meg: err }) }
        if (result.affectedRows === 1) {
            return res.send({ status: 200, meg: "修改成功" })
        }
        else {
            return res.send({ status: 0, meg: "修改失败" })
        }
    })
  }
//触发器：下单后相应餐馆的月销量加一，未发货订单页面插入相应的新数值
