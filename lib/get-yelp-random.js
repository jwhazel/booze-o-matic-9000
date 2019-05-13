const axios = require("axios");
/**
 * Get a random listing from Yelp API
 * @param {number} maxResults - the maximum number of results to choose from
 * @returns {object}
 */
module.exports = (maxResults = 0) => {
  let endpoint = process.env.YELP_ENDPOINT;
  let options = {
    headers: { Authorization: `Bearer ${process.env.YELP_TOKEN}` }
  };
  let rndEntry = Math.ceil(Math.random() * maxResults);

  return new Promise((resolve, reject) => {
    axios
      .get(endpoint.replace("{{offset}}", rndEntry), options)
      .catch(err => {
        reject(err);
      })
      .then(res => {
        let output = res.data.businesses.map(n => {
          return {
            id: n.id,
            name: n.name,
            image_url: n.image_url,
            url: n.url,
            rating: n.rating,
            lat: n.coordinates.latitude,
            lng: n.coordinates.longitude,
            price: n.price,
            address: n.location.display_address,
            closed: n.is_closed,
            categories: n.categories.map(e => e.title),
            cursor: `${rndEntry} of ${maxResults}`
          };
        });
        resolve(output[0]);
      });
  });
};
