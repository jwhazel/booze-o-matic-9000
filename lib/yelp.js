const axios = require("axios");

/**
 * Factory for accessing Yelp's API
 * @namespace yelp
 */
module.exports = () => {
  //Set the endpoint and headers
  const endpoint = `https://api.yelp.com/v3/businesses/search?location=${process.env.LOCATION}&categories=bars,breweries&price=${process.env.YELP_MAX_PRICE}`;
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
  async function getMaxResults() {
    let output = null;
    try {
      output = await axios.get(`${endpoint}&limit=1`, options);
    } catch (err) {
      throw err;
    }
    return output.data.total;
  }

  /**
   * Return a random entry
   * @memberof yelp
   * @instance
   */
  async function getRandom(maxResults) {
    let output = null,
      rndEntry = Math.ceil(Math.random() * maxResults);
    try {
      output = await axios.get(
        `${endpoint}&limit=1&offset=${rndEntry}`,
        options
      );
    } catch (err) {
      throw err;
    }
    return _responseFormatter(output.data.businesses)[0];
  }

  /**
   * Get the entire list of entries paging the max allowable of 50 at a time and sorted alphabetically
   * @memberof yelp
   * @instance
   */
  async function getFullList(maxResults) {
    maxResults = maxResults || await this.getMaxResults();
    let output = [],
      resultsPerPage = 50,
      totalPages = Math.ceil(maxResults / resultsPerPage);

    for (let n = 0; n < totalPages; n++) {
      try {
        let res = await axios.get(
          `${endpoint}&limit=${resultsPerPage}&offset=${n * resultsPerPage}`,
          options
        );
        output.push(...res.data.businesses);
      } catch (err) {
        throw err;
      }
    }
    return _sortAlpha(_responseFormatter(output));
  }

  /**
   * Format the entry data in a particular way
   * @memberof yelp
   * @private
   */
  function _responseFormatter(data) {
    return data
      .filter(n => n.is_closed === false)
      .map(n => {
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
          categories: n.categories.map(e => e.title),
          meta: {
            beenThere: [],
            ignore: false
          }
        };
      });
  }

  /**
   * Sort array alphabetically
   * @memberof yelp
   * @private
   */
  function _sortAlpha(data) {
    return data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
};
