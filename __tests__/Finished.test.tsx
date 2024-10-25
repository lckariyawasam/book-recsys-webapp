import React from 'react'
import { render, screen } from '@testing-library/react'
import FinishedListPage from '@/app/user/[id]/finished-list/page'

// Mock the BooksTable component
jest.mock('@/app/_components/users/BooksTable/BooksTable', () => ({
  BooksTable: () => <div data-testid="books-table">Mocked BooksTable</div>,
}))

describe('FinishedListPage', () => {
  it('renders the page title', () => {
    render(<FinishedListPage />)
    expect(screen.getByText('My Finished List')).toBeInTheDocument()
  })

  it('renders the BooksTable component', () => {
    render(<FinishedListPage />)
    expect(screen.getByTestId('books-table')).toBeInTheDocument()
  })

  it('applies correct styling to the page title', () => {
    render(<FinishedListPage />)
    const titleElement = screen.getByText('My Finished List')
    expect(titleElement).toHaveClass('text-3xl', 'font-medium', 'text-gray-600')
  })

  it('applies correct styling to the BooksTable wrapper', () => {
    render(<FinishedListPage />)
    const wrapper = screen.getByTestId('books-table').parentElement
    expect(wrapper).toHaveClass('border-l-2', 'border-t-2', 'p-3', 'rounded-md')
  })
})
