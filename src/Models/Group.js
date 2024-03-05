module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define('Group', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        groupName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        table: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        column: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Group;
};