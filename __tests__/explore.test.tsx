import React from 'react';
import { render, screen } from '@testing-library/react';
import ExplorePage from '@/app/user/[id]/explore/page';

// Mock the imported components
jest.mock('@/app/_components/BookCardAddBook', () => ({
  __esModule: true,
  default: () => <div data-testid="book-card">Mocked BookCardAddBook</div>,
}));

jest.mock('@/app/_components/users/InputSearchBar/InputSearchBar', () => ({
  InputSearchBar: () => <div data-testid="input-search-bar">Mocked InputSearchBar</div>,
}));

jest.mock('@/app/_components/users/selectGenres/SelectGenres', () => ({
  SelectGenres: () => <div data-testid="select-genres">Mocked SelectGenres</div>,
}));

jest.mock('@/app/_components/users/SelectSort/SelectSort', () => ({
  SelectSort: () => <div data-testid="select-sort">Mocked SelectSort</div>,
}));

describe('ExplorePage', () => {
  it('renders the page title', () => {
    render(<ExplorePage />);
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Books')).toBeInTheDocument();
  });

  it('renders the search bar and filter components', () => {
    render(<ExplorePage />);
    expect(screen.getByTestId('input-search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('select-genres')).toBeInTheDocument();
    expect(screen.getByTestId('select-sort')).toBeInTheDocument();
  });

  it('renders the correct number of book cards', () => {
    render(<ExplorePage />);
    const bookCards = screen.getAllByTestId('book-card');
    expect(bookCards).toHaveLength(15); // Assuming mockBooks has 15 items
  });
});