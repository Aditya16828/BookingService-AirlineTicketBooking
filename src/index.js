const express = require('express');
const bodyparser = require('body-parser');

const {PORT} = require('./config/serverConfig.js');

const setupandrunserver = async function (){
    const app = express();

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));

    app.listen(PORT, function (){
        console.log("Server started on", PORT);
    });
};

setupandrunserver();