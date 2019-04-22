const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  tripname: String,
  origin: String,
  destination: String,
  waypoints: [],
  userid: String
});

module.exports = mongoose.model("Trip", tripSchema);

