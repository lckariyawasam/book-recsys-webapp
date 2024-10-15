/// <reference types="cypress" />
import { expect } from 'chai';

describe('Get Recommendations API', () => {
  const apiUrl = '/api/get-recommendations';

  it('should fetch recommendations successfully', () => {
    // Mock the FastAPI response for successful recommendation retrieval
    cy.intercept('POST', `${Cypress.env('FASTAPI_URL')}/item_recommendations/`, {
      statusCode: 200,
      body: [
        { id: '130357', title: 'Recommended Book One' },
        { id: '124968', title: 'Recommended Book Two' },
      ],
    }).as('fetchRecommendations');

    cy.request({
      method: 'POST',
      url: apiUrl,
      body: { ids: ['1234', '5678'] },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(2); // Check the number of recommendations returned

      // Check structure of the returned recommendations
      expect(response.body[0]).to.have.all.keys('id', 'title');
    });
  });

  it('should return 400 for invalid input', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: { ids: 'not-an-array' }, // Invalid input (not an array)
      failOnStatusCode: false, // Prevent Cypress from failing the test on 400 status
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.deep.equal({ error: 'Invalid input, expected an array of IDs' });
    });
  });

  it('should handle errors from FastAPI', () => {
    // Mock the FastAPI response to simulate an error
    cy.intercept('POST', `${Cypress.env('FASTAPI_URL')}/item_recommendations/`, {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('fastApiError');

    cy.request({
      method: 'POST',
      url: apiUrl,
      body: { ids: ['1234', '5678'] },
      failOnStatusCode: false, // Prevent Cypress from failing the test on 500 status
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.deep.equal({ error: 'Internal Server Error' });
    });
  });
});
