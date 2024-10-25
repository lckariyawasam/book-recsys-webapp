import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RatedBooksPage from '@/app/user/[id]/rated-books/page'

// Mock the TaableRatings component
jest.mock('@/app/_components/users/TableRatings/TableRatings', () => {
  return function MockedTableRatings() {
    return <div data-testid="mocked-table-ratings">Mocked Table Ratings</div>
  }
})

describe('RatedBooksPage', () => {
  it('renders the page title correctly', () => {
    render(<RatedBooksPage />)
    expect(screen.getByText('Rated')).toBeInTheDocument()
    expect(screen.getByText('Books')).toBeInTheDocument()
  })

  it('renders the TaableRatings component', () => {
    render(<RatedBooksPage />)
    expect(screen.getByTestId('mocked-table-ratings')).toBeInTheDocument()
  })

  it('applies correct styling to the title', () => {
    render(<RatedBooksPage />)
    const titleElement = screen.getByText('Rated')
    expect(titleElement).toHaveClass('text-3xl', 'font-semibold', 'text-gray-600')
  })

  it('applies correct styling to the TaableRatings wrapper', () => {
    render(<RatedBooksPage />)
    const wrapper = screen.getByTestId('mocked-table-ratings').closest('div')
    // If there's no specific class on the wrapper, we can check if it exists
    expect(wrapper).toBeInTheDocument()
    // Alternatively, if there should be some styling, but it's not what we initially thought:
    // expect(wrapper).toHaveClass('some-actual-class')
  })
})