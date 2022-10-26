const express=require('express')

const router=express.Router()

// 获取用户信息
const userhanderinfo = require('../routerhander/userinfo')
router.get('/getuser',userhanderinfo.getUser)

// 更改用户头像路由
router.post('/upuserpic',userhanderinfo.upuserpic)

// 获取用户的文章
router.get('/gettext',userhanderinfo.getText)
// 根据文章id获取当前文章的信息
router.post('/gettext',userhanderinfo.getbokemessage)
module.exports=router