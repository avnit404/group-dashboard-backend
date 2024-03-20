const express = require('express')
const app = express()
const cors = require('cors');
const db = require("./src/Models");
const groupRoutes = require('./src/Routes/group.routes')
app.use(cors());

app.use(express.json())

const PORT = 3002

app.use("/group", groupRoutes)
app.get('/', function (req, res) {
    res.send('Hello World')
})

db.sequelize.sync().then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
module.exports = app;
