import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma_client'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query || query.length < 2) {
    return NextResponse.json({ error: 'Query must be at least 2 characters long' }, { status: 400 });
  }

  try {
    const books = await prisma.books.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        title: true,
      },
      take: 10, // Limit the number of results
    });
    console.log(books);
    return NextResponse.json({ books });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
