const request = require('supertest');

const app = require('../app');
const employees = require('../models/employees.json');
const newEmployee = require('../models/newEmployee.json');
describe('GET /api/employees', () => {

  it('should return an array of all employees', async () => {
    await request(app)
      .get('/api/employees')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expect.any(Array));
      });
  }

  );
  it('shuold retur the first 2 epmployees 0, 1', () => {
    request(app)
      .get('/api/employees?page=1')
      .set('Accept', 'application/json')
      .send()
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([employees[0], employees[1]]);

      });

  });

  it('should return the seccond 2 employees 2, 3', async () => {

    await request(app)
      .get('/api/employees?page=2')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([employees[2], employees[3]]);
      });
  }
  );

  it('should return the third 2 employees 4, 5', async () => {
    await request(app)
      .get('/api/employees?page=3')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([employees[4], employees[5]]);
      });
  });

  it('should return the oldest employee', async () => {
    await request(app)
      .get('/api/employees/oldest')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(employees[5]);

      });
  });

  it('should return the youngest employee', async () => {
    await request(app)
      .get('/api/employees/youngest')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(employees[0]);
      });
  });

  it('should return employees whit privilegies == user', async () => {
    await request(app)


      .get('/api/employees/?user=true')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([employees[0], employees[2], employees[4], employees[5]]);

      });

  });

  it('should return employees whit badges == black', async () => {
    await request(app)
      .get('/api/employees/?badges=true')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([employees[0], employees[3], employees[5]]);
      });
  });



});
describe("Post /employees", () => {
  it('should create a new employee', async () => {
    await request(app)

      .post('/api/employees')
      .set('Content-Type', 'application/json')
      .send(newEmployee)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).toEqual(newEmployee);
      });
  });
  it('should return a bad request when creating a new employee without the same schema ', async () => {
    await request(app)
      .post('/api/employees')
      .set('Accept', 'application/json')

      .send({
        "foo": "bar"
      })
      .expect("content-type", /json/)
      .expect(400)
      .then(response => {

        expect(response.body).toEqual(expect.objectContaining({
          "400": "Bad Request"
        }));

      });

  });



});

describe("Get /employees/:id", () => {
  it('should return an employee by id', async () => {
    await request(app)
      .get('/api/employees/Sue')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).toEqual(employees[0]);
      });
  });
  it('should return a not found error when the employee does not exist', async () => {
    await request(app)
      .get('/api/employees/100')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).toEqual(expect.objectContaining({
          "404": "not_found"
        }));
      });
  });
});










