const db=require('../db/index')
exports.getUser=(req,res)=>{
 // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段 
    const sql = `select id, username, nickname, email, user_pic,user_title from user where id=?`
        // 注意：req 对象上的 user 属性，是 Token 解析成功，
        //express-jwt 中间件帮我们挂载上去的 会携带id
    db.query(sql, req.user.id, (err, results) => {
        // 1. 执行 SQL 语句失败 
        if (err) return res.cc(err)
            // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1 
        if (results.length !== 1) return res.cc('获取用户信息失败！')
            // 3. 将用户信息响应给客户端 
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results,
        })
    })
}

exports.upuserpic=(req,res)=>{
    const sql = 'update user set user_pic=? where id=?'
    db.query(sql,[req.body.user_pic,req.user.id],function(err,results){
        if(err) return res.cc(err)
        if(results.affectedRows !==1) return res.cc('执行失败')
        res.cc('头像更改成功')
    })
}

// 获取用户的文章
exports.getText=(req,res)=>{
    const sql = 'select * from userbook where userid=?'
    db.query(sql,req.user.id,(err,results)=>{
       if(err) return res.cc(err)
       if(results.length == 0) return res.cc('查询失败')
       res.send({
        status:0,
        message:'查询成功',
        data:results
       })
    })
}
exports.getbokemessage=(req,res)=>{
    const sql = 'select * from userbook where id=?'
    db.query(sql,req.body.id,(err,results)=>{
        if(err) return (err)
        if(results.length==0) return res.cc('查询失败')
        res.send({
            state:0,
            message:'查询成功',
            data:results
        })
    })

}