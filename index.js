const express = require("express");
const yelp = require("./lib/yelp");
const version = require("./package.json").version;

//Load our config file and parse possible locations into an array
require("dotenv").config();
process.env.LOCATIONS = process.env.LOCATIONS.split("|").map(n => n.trim());

//Setup express and use the public directory
const app = express();
app.use(express.static("public"));

//The initial endpoint that bootstraps our app
app.get("/api/init", async function(req, res) {
  let response = null;
  let location = req.query.location;
  try {
    response = {
      ok: true,
      data: {
        mapToken: process.env.GOOGLE_TOKEN,
        maxResults: await yelp(location).getMaxResults(),
        version: version
      }
    };
  } catch (err) {
    response = { ok: false, msg: err };
  }
  res.json(response);
});

//The endpoint that gets a random business from Yelp
app.get("/api/random", async function(req, res) {
  let response = null;
  let location = req.query.location;
  let maxResults = req.query.max || (await yelp(location).getMaxResults()); //TODO: try/catch this
  try {
    response = { ok: true, data: await yelp(location).getRandom(maxResults) };
  } catch (err) {
    response = { ok: false, msg: err };
  }
  res.json(response);
});

//The endpoint that gets a full list of businesses from Yelp
app.get("/api/list", async function(req, res) {
  let response = null;
  let location = req.query.location;
  let maxResults = req.query.max || (await yelp(location).getMaxResults()); //TODO: try/catch this
  try {
    response = { ok: true, data: await yelp(location).getFullList(maxResults) };
  } catch (err) {
    response = { ok: false, msg: err };
  }
  res.json(response);
});

//Start our server
app.listen(process.env.SERVER_PORT, () =>
  console.log(`App listening on port ${process.env.SERVER_PORT}!`)
);
