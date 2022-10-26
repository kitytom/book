const express=require('express')

const router=express.Router()

const userhanderinfo = require('../routerhander/urladress')
router.post('/urladres',userhanderinfo.getUrl)
router.get('/geturl',userhanderinfo.getuserurl)

module.exports=router