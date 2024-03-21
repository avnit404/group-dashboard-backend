const { Group, Admin, Employee, Manager } = require('../Models')
const { Sequelize, where, Op } = require('sequelize');
const db = require('../Models')

exports.createGroup = async (req, res) => {
    const payload = req.body
    try {
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
exports.getAdmins = async (req, res) => {
    try {
        const admin = await Admin.findAll({});
        return res.status(200).json({ admin });
    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}

exports.getEmployees = async (req, res) => {
    try {
        const admin = await Employee.findAll({});
        return res.status(200).json({ admin });
    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}
exports.getManagers = async (req, res) => {
    try {
        const manager = await Manager.findAll({});
        return res.status(200).json({ manager });
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

exports.getTableColumns = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findOne({ where: { id: groupId } });
        if (!group) {
            throw new Error('Group not found');
        }
        const tables = JSON.parse(group.table);
        const tableData = {};
        const columnsData = JSON.parse(group.column);
        for (const tableName of tables) {
            const filteredColumns = columnsData.filter(column => column.table === tableName);
            let columnName = {}
            const selectedColumns = filteredColumns.map(obj => {
                columnName[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]]
                return Object.keys(obj)[0]
            });
            let tableRows;
            if (tableName === "Admin") {
                tableRows = await Admin.findAll({ attributes: selectedColumns });
            } else if (tableName === "Employee") {
                tableRows = await Employee.findAll({ attributes: selectedColumns });
            } else if (tableName === "Manager") {
                tableRows = await Manager.findAll({ attributes: selectedColumns });
            }
            tableRows = tableRows.map(({ dataValues }) => {
                const newdata = {};
                for (const key in dataValues) {
                    if (key in columnName) {
                        newdata[columnName[key]] = dataValues[key];
                    } else {
                        newdata[key] = dataValues[key];
                    }
                }
                return newdata;
            })
            tableData[tableName] = tableRows;
        }

        return res.status(200).json({ tableData });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


exports.deleteColumnById = async (req, res) => {
    const { groupId, tableName, columnId } = req.params;
    try {
        const group = await Group.findOne({ where: { id: groupId } });
        if (!group) {
            throw new Error('Group not found');
        }
        const tables = JSON.parse(group.table);
        if (!tables.includes(tableName)) {
            throw new Error('Table not found in group');
        }
        const columnsData = JSON.parse(group.column);
        const columnIdData = columnsData.filter(column => column.uniqueId !== columnId)
        return res.status(200).json({ columnIdData });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getColumnById = async (req, res) => {
    const { groupId, tableName, columnId } = req.params;
    try {
        const group = await Group.findOne({ where: { id: groupId } });
        if (!group) {
            throw new Error('Group not found');
        }
        const tables = JSON.parse(group.table);
        if (!tables.includes(tableName)) {
            throw new Error('Table not found in group');
        }
        const columnsData = JSON.parse(group.column);
        const columnIdData = columnsData.filter(column => column.uniqueId === columnId)
        return res.status(200).json({ columnIdData });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.getColumnByTable = async (req, res) => {
    try {
        const { groupId, tableName } = req.params;
        const group = await Group.findOne({ where: { id: groupId } });
        if (!group) {
            throw new Error('Group not found');
        }
        const tables = JSON.parse(group.table);
        if (!tables.includes(tableName)) {
            throw new Error('Table not found in group');
        }
        const columnsData = JSON.parse(group.column);
        const filteredColumns = columnsData.filter(column => column.table === tableName);
        const selectedColumns = filteredColumns.map(obj => Object.entries(obj)[0]);
        let tableData = {}
        let tableRows;
        if (tableName === "Admin") {
            tableRows = await Admin.findAll({ attributes: selectedColumns });
        } else if (tableName === "Employee") {
            tableRows = await Employee.findAll({ attributes: selectedColumns });
        } else if (tableName === "Manager") {
            tableRows = await Manager.findAll({ attributes: selectedColumns });
        }
        tableData[tableName] = tableRows
        return res.status(200).json({ tableData });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getSelectedColumn = async (req, res) => {
    try {
        const { groupId, tableName, columnName } = req.params;
    
        const group = await Group.findOne({ where: { id: groupId } });
        if (!group) {
            throw new Error('Group not found');
        }

         const tables = JSON.parse(group.table);
        if (!tables.includes(tableName)) {
            throw new Error('Table not found in group');
        }
        const columnsData = JSON.parse(group.column);
        const filteredColumns = columnsData.filter(column => column.table === tableName);
        let columnValue;
        for (const obj of filteredColumns) {
            const key = Object.keys(obj)[0];
            if (obj[key] === columnName) {
                columnValue = key;
              break;
            }
          }
        let tableData = {};
        let tableRows;
        
        if (tableName === "Admin") {
            tableRows = await Admin.findAll({ attributes: [columnValue] });
        } else if (tableName === "Employee") {
            tableRows = await Employee.findAll({ attributes: [columnValue] });
        } else if (tableName === "Manager") {
            tableRows = await Manager.findAll({ attributes: [columnValue] });
        }
        
        tableData[tableName] = tableRows;
        return res.status(200).json({ tableData });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
