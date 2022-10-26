const express= require('express')

const router=express.Router()

// 注册路由
const userHander=require('../routerhander/user')
router.post('/reguser',userHander.regUser)
// 登录路由
router.post('/login',userHander.loginUser)
// 暴露出去


module.exports=router