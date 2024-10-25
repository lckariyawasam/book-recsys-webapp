import prisma from '@/prisma/prisma_client';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {  
    // Get the book ID from the request body
    const { userId } = await req.json();

    try {
        // Create a new WishListItem
        const user = await prisma.user.findUnique({
            where: {
                userId: parseInt(userId, 10), // Assuming session.user.id holds the user's ID
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const usersWishlist = await prisma.ratedListItem.findMany({
            where: {
                userId: parseInt(userId, 10),
            },
            include: {
                book: {
                  select: {
                    title: true,
                    author: true,
                    bookId: true,
                    genres: true,
                    imageURL: true,
                  },
                },
              },
              orderBy: {
                ratedAt: 'desc',
              },
        });

        return NextResponse.json(usersWishlist, { status: 201 });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}