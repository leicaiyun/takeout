const db = require('../db/index')

//查看运送中的物流信息
exports.Onsend = (req,res)=>{
    let sql ='select order_id,user_tel,dm_id from SendingOrder;';
    db.query(sql,(err,result)=>{
        if(err){
            return res.cc(err);
        }
        return res.send({status:200,data:result})  
    });
}

//查看已完成的物流信息
exports.Sended = (req,res)=>{
    let sql ='select order_id,user_tel,dm_id from SendedOrder;'
    db.query(sql,(err,result)=>{
        if(err){
            return res.cc(err);
        }
        return res.send({status:200,data:result})  
    });
}

//插入新的物流信息
exports.insert_d = (req,res)=>{
    let sql = 'insert into delivery (order_id,username,dm_id) values(?,?,?);'
    const Info = {
        order_id: parseInt(req.body.order_id),
        username:req.body.user_name,
        dm_id:req.body.dm_id,
    };
    db.query(sql,[Info.order_id,Info.username,Info.dm_id],(err,result)=>{
        if(err){
            return res.send({status:0,meg:"添加失败le"});
        }
        if(result.affectedRows === 1){
            return res.send({status:200,meg:"添加成功",data:Info});
        }else{
            return res.send({status:0,meg:"添加失败"});
        }
    });
}


