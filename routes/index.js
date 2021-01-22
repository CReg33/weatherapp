let express = require('express');
let router = express.Router();
let request = require("sync-request");
// Model :
let CityModel = require('../models/cities');

/* ROUTES */

/* WEATHER */

/* GET Home Page */
router.get('/', function(req, res, next) {
  req.session.message;
  req.session.message = "welcome";
  console.log(req.session.message);
  res.render('login', { message: req.session.message });
});

/* GET Weather Page */
router.get('/weather', async function(req, res, next) {
  let error = [];
  let cities = await CityModel.find();
  res.render('weather', { cities, error });
});

/* ADD city to Weather Page */
router.post('/add/city', async function(req, res, next) {
  let dataAPI = getWeatherFromWebservice(req.body);  
  // check error entering city name
  let error = [];
  let statusAPI = dataAPI.cod;
  if (statusAPI === "404") {
    error.push({ message: `${req.body.city_name} is not a valid city. Please check spelling.`});
  } else {
  // check that city is not already in the list
  let exists = false;
  let city = await CityModel.find({ city_name: req.body.city_name });
  if (city.length > 0) {
    exists = true; 
  }
  // add a new city (not already in the list)
  if (exists===false) {
    await addCity(req, dataAPI);  
  }
}
  let cities = await CityModel.find();
  res.render('weather', { cities, error });
});

/* DELETE a city from Weather Page */
router.get('/delete/city/', async function(req, res, next) {
  let error = []; 
  await CityModel.deleteOne({_id: req.query.id});
  let cities = await CityModel.find();
  res.render('weather', {cities, error });
});

/* UPDATE cities */ 
router.get('/update/cities', async function(req, res, next) {
  let error = [];
  let cities = await CityModel.find();
  for (let i=0 ; i< cities.length ; i++ ) {
    let dataAPI = getWeatherFromWebservice(cities[i]);  
    await updateCity(cities[i], dataAPI);
  }
  cities = await CityModel.find();
  res.render('weather', { cities , error });
});


/* FUNCTIONS */

getWeatherFromWebservice = (e) => {
  let result = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${e.city_name}&appid=d0ba1ac8caa4503181518dd9d3035b34`);
  let dataAPI = JSON.parse(result.body);
  return dataAPI;
}

addCity = async (req, dataAPI) => {
  newCity = new CityModel({
    city_name: req.body.city_name,
    weather: dataAPI.weather[0].description,
    img: `http://openweathermap.org/img/wn/${dataAPI.weather[0].icon}@2x.png`,
    temp_min: parseInt(dataAPI.main.temp_min - 273),
    temp_max: parseInt(dataAPI.main.temp_max - 273),
    longitude: dataAPI.coord.lon,
    latitude: dataAPI.coord.lat
  });
  await newCity.save();
}

updateCity = async (city, dataAPI) => {
  await CityModel.updateOne({
    _id: city._id
  },
    {
      weather: dataAPI.weather[0].description,
      img: `http://openweathermap.org/img/wn/${dataAPI.weather[0].icon}@2x.png`,
      temp_min: parseInt(dataAPI.main.temp_min - 273),
      temp_max: parseInt(dataAPI.main.temp_max - 273)
    });
}

module.exports = router;







