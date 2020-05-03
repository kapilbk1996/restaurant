const mongoose = require("mongoose");

const connect = (config) => {
    console.log("HEREEEEE", config.MONGO_URI);
    
    mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 4000,
    })
        .then(() => {
            console.log('Database: ',
                { message: 'Successfully connected to the database' });
            
        })
        .catch((err) => {
            console.log('Database: ', { message: err });
            process.exit();
        });
};

module.exports = {
    connect
};