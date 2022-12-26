const express = require('express');
const bodyparser = require('body-parser');

const {PORT} = require('./config/serverConfig.js');
const v1ApiRoutes = require('./routes/index');
const db = require('./models/index');

const setupandrunserver = async function (){
    const app = express();

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));

    app.use('/api/', v1ApiRoutes);

    app.listen(PORT, function (){
        console.log("Server started on", PORT);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
    });
};

setupandrunserver();