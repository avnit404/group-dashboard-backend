const express = require('express');
const router = express.Router();
const groupController = require('../Controllers/groupController');

router.post("/createGroup", groupController.createGroup);
router.get('/getGroup', groupController.getGroups);
router.get('/getTableAndColumn', groupController.getTablesAndColumns);
router.post("/updateGroup", groupController.updateGroup);

module.exports = router;