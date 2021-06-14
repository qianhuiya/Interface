const
    path = require('path'),
    koa = require('koa'),
    Router = require('koa-router'),
    bodyParser = require('koa-bodyparser'),
    koaBody = require('koa-body'),
    cors = require('koa2-cors'),
    jwt = require('jsonwebtoken'),
    db = require('./server/database/mongodb'),
    config = require('./config'),
    passport = require('koa-passport')

//实例化
const app = new koa();
const router = new Router();
app.use(passport.initialize());
app.use(passport.session());
require('./server/utils/passport')(passport);

// app.use(bodyParser());//post
app.use(koaBody({
    multipart: true,
    strict: false,  //如果为true，不解析GET,HEAD,DELETE请求
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));

app.use(    //跨域
    cors({
        // origin: function (ctx) { //设置允许来自指定域名请求
        //     if (ctx.url === '/') {
        //         return '*'; // 允许来自所有域名请求
        //     }
        //     return `http://localhost:${config.port}`;
        // },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: false, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Authorization', 'x-requested-with'] //设置获取其他自定义字段
    })
);
db.connect();//连接数据库

//分配路由
const users = require('./server/routers/users');
const project = require('./server/routers/project');
router.use("/api/user", users);
router.use("/api/project", project);

//启动router
app.use(router.routes()).use(router.middleware())
//启动服务
app.listen(config.port, () => {
    console.log(`Server started successfully on :  http://localhost:${config.port}`);
});