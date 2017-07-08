var request = require('supertest');
var expect = require('expect');

var {getLatestSearches,setLatestSearches,uniqueEntries} = require('../utils/latestsearches.js');

var {populateLatest,seedData} = require('./seed.js');
beforeEach(populateLatest);

describe('Latest Searches', () => {
  describe('getLatestSearches', () => {
    it('should return recent searches object', () => {
      var response = getLatestSearches();
      expect(response).toExist();
      expect(response.latest_searches.length).toBe(4);
    });
  });


  describe('setLatestSearches', () => {
    it('should update recent search object', () => {
      var data = {latest_searches: seedData.latest_searches.slice()};
      data.latest_searches.push('kangaroo');

      var response = setLatestSearches(data);
      expect(response).toExist();
      expect(response.latest_searches.length).toBe(5);
      expect(response.latest_searches[response.latest_searches.length-1]).toBe('kangaroo');
    });

    it('should not update recent search object with duplicates', () => {
      var data = {latest_searches: seedData.latest_searches.slice()};
      data.latest_searches.push('shark');

      var response = setLatestSearches(data);
      expect(response).toExist();
      expect(response.latest_searches.length).toBe(4);
      expect(response.latest_searches[response.latest_searches.length-1]).toBe('shark');
    });
  });


});
