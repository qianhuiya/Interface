const moment = require('moment')

moment.suppressDeprecationWarnings = true;
const resdate = (date)=> {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
    resdate
}