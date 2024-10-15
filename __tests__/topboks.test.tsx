import React from 'react'
import { render, screen } from '@testing-library/react'
import TopBooksPage from '@/app/user/[id]/top-books/page'

// Mock the TableReviews component
jest.mock('@/app/_components/users/TableReviews/TableReviews', () => ({
  TableReviews: () => <div data-testid="mock-table-reviews">Mocked TableReviews</div>,
}))

describe('TopBooksPage', () => {
  it('renders the page title', () => {
    render(<TopBooksPage />)
    expect(screen.getByText('Top Books')).toBeInTheDocument()
  })

  it('renders the TableReviews component', () => {
    render(<TopBooksPage />)
    expect(screen.getByTestId('mock-table-reviews')).toBeInTheDocument()
  })

  // ... additional tests can be added here ...
})