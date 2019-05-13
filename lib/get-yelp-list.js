const axios = require("axios");

/**
 * Gets the maximum number of results from the Yelp api for our query
 * @returns {number}
 */
module.exports = (maxResults) => {
  let endpoint = process.env.YELP_ENDPOINT;
  let options = {
    headers: { Authorization: `Bearer ${process.env.YELP_TOKEN}` }
  };
}