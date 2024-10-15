/// <reference types="cypress" />
import { expect } from 'chai';
import { faker } from '@faker-js/faker';

describe('Signup API', () => {
  const apiUrl = '/api/auth/signup';

  it('should create a new user successfully', () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 }),
      name: faker.person.fullName(),
    };
  
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: newUser,
    }).then((response) => {
        expect(response.status).to.equal(201); // Check for the HTTP status
        expect(response.body.message).to.equal('User created successfully'); // Check the response body contains status: 201
  
      // Check if the password field is present, and if it exists, fail the test.
      if (response.body.hasOwnProperty('password')) {
        throw new Error('Password should not be returned in the response');
      }
    });
  });
  

  it('should return 409 if user already exists', () => {
    const existingUser = {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 }),
      name: faker.person.fullName(),
    };

    // First, create a user
    cy.request('POST', apiUrl, existingUser);

    // Then, try to create the same user again
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: existingUser,
      failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
    }).then((response) => {
      expect(response.status).to.equal(409);
      expect(response.body.message).to.equal('User already exists');
    });
  });

  it('should return 400 for invalid input', () => {
    const invalidUser = {
      email: 'invalid-email',
      password: 'short',
      name: '',
    };

    cy.request({
      method: 'POST',
      url: apiUrl,
      body: invalidUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message');
    });
  });
});
