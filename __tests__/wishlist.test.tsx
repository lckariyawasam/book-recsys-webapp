import React from 'react'
import { render, screen } from '@testing-library/react'
import WishListPage from '@/app/user/[id]/wish-list/page'

// Mock the BooksTable component
jest.mock('@/app/_components/users/BooksTable/BooksTable', () => ({
  BooksTable: () => <div data-testid="books-table">Mocked BooksTable</div>,
}))

describe('WishListPage', () => {
  it('renders the page title', () => {
    render(<WishListPage />)
    expect(screen.getByText('My Wish List')).toBeInTheDocument()
  })

  it('renders the BooksTable component', () => {
    render(<WishListPage />)
    expect(screen.getByTestId('books-table')).toBeInTheDocument()
  })

  // ... Additional tests can be added here ...
})