const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Trip = require('./models/trip');

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://michael:qweyRooNCGuOi3OH@cluster0-pqcdh.mongodb.net/test?retryWrites=true").then(() => {
  console.log("Connected to database");
}).catch(() => {
  console.log("Connection to Mongo Failed");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});


app.get('/api/trips', (req, res, next) => {
  var id = req.headers.authorization;

  Trip.find({userid: id}).then(documents => {
    res.status(200).json(documents);
  })
});


app.post('/api/trips', (req, res, next) => {
  const trip = new Trip({
    tripname: req.body.tripname,
    origin: req.body.origin,
    destination: req.body.destination,
    waypoints: req.body.waypoints,
    userid: req.body.userid
  });
  trip.save();
  res.status(201).json({
    message: "Trip Added"
  })
});

app.delete('/api/trips/:id', (req, res, next) => {
  Trip.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "Trip Deleted"});
  })
});

app.get('/api/trips/:id', (req, res, next) => {
  var userid = req.headers.authorization;

  Trip.find({userid: userid, _id: req.params.id}).then(documents => {
    res.status(200).json(documents[0]);
  });
});


app.get('/api/yelp/:origin/:destination', (req, res, next) => {
  function listOfPoints (jsonObj) {
    var stepsList = jsonObj.routes[0].legs[0].steps;
    var pointsList = [];
    var i;
    var milesSoFar = 0;
    for (i=0; i<stepsList.length; i++) {
      var miles = stepsList[i].distance.value
      milesSoFar += miles;
      if (milesSoFar > 563270) {
        milesSoFar = 0;
        var point = stepsList[i].end_location;
        pointsList.push(point);
      }
    }
    return pointsList;
  }

  var rp = require('request-promise');

  var newOrigin = req.params.origin.replace(" ", "+");
  var newDestination = req.params.destination.replace(" ", "+");

  var options = {
    uri: 'https://maps.googleapis.com/maps/api/directions/json',
    qs: {
      origin: newOrigin,
      destination: newDestination,
      key: 'AIzaSyAvukmJAGcLH5tlnfzuCpNd6BSAOXZ9F3M'
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true
  };

  rp(options)
    .then(function (result) {
      var points = listOfPoints(result);
      var hotels = [];

      for (var i = 0; i < points.length; i ++) {
        var opt = {
          uri: 'https://api.yelp.com/v3/businesses/search',
          qs: {
            latitude: points[i].lat,
            longitude: points[i].lng,
            term: "Hotel",
            limit: 5
          },
          headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': 'bearer ' + 'oBWzDGFf4gaY2Nh6MEXa8Ckpftt4tsPq1gM7Qr_xL2PdJBwXJpPiWRjc6tmlKaePPluDfuWTliChw4durzxv35ajpHXPKqBknsUhQq3OmdVtSKgjj2rPcXlz2D-dXHYx'
          },
          json: true,
          family: 4
        };

        rp(opt).then(yelpResults => {
          var hot = [];
          var businesses = yelpResults.businesses;

          for (var l = 0; l < businesses.length; l++) {
            hotelObj = {
              name: businesses[l].name,
              img: businesses[l].image_url,
              rating: businesses[l].rating,
              coordinates: businesses[l].coordinates,
              phone: businesses[l].display_phone,
              distance: businesses[l].distance,
              url: businesses[l].url
            };
            hot.push(hotelObj);
          }
          hotels.push(hot);
          if (hotels.length === points.length) {
            res.status(200).json(hotels);
          }
        });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({message: "Something went wrong"});
    });
});

module.exports = app;
