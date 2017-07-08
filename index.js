require('./config/config.js');

// var _ = require('lodash');
var axios = require('axios');
var express = require('express');
const app = express();

var {getLatestSearches,setLatestSearches} = require('./utils/latestsearches.js');

app.use(express.static('public'));

app.get('/search/:term', (req,res) => {
  var latestTerms = getLatestSearches();
  var searchTerm = req.params.term;
  var page = req.query.offset ? (req.query.offset*10)+1 : 1;

  latestTerms.latest_searches.push(searchTerm);
  setLatestSearches(latestTerms);

  // `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE}&q=${searchTerm}&searchType=image`
  const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE}&q=${searchTerm}&searchType=image&start=${page}`;
  axios.get(url).then((response) => {
    var items = response.data.items;
    items = items.map((item) => {
      return {
        url: item.link,
        snippet: item.snippet,
        thumbnail: item.image.thumbnailLink,
        context: item.image.contextLink
      }
    });
    res.status(200).send(items);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.get('/latest', (req, res) => {
  var latestTerms = getLatestSearches();
  res.send(latestTerms);
});


app.listen(process.env.PORT, function () {
  console.log(`Express server is up on port ${process.env.PORT}`);
});

module.exports = {app};
