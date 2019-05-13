const axios = require("axios");
/**
 * Factory for accessing Yelp's API
 * @namespace yelp
 */
module.exports = location => {
  //Check to make sure the location is a valid one
  if (!process.env.LOCATIONS.includes(location)) {
    throw "Location requested is not enabled in config file";
  }

  //Set the endpoint and headers
  const endpoint = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=bars&price=${
    process.env.YELP_MAX_PRICE
  }`;
  const options = {
    headers: { Authorization: `Bearer ${process.env.YELP_TOKEN}` }
  };

  //Revealing modules
  return {
    getMaxResults,
    getRandom,
    getFullList
  };

  /**
   * Return the maximum number of results from a search query
   * @memberof yelp
   * @instance
   */
  function getMaxResults() {
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint + "&limit=1", options)
        .catch(err => {
          reject(err);
        })
        .then(res => {
          resolve(res.data.total);
        });
    });
  }

  /**
   * Return a random entry
   * @memberof yelp
   * @instance
   */
  function getRandom(maxResults) {
    let rndEntry = Math.ceil(Math.random() * maxResults);
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint + "&limit=1&offset=" + rndEntry, options)
        .catch(err => {
          reject(err);
        })
        .then(res => {
          resolve(_responseFormatter(res.data.businesses)[0]);
        });
    });
  }

  /**
   * Get the entire list of entries paging the max allowable of 50 at a time and sorted alphabetically
   * @memberof yelp
   * @instance
   */
  function getFullList(maxResults) {
    let totalPages = Math.ceil(maxResults / 50);
    let results = [];
    return new Promise((resolve, reject) => {
      for (var i = 0; i < totalPages; i++) {
        axios
          .get(endpoint + "&limit=50&offset=" + i * 50, options)
          .catch(err => {
            reject(err);
          })
          .then(res => {
            results = results.concat(res.data.businesses);
            if (results.length == maxResults) {
              let formattedResults = _responseFormatter(results);
              let sortedResults = formattedResults.sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              });
              resolve(sortedResults);
            }
          });
      }
    });
  }

  /**
   * Format the entry data in a particular way
   * @memberof yelp
   * @private
   */
  function _responseFormatter(data) {
    return data.map(n => {
      return {
        id: n.id,
        name: n.name,
        image_url: n.image_url,
        url: n.url,
        searchUrl:
          "https://www.google.com/search?q=" + encodeURIComponent(n.name),
        rating: n.rating,
        lat: n.coordinates.latitude,
        lng: n.coordinates.longitude,
        price: n.price,
        address: n.location.display_address,
        closed: n.is_closed,
        categories: n.categories.map(e => e.title)
      };
    });
  }
};
