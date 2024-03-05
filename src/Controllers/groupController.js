const { Group } = require('../Models')
const { Sequelize, where } = require('sequelize');
const db = require('../Models')

exports.createGroup = async (req, res) => {
    const payload = req.body
    try {
        console.log("payload", payload)
        const data = await Group.create(payload)
        return res.status(200).send({ data, message: "Group created successfully" });
    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}


exports.updateGroup = async (req, res) => {
    const payload = req.body;

    try {
        const groupId = payload.id;
        console.log("payload", payload)
        const data = await Group.update(payload, {
            where: {
                id: groupId
            }
        })
        return res.status(200).send({ data, message: "Group updated successfully" });
    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}

exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.findAll({});
        return res.status(200).json({ groups });
    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}

exports.getTablesAndColumns = async (req, res) => {
    try {
        let tables = await db.sequelize.getQueryInterface().showAllTables()
        const tableColumns = {};
        for (const table of tables) {
            if (table !== "Group") {
                const columns = await db.sequelize.queryInterface.describeTable(table);
                const columnNames = Object.keys(columns);
                tableColumns[table] = columnNames;
            }
        }
        tables = tables.filter((table) => table !== "Group")
        return res.status(200).send({ tables, columns: tableColumns });
    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}