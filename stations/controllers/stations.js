const Station = require('../models/station');
const fetch = require('node-fetch');

exports.getStations = (req, res, next) => {
    var latitude =  req.params.latitude;
    var longitude =  req.params.longitude;
    var distance =  req.params.distance;

    fetch("https://api.openchargemap.io/v3/poi/?latitude=" + latitude + "&longitude=" + longitude + "&output=json&maxresults=10&distance=" + distance + "&distanceunit=KM&compact=true")
    .then(res => res.json())
    .then(json => console.log(json));
}