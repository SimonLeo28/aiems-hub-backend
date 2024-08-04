const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

async function connectToBlogDB()   
{
    await mongoose.connect(process.env.MONGO_URI) //async function look into notepad async convert to sync using await
    console.log("Connected to database.")
}

module.exports = connectToBlogDB // used in express to export the function to be used in other scripts

//export default connectToDB  // used in react

