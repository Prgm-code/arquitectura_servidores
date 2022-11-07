const request = require('supertest');
const app = require('../app');

describe('GET /api/employees', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/api/employees')
      .expect(200);
  });
  it('should return an array of employees', () => {
    return request(app)
      .get('/api/employees')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expect.any(Array));
      });
  }
    );
    it('should return the first employee', () => {
        return request(app)
            .get('/api/employees')
            .expect(200)
            .then(response => {
                expect(response.body[0]).toEqual({
                    "name": "John",
                    "surname": "Doe",
                    "age": 25,
                    "privileges": "user",
                    "badges": ["black", "green"]
                });
            });
    }
    );
    it('should return the second employee', () => {
        return request(app)
            .get('/api/employees')
            .expect(200)
            .then(response => {
                expect(response.body[1]).toEqual({
                    "name": "Jane",
                    "surname": "Doe",
                    "age": 30,
                    "privileges": "admin",
                    "badges": ["red", "green"]
                });
            });
    }
    );

    





