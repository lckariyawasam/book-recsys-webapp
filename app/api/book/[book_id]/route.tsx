// /api/search?query=book
import { NextRequest, NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import prisma from '@/prisma/prisma_client'

export async function GET(req: NextRequest, { params }: { params: { book_id: string }}) {
  const book_id = params.book_id

  // Convert the string to int
  const book_id_int = parseInt(book_id)

  if (!book_id_int) {
    return NextResponse.json({ error: 'Book ID must be a number' }, { status: 400 });
  }


  try {
    const books = await prisma.amazonBooks.findUnique({
      where: {
        bookId: book_id_int
      },
    });

    return NextResponse.json({ ...books });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
