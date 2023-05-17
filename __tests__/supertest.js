const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:3000';

describe('Route integration', () => {



  describe('/', () => {
    describe('GET', () => {
      it('responds with 404 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(404);
      });
    });
  });

  describe('/fridge', () => {
    describe('GET', () => {
      it('responds with 400 status and application/json content type', () => {
        return request(server)
          .get('/fridge')
          .expect('Content-Type', /text\/plain/)
          .expect(400);
      });

  //     // For this test, you'll need to inspect the body of the response and
  //     // ensure it contains the markets list. Check the markets.dev.json file
  //     // in the dev database to get an idea of what shape you're expecting.
  //     it('markets from "DB" json are in body of response', async () => {
  //       const response = await request(server).get('/markets');
  //       expect(Array.isArray(response.body)).toEqual(true);
  //       expect(response.body).toEqual(JSON.parse(fs.readFileSync(path.join(__dirname, '../server/db/markets.test.json'))));
  //     });
    });

  //   describe('PUT', () => {
  //     it('responds with 200 status and application/json content type', () => {
  //       const marketList = [{ location: 'here', cards: 11 }];
  //       return request(server)
  //         .put('/markets')
  //         .send(marketList)
  //         .expect(200)
  //         .expect('Content-Type', /application\/json/);
  //     });

  //     it('responds with the updated market list', async () => {
  //       const marketList = [{ location: 'here', cards: 11 }];
  //       const response = await request(server)
  //         .put('/markets')
  //         .send(marketList);
  //       expect(response.body).toEqual(marketList);
  //     });

  //     it('responds to invalid request with 400 status and error message in body', async () => {
  //       const marketList = [{ location: 'here' }];
  //       const response = await request(server)
  //         .put('/markets')
  //         .send(marketList)
  //         .expect(400);

  //       expect(response.body).toHaveProperty('error');
  //     });
  // });
  });
});
