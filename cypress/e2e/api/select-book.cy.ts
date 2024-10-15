/// <reference types="cypress" />
import { expect } from 'chai';

describe('Select Book API', () => {
    it('should fetch similar books successfully', () => {
      cy.request({
        method: 'POST',
        url: '/api/similar-books/select-book',
        body: {
          id: '102851', // Replace with a valid book ID
          k: 15
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length(15);
        // Add more specific assertions based on the expected response structure
      });
    });
  
    it('should handle errors gracefully', () => {
      cy.request({
        method: 'POST',
        url: '/api/similar-books/select-book',
        body: {
          id: 'invalid',
          k: 15
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.have.property('error', 'Something went wrong');
      });
    });
  });