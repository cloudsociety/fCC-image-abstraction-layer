var request = require('supertest');
var expect = require('expect');
var fs = require('fs');

var {app} = require('../index.js');

var {populateLatest,seedData} = require('./seed.js');
beforeEach(populateLatest);

describe('Server', () => {
  describe('GET /', () => {
    it('should return index.html response', (done) => {
      request(app)
      .get('/')
      .expect(200)
      .end(done);
    });
  });


  describe('GET /search/:query', () => {
    it('should return valid search object', (done) => {
      var query = 'fish'
      request(app)
      .get(`/search/${query}`)
      .expect(200)
      .end(done);
    });
  });


  describe('GET /latest', () => {
    it('should return recent search queries', (done) => {
      request(app)
      .get('/latest')
      .expect(200)
      .expect((res) => {
        expect(res.body.latest_searches.length).toBe(4);
        expect(res.body).toEqual(seedData);
      })
      .end(done);
    });
  });
});
