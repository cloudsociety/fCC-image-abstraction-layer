var fs = require('fs');

var file = __dirname + '/../public/latest.json';

getLatestSearches = () => {
  var terms = {latest_searches: []};

  try {
    var data = fs.readFileSync(file, 'utf8');
  } catch(e) {
    setLatestSearches(terms);
    return terms;
  }

  return JSON.parse(data);

}

setLatestSearches = (obj) => {
  var data = JSON.stringify(obj, null, 4);
  fs.writeFileSync(file, data);
}

module.exports = {getLatestSearches,setLatestSearches};
