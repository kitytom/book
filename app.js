const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const app = express();

// 将前端打包的文件放到app中设置为静态资源
 app.use(express.static(__dirname+'/public'))
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// 解析 application/json
app.use(bodyParser.json());

app.use(cors());

//设置跨域请求
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
app.use(function(req, res, next) {
	// status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情 况 
	res.cc = function(err, status = 1) {
			res.send({
					// 状态 
					status,
					// 状态描述，判断 err 是 错误对象 还是 字符串 
					message: err instanceof Error ? err.message : err,
			})
	}
	next()
})
// 错误中间件 
app.use(function (err, req, res, next) { 
	// 省略其它代码... // 捕获身份认证失败的错误 
	if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！') 
	// 未知错误... 
})
    // 导入配置文件
		const config = require('./config')
 // 解析 token 的中间件 
const expressJWT = require('express-jwt')
  //指定哪些接口不需要进行 Token 的身份认证 
	app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))



// 注册路由
const userRouter = require('./router/user')
app.use("/api",userRouter);

// 根据id获取用户信息
const userinfo = require('./router/userinfo')
app.use("/my",userinfo)

// 添加用户收藏的网址
const urladr = require('./router/urladress')
app.use("/url",urladr)




// 启动服务器
const port = process.env.port || 5500;
app.listen(port, () => {
	console.log(`express  http://127.0.0.1:5500   server runing ${port}`)
})
