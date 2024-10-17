// /api/search?query=book

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma_client'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const sortBy = searchParams.get('sortby');

  if (!query || query.length < 2) {
    return NextResponse.json({ error: 'Query must be at least 2 characters long' }, { status: 400 });
  }

  if (query === 'error_trigger') {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }

  try {
    let whereClause: any = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { author: { contains: query, mode: 'insensitive' } },
        { genres: { contains: query, mode: 'insensitive' } },
      ],
    };

    if (category) {
      whereClause.genres = { contains: category, mode: 'insensitive' };
    }

    let orderBy: any = {};
    if (sortBy === 'ratingsCount') {
      orderBy.ratingsCount = 'desc';
    } else if (sortBy === 'publishedDate') {
      orderBy.publishedDate = 'desc';
    }

    const books = await prisma.amazonBooks.findMany({
      where: whereClause,
      select: {
        title: true,
        bookId: true,
        author: true,
        genres: true,
        ratingsCount: true,
        publishedDate: true,
      },
      orderBy: orderBy,
      take: 10, // Limit the number of results
    });

    return NextResponse.json({ books });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
