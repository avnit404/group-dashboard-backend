const express = require('express');
const router = express.Router();
const groupController = require('../Controllers/groupController');

router.post("/createGroup", groupController.createGroup);
router.get('/getGroup', groupController.getGroups);
router.get('/getTableAndColumn', groupController.getTablesAndColumns);
router.post("/updateGroup", groupController.updateGroup);
router.get("/admin",groupController.getAdmins);
router.get("/employee",groupController.getEmployees);
router.get("/manager",groupController.getEmployees);
// router.get('/table/:tableName/columns', groupController.getTableColumns)
router.get('/:groupId', groupController.getTableColumns);
// router.get('/:groupId/tables/:tableName/columns/:columnId', groupController.getColumnById)
router.get('/:groupId/tables/:tableName/columns', groupController.getColumnByTable)
router.get('/:groupId/tables/:tableName/columns/:columnName', groupController.getSelectedColumn)
// router.delete('/:groupId/tables/:tableName/columns/:columnId', groupController.deleteColumnById)
module.exports = router;