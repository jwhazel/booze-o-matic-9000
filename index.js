const express = require("express");
const cors = require("cors");
const getYelpRandom = require("./lib/get-yelp-random");
const getYelpMax = require("./lib/get-yelp-max");
const version = require("./package.json").version;

//Load our .env file
require("dotenv").config();

//Setup express to enable CORS and use the public directory
const app = express();
app.use(cors());
app.use(express.static("public"));

//The initial endpoint that bootstraps our app
app.get("/api/init", async function(req, res) {
  let response = null;
  try {
    response = {
      ok: true,
      data: {
        mapToken: process.env.GOOGLE_TOKEN,
        //maxYelpResults: await getYelpMax(),
        maxResults : 238,
        version: version
      }
    };
  } catch (err) {
    reponse = { ok: false, msg: err };
  }
  res.json(response);
});

//The endpoint that gets a random business from Yelp
app.get("/api/random", async function(req, res) {
  let response = null;
  let maxResults = req.query.max || (await getYelpMax()); //TODO: try/catch this
  try {
    response = { ok: true, data: await getYelpRandom(maxResults) };
  } catch (err) {
    response = { ok: false, msg: err };
  }
  res.json(response);
});

app.get("/api/list", async function(res, res){
  
})

//Start our server
app.listen(process.env.SERVER_PORT, () =>
  console.log(`App listening on port ${process.env.SERVER_PORT}!`)
);
