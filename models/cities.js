var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    city_name: String,
    weather: String,
    img: String,
    temp_min: Number,
    temp_max: Number,
    longitude: Number,
    latitude: Number
}); 
var CityModel = mongoose.model('cities', citySchema);

module.exports = CityModel;
