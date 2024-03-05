const Sequelize = require("sequelize");
const { databases } = require("../Config/development.json");

const sequelize = new Sequelize(databases.db, databases.username, databases.password, {
    host: databases.host,
    dialect: databases.dialect,
    operatorsAliases: false,
    logging: false,

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Group = require("./Group.js")(sequelize, Sequelize);
db.Admin = require("./Admin.js")(sequelize, Sequelize);
db.Employee = require("./Employee.js")(sequelize, Sequelize);
db.Manager = require("./Manager.js")(sequelize, Sequelize);

module.exports = db;
