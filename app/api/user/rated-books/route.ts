import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma_client';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    console.log(userId);
    const ratedBooks = await prisma.ratedListItem.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        book: {
          select: {
            title: true,
            publishedDate: true,
            author: true,
            ratingsCount: true,
            bookId: true,
            genres: true
          },
        },
      },
      orderBy: {
        ratedAt: 'desc',
      },
    });

    return NextResponse.json(ratedBooks);
  } catch (error) {
    console.error('Error fetching rated books:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}