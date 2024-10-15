import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FindSimilarPage from '@/app/(marketing)/find-similar/page';

// Mock the fetch function if it's used in the component
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('FindSimilarPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page title and description', () => {
    render(<FindSimilarPage />);
    
    expect(screen.getByTestId('page-title')).toHaveTextContent("Tell Us What You've Read");
    expect(screen.getByTestId('page-description')).toHaveTextContent("Add books you have read and loved. The more you add, the better we can recommend.");
  });

  it('renders the SearchBar component', () => {
    render(<FindSimilarPage />);
    
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('does not show search results initially', () => {
    render(<FindSimilarPage />);
    
    expect(screen.queryByTestId('search-results')).not.toBeInTheDocument();
  });
});
