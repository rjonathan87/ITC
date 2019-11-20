const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize('', '', '', {
    host: 'cimesistema.ddns.net',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
