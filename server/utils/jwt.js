const jwt = require('jsonwebtoken');
const config = require('../.././config');

const getToken = (rule)=> {
    return config.headerToken + " " + jwt.sign(rule, config.jwtSecret, { expiresIn: config.jwtExpiresTime })
}

module.exports = {
    jwt,
    getToken
}