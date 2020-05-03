const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
  "Cuisines": String,
  "Restaurant ID": Number
});

module.exports = mongoose.model('restaurants', restaurantSchema, 'restaurants');