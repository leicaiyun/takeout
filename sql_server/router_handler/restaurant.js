const db = require('../db/index')

//查看所有餐馆的信息
exports.selectAll_rest = (req, res) => {
    let selectAllSql = 'select * from restaurant;';
    db.query(selectAllSql,(err,result)=>{
      if(err){
        return res.cc(err);
      }
      //console.log(result);
      return res.send({ status: 200, data: result });
    })
  }

//修改餐馆信息
exports.writeRest = (req, res) => {
    let writeRestSql = 'update restaurant set rest_price = ?,sale_count = ? where rest_name = ?;'
    const parm1 = req.body.rest_name ;
    //console.log(req.body);
    const parm2 = parseInt(req.body.rest_price);
    const parm3 = parseInt(req.body.sale_count);
    db.query(writeRestSql, [parm2,parm3,parm1], (err, result) => {
        if (err) { return res.send({ status: 0, meg: err }) }
        if (result.affectedRows === 1) {
            return res.send({ status: 200, meg: "修改成功" })
        }
        else {
            return res.send({ status: 0, meg: "修改失败" })
        }
    })
  }

// 增加餐馆
exports.addRest = (req, res) => {
  const addRestSql = 'insert into restaurant (rest_name,rest_price,sale_count) values (?,?,?)';
  //console.log(req.body);
  const restInfo = {
    rest_name : req.body.rest_name,
    rest_price :req.body.rest_price,
    sale_count: req.body.sale_count
  }
  db.query(addRestSql,[restInfo.rest_name,restInfo.rest_price,restInfo.sale_count], (err, result) => {
      if (err) { return res.send({ status: 0, meg: err, data: restInfo }) }
      if (result.affectedRows === 1) {
          return res.send({ status: 200, meg: "添加成功", data: restInfo });
      }
      else {
          return res.send({ status: 0, meg: "添加失败" });
      }
  });
  }
  
//通过rest_name关闭餐馆
exports.shutRest = (req, res) => {
  const shutRestSql = "DELETE FROM restaurant WHERE ?";
  //console.log(req.body);
  const name = req.body.rest_name;
  db.query(shutRestSql, { rest_name: name }, (err, result) => {
      if (err) { return res.send({ status: 0, meg: err }); }
      if (result.affectedRows === 1) {
          return res.send({ status: 200, meg: "删除成功" });
      }
      else {
          return res.send({ status: 0, meg: "删除失败" });
      }
  })
  }
  