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


app.get('/api/yelp', (req, res, next) => {
  function listOfPoints (jsonObj) {
    var stepsList = jsonObj.routes[0].legs[0].steps;
    var pointsList = [];
    var i;
    var milesSoFar = 0;
    for (i=0; i<stepsList.length; i++) {
      var miles = parseFloat(stepsList[i].distance.text, 10); //base 10
      milesSoFar += miles;
      if (milesSoFar > 400) {
        milesSoFar = 0;
        var point = stepsList[i].start_location;
        pointsList.push(point);
      }
    }
    return pointsList;
  }

  var rp = require('request-promise');

  var options = {
    uri: 'https://maps.googleapis.com/maps/api/directions/json',
    qs: {
      origin: 'Boston',
      destination: 'San+Diego',
      key: 'AIzaSyAvukmJAGcLH5tlnfzuCpNd6BSAOXZ9F3M'
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true
  };

  rp(options)
    .then(function (result) {
      res.status(200).json(result);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({message: "Something went wrong"});
    });
  //
  // listOfPoints(json);
});

//
// app.delete("/api/posts/:id", (req, res, next) => {
//   Post.deleteOne({_id: req.params.id}).then(result => {
//     res.status(200).json({message: "Post Deleted"});
//   });
// });
//
// app.put('/api/posts/:id', (req, res, next) => {
//   const post = new Post({
//     _id: req.body._id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   Post.updateOne({_id: req.params.id}, post).then(result => {
//     res.status(200).json({message: 'update successful'});
//   });
// });

module.exports = app;
