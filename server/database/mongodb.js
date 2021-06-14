const
    config = require('../.././config'),
    mongoose = require("mongoose")
    
    mongoose.set('useFindAndModify', false)
class Db {
    constructor() {
        this.mongoose = mongoose
        this.client = null // 存放连接后的数据库实体
        this.userModel = null
    }

    connect() { //连接数据库
        return new Promise((reslove, reject) => {
            if (!this.client) {
                this.db = mongoose.connect(config.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true }).then((client) => {
                    console.log(`
                  ***************************************
                  
                        Mongodb connection successful!
                
                  ***************************************
                    `);
                    this.client = client;
                    reslove(client);
                    this.mongoose.Promise = global.Promise;
                }).catch((err) => {
                    reject(err)
                    console.log(err)
                })
            } else {
                console.log(`
                ***********************************************************
                
                    Mongodb is connected. Please do not connect again!
              
                ***********************************************************
                  `);
                reslove()
            }
        })
    }
}

module.exports = new Db()