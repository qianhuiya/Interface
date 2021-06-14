const
    Router = require('koa-router'),
    router = new Router(),
    controller = require('.././controllers/project'),
    passport = require('koa-passport'),
    jwt = require('jsonwebtoken')

router.post('/addProject', passport.authenticate('jwt', { session: false }), controller.addProject);//新建数据
router.post('/editProject/:id', passport.authenticate('jwt', { session: false }), controller.editProject);//编辑数据
router.get('/getProject/:id', passport.authenticate('jwt', { session: false }), controller.getProject);//获取个体数据
router.get('/getProjects', passport.authenticate('jwt', { session: false }), controller.getProjects);//获取全体数据
router.delete('/delProject/:id', passport.authenticate('jwt', { session: false }), controller.delProject);//删除数据

module.exports = router.routes();