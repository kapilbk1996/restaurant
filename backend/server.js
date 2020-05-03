const server = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoConfig = require('./config/mongoConfig');

server.use(bodyParser.json());

/* Support parsing of application/x-www-form-urlencoded post data */
server.use(bodyParser.urlencoded({ extended: true }));

/* Enable CORS - Cross Origin Resource Sharing */
server.use(cors());


/* Mongo configuration util initialisation */
require('./db_util/mongoClient').connect(mongoConfig);

/* All route files initialisation */
require('./routes/restaurants.route')(server);

server.listen(3001, () => {
    console.log('Server started successfully');
    console.log('Listening at port 3001');
});

