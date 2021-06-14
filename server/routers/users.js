const
    Router = require('koa-router'),
    router = new Router(),
    controller= require('.././controllers/users'),
    passport = require('koa-passport'),
    jwt = require('jsonwebtoken')

    router.get('/data',controller.data);//测试数据
    router.post('/login',controller.login);//用户登录
    router.post('/register',controller.register);//用户注册
    router.get('/getLoginMonomer',passport.authenticate('jwt', { session: false }),controller.getLoginMonomer);//获取已登录用户信息
    router.get('/getMonomer/:id',passport.authenticate('jwt', { session: false }),controller.getMonomer);//查询单体用户信息
    router.get('/getMonomers',passport.authenticate('jwt', { session: false }),controller.getMonomers);//查询全体用户信息
    router.post('/editUsers',passport.authenticate('jwt', { session: false }),controller.editUsers);//编辑用户信息
    router.delete('/delMonomer/:id',passport.authenticate('jwt', { session: false }),controller.delMonomer);//删除单体用户

module.exports = router.routes();