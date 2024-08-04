const mongoose = require("mongoose")

async function connectToBlogDB()   
{
    await mongoose.connect("mongodb://localhost:27017/blog_database") //async function look into notepad async convert to sync using await
    console.log("Connected to database.")
}

module.exports = connectToBlogDB // used in express to export the function to be used in other scripts

//export default connectToDB  // used in react

