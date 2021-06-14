const
    User = require('.././database/user'),
    gravatar = require('gravatar'),
    jwt = require('.././utils/jwt'),
    pwdHash = require('.././utils/pwdHash'),
    resdate = require('.././utils/resdate').resdate,
    role = require('.././utils/role')

module.exports = {

    //@router  GET api/user/data
    //@desc    数据测试
    //@access  data
    data: async (ctx, next) => {
        ctx.body = {
            msg: "获取数据"
        }
    },

    //@router  POST api/user/login
    //@desc    用户登录
    //@access  User    
    login: async (ctx, next) => {
        const req = ctx.request.body;
        let userVerification = await User.user.findOne({ email: req.email });
        if (userVerification) {
            let pwdPassword = (await User.user.findById(userVerification._id)).password;
            if (pwdHash.compare(req.password, pwdPassword)) {
                try {
                    const rule = {
                        id: userVerification._id,
                        name: userVerification.name
                    }// 定义token规则
                    let token = jwt.getToken({ rule });
                    ctx.body = {
                        msg: "登录成功",
                        code: 1,
                        id:rule.id,
                        name:rule.name,
                        token: token
                    }
                } catch (err) { console.log(err) }
            } else {
                ctx.body = {
                    msg: "密码输入错误!"
                }
            }
        } else {
            ctx.body = {
                msg: "用户名或邮箱不存在!"
            }
        }


    },

    //@router  POST api/user/register
    //@desc    用户注册
    //@access  User       
    register: async (ctx, next) => {
        const req = ctx.request.body;
        let userVerification = await User.user.findOne({ email: req.email });
        if (!userVerification) {
            const rule = new User.user({
                email: req.email,
                name: req.name,
                iphone: req.iphone,
                avatar: gravatar.url(req.email, { s: '200', r: 'g', d: 'mm' }),
                identity: req.identity,
                sex:req.sex,
                password: pwdHash.hashSync(req.password),
                date: req.date
            })
            await rule.save()
            ctx.body = {
                msg: "用户注册成功!",
                code: 1
            }
        } else {
            ctx.body = {
                msg: "用户已被注册!",
                code: 2
            }
        }
    },

    //@router  GET api/user/getLoginMonomer
    //@desc    获取已登录用户信息
    //@access  User    
    getLoginMonomer: async (ctx, next) => {
        let res = ctx.state.user
        ctx.body = {
            date: resdate(res.date),
            id: res.id,
            email: res.email,
            username: res.name,
            avatar: res.avatar,
            sex: res.sex,
            identity: res.identity,
            role: role[res.identity]
        }

    },

    //@router  GET api/user/getMonomer
    //@desc    获取单体用户信息
    //@access  User       
    getMonomer: async (ctx, next) => {
        let user = await User.user.findOne({ _id: ctx.request.params.id })
        if (user) {
            ctx.body = {
                date: resdate(user.date),
                id: user.id,
                email: user.email,
                username: user.name,
                avatar: user.avatar,
                sex: user.sex,
                identity: user.identity
            }
        }
    },

    //@router  GET api/user/getMonomers
    //@desc    获取全体用户信息
    //@access  User       
    getMonomers: async (ctx, next) => {
        let whole = await User.user.find();
        ctx.body = {
            data: whole
        }
    },

    //@router  GET api/user/editUsers
    //@desc    编辑用户信息
    //@access  User   
    editUsers:async  (ctx, next) => {
        const user = {}
        const res=ctx.request.body
        if (res.name) user.name = res.name;
        if (res.email) user.email = res.email;
        let edit =await User.user.findOneAndUpdate({ _id: ctx.state.user.id }, { $set: user }, { returnOriginal: false }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc)
        })
        if (edit) {
            ctx.body = {
                 msg: "编辑成功!"
            }
         }
    },

    //@router  DELETE api/user/delMonomer
    //@desc    删除单体用户
    //@access  User         
    delMonomer: async (ctx, next) => {
        let del = await User.user.findOneAndRemove({ _id: ctx.request.params.id }, { new: true });
        if (del) {
            ctx.body = {
                msg: "成功删除该用户!"
            }
        } else {
            ctx.body = {
                msg: '用户删除失败!'
            }
        }
    }

}