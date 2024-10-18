"use client"
import { BooksTable } from "@/app/_components/users/BooksTable/BooksTable"
import prisma from "@/prisma/prisma_client"
import { use } from "chai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


// const wishlist = await prisma.wishlist.findMany()

const getBooks = async (userId: string) => {
  const response = await fetch(`/api/wishlist/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "userId": userId }),
  })
  
  let books = await response.json()
  console.log(books)
  books = books.map((book:any) => {
    return {
      book_id: book.book.bookId,
      title: book.book.title,
      description: book.book.description,
    }
  })
  console.log(books)
}

const MyListPage = () => {
  // Get the users id
  const { id } = useParams()

  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRetrieved = await getBooks(id)
      setBooks(booksRetrieved)
    }
    fetchBooks()
  }, [id])


  return (
    <div className="space-y-5">
        <div className="text-3xl font-medium text-gray-600">My Books List</div>
        <div className="border-l-2 border-t-2 p-3 rounded-md"><BooksTable books={books} /></div>
    </div>
  )
}

export default MyListPage