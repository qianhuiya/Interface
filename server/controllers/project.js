const
    Profile = require('.././database/project'),
    jwt = require('.././utils/jwt'),
    resdate = require('.././utils/resdate').resdate

module.exports = {

    //@router  POST api/project/addProject
    //@desc    新建数据
    //@access  Private
    addProject: async (ctx, next) => {
        let res = ctx.request.body
        const profileFields = {}
        if (res.title == "" || res.type == "" || res.author == "" || res.price == "" || res.introduce == "" || res.number == "") {
            ctx.body = {
                code:2,
                msg: "请将表单填写完整!"
            }
        } else {
            if (res.type) profileFields.type = res.type;
            if (res.title) profileFields.title = res.title;
            if (res.author) profileFields.author = res.author;
            if (res.price) profileFields.price = res.price;
            if (res.introduce) profileFields.introduce = res.introduce;
            if (res.number) profileFields.number = res.number;
            new Profile.profile(res).save()
            ctx.body = {
                code:1,
                msg: "添加成功！"
            }
        }
    },

    //@router  POST api/project/editProject
    //@desc    编辑数据
    //@access  Private
    editProject: async (ctx, next) => {
        let res = ctx.request.body
        const profileFields = {}
        if (res.type) profileFields.type = res.type;
        if (res.title) profileFields.title = res.title;
        if (res.author) profileFields.author = res.author;
        if (res.price) profileFields.price = res.price;
        if (res.introduce) profileFields.introduce = res.introduce;
        if (res.number) profileFields.number = res.number;
        if (res.date == undefined) {
            profileFields.date = resdate(new Date())
        }
        let edit = Profile.profile.findOneAndUpdate({ _id: ctx.request.params.id }, { $set: profileFields }, { returnOriginal: false }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc)
        })
        if (edit.length > 0) {
            ctx.body = {
                msg: "编辑成功!"
            }
        }
    },

    //@router  GET api/project/getProject
    //@desc    获取个体数据
    //@access  Private
    getProject: async (ctx, next) => {
        let res = ctx.request.body
        let get = await Profile.profile.findOne({ _id: ctx.request.params.id })
        if (get == null) {
            ctx.body = {
                msg: "没有任何内容!"
            }
        } else {
            ctx.body = {
                data: get
            }
        }
    },

    //@router  GET api/project/getProjects
    //@desc    获取全体数据
    //@access  Private
    getProjects: async (ctx, next) => {
        let res = ctx.request.body
        let get = await Profile.profile.find()
        if (get == null) {
            ctx.body = {
                msg: "没有任何内容!"
            }
        } else {
            ctx.body = {
                data: get
            }
        }
    },

    //@router  DELETE api/project/delProject
    //@desc    删除数据
    //@access  Private
    delProject: async (ctx, next) => {
        let res = ctx.request.body
        let del = await Profile.profile.findOneAndRemove({ _id: ctx.request.params.id })
        if (del) {
            ctx.body = {
                msg: "数据删除成功!"
            }
        } else {
            ctx.body = {
                msg: "数据删除失败!"
            }
        }
    }
}