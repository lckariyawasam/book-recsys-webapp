import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendationsPage from '@/app/user/[id]/recommendations/page';

// Mock the components used in the page
jest.mock('@/app/_components/Button', () => {
  return function MockCustomButton({ children }: { children: React.ReactNode }) {
    return <button>{children}</button>;
  };
});

jest.mock('@/app/_components/users/BookCardGrid/BookCardGrid', () => {
  return function MockBookCardGrid() {
    return <div data-testid="book-card-grid">Book Card Grid</div>;
  };
});

jest.mock('@/app/_components/users/MatchOfTheDay/MatchOfTheDay', () => {
  return function MockMatchOfTheDay() {
    return <div data-testid="match-of-the-day">Match of the Day</div>;
  };
});

describe('RecommendationsPage', () => {
  it('renders the page with all components', () => {
    render(<RecommendationsPage />);

    // Check if the buttons are rendered
    expect(screen.getByText('Find Similar')).toBeInTheDocument();
    expect(screen.getByText('Add Books')).toBeInTheDocument();

    // Check if MatchOfTheDay is rendered
    expect(screen.getByTestId('match-of-the-day')).toBeInTheDocument();

    // Check if BookCardGrid is rendered
    expect(screen.getByTestId('book-card-grid')).toBeInTheDocument();
  });

  it('has correct links for buttons', () => {
    render(<RecommendationsPage />);

    const findSimilarLink = screen.getByText('Find Similar').closest('a');
    const addBooksLink = screen.getByText('Add Books').closest('a');

    expect(findSimilarLink).toHaveAttribute('href', '/find-similar');
    expect(addBooksLink).toHaveAttribute('href', '/input-read-books');
  });
});