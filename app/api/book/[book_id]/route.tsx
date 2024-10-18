// /api/search?query=book
import { NextRequest, NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import prisma from '@/prisma/prisma_client'

interface Book {
  id: string;
  title: string;
  author: string | null;
  description: string;
  genres: string;
  imageURL: string | null;
  previewLink: string | null;
  publisher: string | null;
  publishedDate: string | null;
  ratingsCount: number;
  bookId: number;
  rating?: number | null;
}


export async function POST(req: NextRequest, { params }: { params: { book_id: string }}) {
  const book_id = params.book_id
  const { userId } = await req.json()

  // Convert the string to int
  const book_id_int = parseInt(book_id)
  const userId_int = parseInt(userId)

  if (!book_id_int) {
    return NextResponse.json({ error: 'Book ID must be a number' }, { status: 400 });
  }


  try {
    const book: Book|null = await prisma.amazonBooks.findUnique({
      where: {
        bookId: book_id_int
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const ratingsResponse = await prisma.ratedListItem.findUnique({
      where: {
        userId_bookId: {
          bookId: book_id_int,
          userId: userId_int
        }
      }
    })

    if (ratingsResponse) {
      book.rating = ratingsResponse.rating
    }

    return NextResponse.json({ ...book });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
