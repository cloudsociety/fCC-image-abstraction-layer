require('./config/config.js');

var express = require('express');
const app = express();

var {getLatestSearches,setLatestSearches} = require('./utils/latestsearches.js');

app.use(express.static('public'));

app.get('/search/:term', (req,res) => {
  var latestTerms = getLatestSearches();
  var searchTerm = req.params.term;

  latestTerms.latest_searches.push(searchTerm);
  setLatestSearches(latestTerms);

  res.send('search works');
});

app.get('/latest', (req, res) => {
  var latestTerms = getLatestSearches();
  res.send(latestTerms);
});


app.listen(process.env.PORT, function () {
  console.log(`Express server is up on port ${process.env.PORT}`);
});

module.exports = {app};
