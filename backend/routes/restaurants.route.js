module.exports = (app) => {
    const restaurants = require('../controllers/restaurants.controller');
    app.get('/restaurants', restaurants.getRestaurants);
    app.get('/cuisines', restaurants.getCuisines);
    app.post('/filterCuisines', restaurants.filterCuisines);
}