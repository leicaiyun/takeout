const db = require('../db/index')
//查看所有快递员信息
exports.seekAll_dm = (request,response)=>{
    let selectAllSql = 'select * from delivery_man;';
    db.query(selectAllSql,(err,result)=>{
        if(err){
            return response.cc(err);
        }
        return response.send({status:200,data:result});
    })
}

//查找所有快递员的编号
exports.seekId_dm = (request,response)=>{
    let selectAllSql = 'select dm_id from delivery_man;';
    db.query(selectAllSql,(err,result)=>{
        if(err){
            return response.cc(err);
        }
        return response.send({status:200,data:result});
    })
}

//雇佣新的快递员
exports.add_dm = (request,response)=>{
    let insertSql = 'insert into delivery_man(dm_id,dm_name,dm_tel) values(?,?,?);'
    //console.log(request.body);
    const dm_Info = {
        dm_id:parseInt(request.body.dm_id),
        dm_name:request.body.dm_name,
        dm_tel:request.body.dm_tel
    }
    db.query(insertSql,[dm_Info.dm_id,dm_Info.dm_name,dm_Info.dm_tel],(err,result)=>{
        if(err){
            return response.send({status:0,meg:err,data:dm_Info});
        }
        if(result.affectedRows === 1){
            return response.send({status:200,meg:"添加成功",data:dm_Info});
        }else{
            return response.send({status:0,meg:"添加失败"})
        }
    })
}
//解雇某一快递员
exports.del_dm = (request,response)=>{
    let delSql = 'delete from delivery_man where ?;'
    //console.log(request.body.data.want_delete);
    const parm = request.body.data.want_delete;
    db.query(delSql,{dm_id:parm},(err,result)=>{
        if(err){
            return response.send({status:0,meg:err});
        }
        if(result.affectedRows === 1){
            return response.send({status:200,meg:"删除成功"});
        }else{
            return response.send({status:0,meg:"删除失败"});
        }
    })
}