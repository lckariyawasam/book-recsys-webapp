import prisma from '@/prisma/prisma_client';
import { NextRequest,  NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {  
    // Get the book ID from the request body
    const { bookId, userId, rating } = await req.json();

    console.log(bookId, userId, rating)
    // Validate the input
    if (!bookId || !rating) {
        return NextResponse.json({ message: 'Book ID and rating are required' }, { status: 400 });
    }

    try {
        // Create a new WishListItem
        const ratedListItem = await prisma.ratedListItem.create({
            data: {
                userId: parseInt(userId, 10),
                bookId: parseInt(bookId, 10),
                rating: parseInt(rating)
            },
        });

        // Add to the ratings list too
        // const ratings = await prisma.ratings.create({
        //     data: {
        //         userId: parseInt(userId, 10),
        //         bookId: parseInt(bookId, 10),
        //         rating: parseInt(rating)
        //     },
        // });


        return NextResponse.json(ratedListItem, { status: 201 });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
