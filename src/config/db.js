const mongoose = require("mongoose")

function connectToDB(){

    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the database successfully")
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
}

module.exports = connectToDB