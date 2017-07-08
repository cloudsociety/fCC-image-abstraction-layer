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
  obj.latest_searches = uniqueEntries(obj.latest_searches);
  var data = JSON.stringify(obj, null, 4);
  fs.writeFileSync(file, data);
}

uniqueEntries = (obj) => {
  return obj.reverse().filter(function(item,index,arr){
    return arr.indexOf(item) == index;
  }).reverse();
}

module.exports = {getLatestSearches,setLatestSearches};
