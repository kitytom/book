const db=require('../db/index')
// 导入配置文件 
const config = require('../config')
// 用这个包来生成 Token 字符串 
const jwt = require('jsonwebtoken')
// 对密码进行加密
const bcrypt = require('bcryptjs')
// -------注册-------
exports.regUser = (req, res) => {
   const userinfo = req.body
      // 拿到客服端传递过来的表单数据
       // 判断输入的用户名和密码是否为空
          if (!userinfo.username || !userinfo.password) {
               return res.cc('用户名密码不能为空')
           }
        // 判断用户名是否被占用
        //定义数据库语句查询语句 
         // 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

          const sqlStr = 'select * from user where username=?'
        db.query(sqlStr,userinfo.username,function(err,results){
            if(err) return res.cc(err)
            if(results.length>0){
                return res.cc('用户名被占用',0)
            }
            const sql='insert into user set?'
            db.query(sql,{username:userinfo.username,password:userinfo.password},function(err,results){
                if(err) return res.cc(err)
                if(results.affectedRows !== 1) return res.cc(err)
                res.cc('注册成功',0)
            })
        })


}

exports.loginUser=(req,res)=>{
    const loginuser= req.body
    const sql = `select * from user where username=?`
    db.query(sql, loginuser.username, function (err, results) { 
        // 执行 SQL 语句失败
         if (err) return res.cc(err) 
         // 执行 SQL 语句成功，但是查询到数据条数不等于 1 
         if (results.length !== 1) return res.cc('登录失败！') 
         // TODO：判断用户输入的登录密码是否和数据库中的密码一致
         // 拿着用户输入的密码,和数据库中存储的密码进行对比 
         const compareResult = bcrypt.compareSync(loginuser.password, results[0].password)
         // 如果对比的结果等于 false, 则证明用户输入的密码错误
          if (!compareResult) { 
            return res.cc('登录失败！') 
        }
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值 
        const user = {...results[0], password: '', user_pic: '' }
          // 生成 Token 字符串 
          const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h'
        })
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer ' + tokenStr
        })
        })
}
