module.exports = (sequelize, Sequelize) => {
    const Manager = sequelize.define('Manager', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        date_of_birth: {
            type: Sequelize.DATE,
        },
        gender: {
            type: Sequelize.ENUM('Male', 'Female', 'Other'),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        phone_number: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING(255),
        },
        city: {
            type: Sequelize.STRING(100),
        },
        state: {
            type: Sequelize.STRING(100),
        },
        country: {
            type: Sequelize.STRING(100),
        },
        zip_code: {
            type: Sequelize.STRING(20),
        },
        department: {
            type: Sequelize.STRING(100),
        },
        position: {
            type: Sequelize.STRING(100),
        },
        hire_date: {
            type: Sequelize.DATE,
        },
        salary: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        education_degree: {
            type: Sequelize.STRING(100),
        },
        institution: {
            type: Sequelize.STRING(100),
        },
        graduation_year: {
            type: Sequelize.INTEGER,
        },
        skill: {
            type: Sequelize.STRING(100),
        },
        project: {
            type: Sequelize.STRING(255),
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Manager;
};
