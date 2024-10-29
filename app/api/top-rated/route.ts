import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma_client';

export async function GET(request: NextRequest) {
  try {
    const topBooks = await prisma.amazonBooks.findMany({
      orderBy: {
        ratingsCount: 'desc',
      },
      take: 10,
    });

    return NextResponse.json(topBooks, { status: 200 });
  } catch (error) {
    console.error('Error fetching rated books:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}