module.exports = {
    port: 9999,
    mongoUrl: "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    headerToken:"Bearer",
    jwtSecret: "secret",
    saltTimes: 10,
    jwtExpiresTime: 72 * 3600
}