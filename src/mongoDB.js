const mongoose = require('mongoose');

module.exports = function() {
    const { MONGO_HOST, MONGO_PORT, MONGO_DB_NAME} = process.env;
    const connectionURI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;

    console.log(connectionURI);

    mongoose.connect(connectionURI);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log(`Connection to ${connectionURI} open`);
    });
}