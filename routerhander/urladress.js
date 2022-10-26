const db = require('../db/index')
// 添加网址
exports.getUrl =(req,res)=>{
  const urlinfo=req.body
  // 判断adress是否相同  相同就不让添加
  const sqlStr='select * from urladress where urlname=?'
  db.query(sqlStr,urlinfo.urlname,function(err,results){
    if(err) return res.cc(err,6)
    if(results.length >0){
      return res.cc('地址被占用')
    }
    const insetdata={
      ...req.body,
      userid:req.user.id
    }
    const sql='insert into urladress set ?'
    db.query(sql,insetdata,function(err,results){
     if(err) return res.cc(err)
    if(results.affectedRows !==1) return res.cc('发布失败')
    res.cc('发布成功')
    })
  })
}
// 获取用户添加的网址
exports.getuserurl=(req,res)=>{
  const sql = 'select urlname,urladres from urladress where userid=? '
  //'select urlname , urladres from urladress where userid=? '  req.user.id
  db.query(sql,req.user.id,function(err,results){
    if(err) return res.cc(err)
    if(results.length == 0) return res.cc('查询失败')
    res.send({
      status:0,
      message:'获取成功',
      data:results
    })
  })
}