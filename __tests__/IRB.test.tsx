// __tests__/InputReadBooksPage.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputReadBooksPage from '@/app/(marketing)/input-read-books/page';
import fetchMock from 'jest-fetch-mock';

// Mock the components used in InputReadBooksPage, let's use actual paths
jest.mock('@/app/_components/SearchBarAddBooks', () => ({
  __esModule: true,
  default: ({ handleBookAdd }: { handleBookAdd: Function }) => (
    <button onClick={() => handleBookAdd('1', 'Mock Book', 'Mock Author')}>
      Add Mock Book
    </button>
  ),
}));

jest.mock('@/app/_components/BookList', () => ({
  __esModule: true,
  default: ({ books, onRemove }: { books: any[]; onRemove: Function }) => (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.title} by {book.author}{' '}
          <button onClick={() => onRemove(book.id)}>Remove</button>
        </li>
      ))}
    </ul>
  ),
}));

jest.mock('@/app/_components/Button', () => ({
  __esModule: true,
  default: ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => (
    <button onClick={onClick}>Get Recommendations</button>
  ),
}));

jest.mock('@/app/_components/BookCardAddBooks', () => ({
  __esModule: true,
  default: ({
    title,
    author,
    genres,
    coverUrl,
  }: {
    title: string;
    author: string[];
    genres: string[];
    coverUrl: string;
  }) => (
    <div>
      <h3>{title}</h3>
      <p>by {author.join(', ')}</p>
      <p>Genres: {genres.join(', ')}</p>
      <img src={coverUrl} alt={title} />
    </div>
  ),
}));

// Enable fetch mock
beforeAll(() => {
  fetchMock.enableMocks();
});

describe('InputReadBooksPage', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the page and adds a book', () => {
    render(<InputReadBooksPage />);

    // Check if the heading is displayed
    expect(screen.getByText("Tell Us What You’ve Read")).toBeInTheDocument();

    // Simulate adding a book
    fireEvent.click(screen.getByText('Add Mock Book'));

    // Check if the book appears in the list
    expect(screen.getByText('Mock Book by Mock Author')).toBeInTheDocument();
  });

  it('removes a book from the list', () => {
    render(<InputReadBooksPage />);

    // Add a book
    fireEvent.click(screen.getByText('Add Mock Book'));

    // Check if the book appears in the list
    expect(screen.getByText('Mock Book by Mock Author')).toBeInTheDocument();

    // Remove the book
    fireEvent.click(screen.getByText('Remove'));

    // Check if the book is removed from the list
    expect(screen.queryByText('Mock Book by Mock Author')).not.toBeInTheDocument();
  });

  it('fetches and displays recommendations', async () => {
    // Mock fetch response for recommendations
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          Title: 'Recommended Book',
          authors: '["Recommended Author"]',
          categories: '["Fiction"]',
          image: 'https://mockurl.com/cover.jpg',
          description: 'A great book',
          previewLink: 'https://mockurl.com/preview',
          score: 4.5,
        },
      ])
    );

    render(<InputReadBooksPage />);

    // Add a book
    fireEvent.click(screen.getByText('Add Mock Book'));

    // Simulate clicking "Get Recommendations"
    fireEvent.click(screen.getByText('Get Recommendations'));

    // Wait for the recommendations to load
    await waitFor(() => {
      expect(screen.getByText('Recommended Book')).toBeInTheDocument();
      expect(screen.getByText('by Recommended Author')).toBeInTheDocument();
      expect(screen.getByText('Genres: Fiction')).toBeInTheDocument();
    });
  });

  it('handles fetch errors', async () => {
    // Mock a failed fetch response
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    render(<InputReadBooksPage />);

    // Add a book
    fireEvent.click(screen.getByText('Add Mock Book'));

    // Simulate clicking "Get Recommendations"
    fireEvent.click(screen.getByText('Get Recommendations'));

    // Check if the console error was logged
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(fetchMock.mock.calls[0][0]).toBe('/api/similar-items');
    });
  });
});
