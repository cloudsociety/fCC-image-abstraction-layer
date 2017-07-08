var request = require('supertest');
var expect = require('expect');

var {app} = require('../index.js');

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
      .end(done);
    });
  });
});
