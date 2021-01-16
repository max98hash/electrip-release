const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const stations = require('./routes/stations');

/*mongoose.connect('mongodb+srv://admin:er0A8rezTbXd5XWM@cluster0-ejizk.mongodb.net/stations?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));*/

const DBNAME = "stations";
const HOST = "mongodb:27017";
const HOST_LOCAL = "localhost:27017";

mongoose.connect(`mongodb://${HOST_LOCAL}/${DBNAME}`,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/stations', stations);

module.exports = app;