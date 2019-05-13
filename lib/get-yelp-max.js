const axios = require("axios");

/**
 * Gets the maximum number of results from the Yelp api for our query
 * @returns {number}
 */
module.exports = () => {
  let endpoint = process.env.YELP_ENDPOINT;
  let options = {
    headers: { Authorization: `Bearer ${process.env.YELP_TOKEN}` }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(endpoint.replace("{{offset}}", 0), options)
      .catch(err => {
        reject(err);
      })
      .then(res => {
        resolve(res.data.total);
      });
  });
};
