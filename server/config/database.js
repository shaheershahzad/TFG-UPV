const mongoose = require("mongoose");
const databaseURL = require("./properties").DB;
//const URI = "mongodb://localhost/TFG-UPV";

module.exports = () => {
    mongoose.connect(databaseURL, { useNewUrlParser: true, useFindAndModify: false })
    .then(db => console.log(`DB is connected ${databaseURL}`))
    .catch(err => console.log(err));

    process.on("SIGINT", () => {
        mongoose.connection.close( () => {
            console.log("Mongo is disconnected");
            process.exit(0);
        });
    });
}