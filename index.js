const express = require("express");
const yelp = require("./lib/yelp");
var cors = require("cors");
const fs = require("fs");

//Load our config file
require("dotenv").config();

//Setup express and use the public directory
const app = express();
app.use(cors());
app.use(express.static("public"));

//Set our data file, create a new one if it doesn't exist
const dataFile =
  process.env.LOCATION.toLowerCase()
    .replace(" ", "")
    .replace(",", "-")
    .trim() + ".json";

if (!fs.existsSync(`./data/${dataFile}`)) {
  var data = yelp()
    .getFullList()
    .then(data => {
      fs.writeFileSync(`./data/${dataFile}`, JSON.stringify(data));
    })
    .catch(err => {
      console.error("Could not write initial data file");
      console.error(err);
      process.exit();
    });
}

/**
 * ROUTES
 */

//Send the full list of bars
app.get("/api/get-data", async function(req, res) {
  var response = JSON.parse(fs.readFileSync(`./data/${dataFile}`, 'utf8'))
  res.json(response);
});

//Pull a new list from Yelp and merge with the existing one
app.put("/api/update-data", async function(req, res){

})

//Update the ignore or beenThere part of the file
app.post("/api/update-record", async function(req, res){

})

//Start our server
app.listen(process.env.SERVER_PORT, () =>
  console.log(`App listening on port ${process.env.SERVER_PORT}!`)
);
