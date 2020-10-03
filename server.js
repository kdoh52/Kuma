const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

const db = require('./models');

db.sequelize.sync().then(()=>{
    app.listen(PORT, ()=> console.log(`Server Started On PORT: ${PORT}`));
})
