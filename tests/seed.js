var fs = require('fs');

var file = __dirname + '/../public/latest.json';

var seedData = {
    "latest_searches": [
        "cat",
        "monkey",
        "shark",
        "elephant"
    ]
};

var data = JSON.stringify(seedData, null, 4);

var populateLatest = () => {
  fs.writeFileSync(file, data);
}

module.exports = {populateLatest,seedData};
