/// <reference types="cypress" />
import { expect } from 'chai';

describe('Search API', () => {
  const apiUrl = '/api/search';

  it('should return an error for short queries', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}?query=a`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Query must be at least 2 characters long');
    });
  });

  it('should return books for valid queries', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}?query=harry`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('books');
      expect(response.body.books).to.be.an('array');
      expect(response.body.books.length).to.be.at.most(10);
      
      if (response.body.books.length > 0) {
        const firstBook = response.body.books[0];
        expect(firstBook).to.have.all.keys('title', 'bookId', 'author', 'genres');
        expect(firstBook.title.toLowerCase()).to.include('harry');
      }
    });
  });

  it('should filter books by ratings when filterByRatings is true', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}?query=potter&filterByRatings=true`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('books');
      expect(response.body.books).to.be.an('array');
      // Add more specific assertions if needed
    });
  });

  it('should handle server errors gracefully', () => {
    // This test assumes you have a way to trigger a server error
    // You might need to modify your API or use a mock to test this
    cy.request({
      method: 'GET',
      url: `${apiUrl}?query=error_trigger`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.have.property('error', 'Failed to fetch books');
    });
  });
});
