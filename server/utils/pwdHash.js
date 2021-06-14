const
    bcryptjs = require('bcryptjs'),
    config = require('../.././config')

const hashSync = (password) => {
    return bcryptjs.hashSync(password, config.saltTimes);;
};

/**
 * 对比密码
 * @param {String} pwd 现有密码
 * @param {String} hashPwd 已被哈希的密码
 */
const compare = (pwd, hashPwd) => {
    const result = bcryptjs.compareSync(pwd, hashPwd)
    return result
}

module.exports = {
    hashSync,
    compare
}