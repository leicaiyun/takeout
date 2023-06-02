//user(username,password,sex,telephone,role)
/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require('../db/index')
const jwt = require("jsonwebtoken")

//查看该用户的所有信息
exports.selectAllUser = (req, res) => {
	let selectAllSql = 'select username,sex,telephone from user where username = ?';
	const uInfo = req.query;
	//console.log(uInfo);
	db.query(selectAllSql, [uInfo.username], (err, result) => {
		if (err) {
			return res.cc(err);
		}
		return res.send({status:200,data:result});
	})
}

//修改用户信息
exports.writeUser = (req, res) => {
	const str = "update user set password = ? where username = ? and password = ?"
	console.log(req.body);
	const parm2 = req.body.username;
	const parm1 = req.body.new_pwd;
	const parm3 = req.body.old_pwd;
	db.query(str, [parm1, parm2, parm3], (err, result) => {
		if (err) {
			return res.send({
				status: 0,
				meg: "错误！"
			});
		}
		if (result.affectedRows === 1) {
			return res.send({
				status: 200,
				meg: "修改成功"
			});
		} else {
			return res.send({
				status: 0,
				meg: "修改失败"
			});
		}
	})
}

// 注册用户的处理函数
exports.regUser = (req, res) => {
	var username = req.body.username
	var password = req.body.password
	var sex = req.body.sex
	var telephone = req.body.telephone
	if (!username || !password || !telephone ||! sex) {
		res.send({
			code: 0,
			msg: "必传参数...",
		})
		return
	}
	if (username && password) {
		const result = `SELECT * FROM user WHERE username = '${username}'`
		db.query(result, [username], (err, results) => {
			if (err) throw err
			if (results.length >= 1) {
				//2、如果有相同用户名，则注册失败，用户名重复
				res.send({
					code: 0,
					msg: "注册失败，用户名重复"
				})
			} else {
				const sqlStr = "insert into user(username,sex,password,telephone,role) values(?,?,?,?,0)"
				db.query(sqlStr, [username,sex,password,telephone], (err, results) => {
					if (err) throw err
					if (results.affectedRows === 1) {
						res.send({
							code: 200,
							msg: "注册成功"
						})
					} else {
						res.send({
							code: 0,
							msg: "注册失败"
						})
					}
				})
			}
		})
	}
}

// 登录的处理函数
exports.login = (req, res) => {
	//console.log(req.body);
	var username = req.body.username
	var password = req.body.password
	if (!username || !password) {
		res.send({
			code: 0,
			msg: "用户名与密码为必传参数...",
		})
	}
	const sqlStr = "select * from user WHERE username = ? AND password=?"
	db.query(sqlStr, [username, password], (err, result) => {
		if (err) throw err
		if (result.length > 0) {
			// 生成token
			var token = jwt.sign({
					identity: result[0].identity,
					username: result[0].username,
				},
				"secret", {
					expiresIn: "1h"
				},
			)
			//console.log(result);
			return res.send({
				code: 200,
				msg: "登录成功",
				data:result,
				token: token
			})

			// 如果没有登录成功，则返回登录失败
		}
		else {
			// 判断token
			if (req.headers.authorization == undefined || req.headers.authorization == null) {
				if (req.headers.authorization) {
					var token = req.headers.authorization.split(" ")[1] // 获取token
				}
				jwt.verify(token, "secret", (err, decode) => {
					if (err) {
						return res.send({ code: 0, msg: "登录失败！账号或密码错误！" })
					}
				})
			}
		}
	})
}