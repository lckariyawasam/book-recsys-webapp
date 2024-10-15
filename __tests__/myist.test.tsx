import React from 'react';
import { render, screen } from '@testing-library/react';
import MyListPage from '@/app/user/[id]/my-list/page';

// Mock the BooksTable component
jest.mock('@/app/_components/users/BooksTable/BooksTable', () => ({
  BooksTable: () => <div data-testid="books-table">Mocked BooksTable</div>,
}));

describe('MyListPage', () => {
  it('renders the page title', () => {
    render(<MyListPage />);
    expect(screen.getByText('My Books List')).toBeInTheDocument();
  });

  it('renders the BooksTable component', () => {
    render(<MyListPage />);
    expect(screen.getByTestId('books-table')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<MyListPage />);
    const outerContainer = screen.getByText('My Books List').parentElement;
    expect(outerContainer).toHaveClass('space-y-5');

    const titleElement = screen.getByText('My Books List');
    expect(titleElement).toHaveClass('text-3xl', 'font-medium', 'text-gray-600');

    const tableContainer = screen.getByTestId('books-table').parentElement;
    expect(tableContainer).toHaveClass('border-l-2', 'border-t-2', 'p-3', 'rounded-md');
  });
});
