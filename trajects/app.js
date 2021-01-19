const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const trajects = require('./routes/trajects');

const DBNAME = "trajects";
const HOST = "mongodb:27017";
const HOST_LOCAL = "localhost:27017";

mongoose.connect(`mongodb://${HOST}/${DBNAME}`,
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/trajects', trajects);

module.exports = app;