import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FindSimilarPage from '@/app/(marketing)/find-similar/page';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // Default to empty array
  })
) as jest.Mock;

jest.mock('@/app/_components/SearchBar', () => ({
  __esModule: true,
  default: ({ handleSubmit }: { handleSubmit: (id: string, k: number) => void }) => (
    <div>
      <input placeholder="Search..." data-testid="search-bar" />
      <button onClick={() => handleSubmit('1', 3)} data-testid="search-button">Search</button>
    </div>
  ),
}));

jest.mock('@/app/_components/BookCardAddBook', () => ({
  __esModule: true,
  default: ({ title, author, description, genres, coverUrl, previewLink }: any) => (
    <div data-testid="book-card">
      <h3>{title}</h3>
      <p>{author.join(', ')}</p>
      <p>{description}</p>
      <p>{genres.join(', ')}</p>
      <img src={coverUrl} alt={`${title} cover`} />
      <a href={previewLink}>Preview</a>
    </div>
  ),
}));

// Update the global fetch mock declaration
const mockFetch = global.fetch as jest.Mock;

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

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('does not show search results initially', () => {
    render(<FindSimilarPage />);

    expect(screen.queryByTestId('search-results')).not.toBeInTheDocument();
  });

  it('calls handleBookSelect when search button is clicked', async () => {
    render(<FindSimilarPage />);

    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/similar-books/select-book', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: '1', k: 3 }),
      }));
    });
  });

  it('displays search results when books are returned', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve([
        {
          Title: 'Book Title',
          authors: '["Author 1", "Author 2"]',
          description: 'Book description',
          categories: '["Genre 1", "Genre 2"]',
          image: 'https://example.com/cover.jpg',
          previewLink: 'https://example.com/preview',
          score: 4.5,
        },
      ]),
    });

    render(<FindSimilarPage />);

    // Simulate a search
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });

    // Verify book card rendering
    const bookCard = screen.getByTestId('book-card');
    expect(bookCard).toBeInTheDocument();
    expect(bookCard).toHaveTextContent('Book Title');
    expect(bookCard).toHaveTextContent('Author 1, Author 2');
    expect(bookCard).toHaveTextContent('Genre 1, Genre 2');
    expect(bookCard).toHaveTextContent('Book description');
    expect(bookCard.querySelector('img')).toHaveAttribute('src', 'https://example.com/cover.jpg');
    expect(bookCard.querySelector('a')).toHaveAttribute('href', 'https://example.com/preview');
  });

  it('handles error when fetching similar books fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Fetch error'));

    render(<FindSimilarPage />);

    // Simulate a search
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId('search-results')).not.toBeInTheDocument();
    });

    // Expect an error to be logged (you could spy on console.error to check it)
  });
});
