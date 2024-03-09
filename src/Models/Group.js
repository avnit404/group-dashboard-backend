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
            type: Sequelize.TEXT('long'),
            allowNull: true,
        },
        column: {
            type: Sequelize.TEXT('long'),
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Group;
};
