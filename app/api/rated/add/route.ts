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

        // Check if the book is already in the rated list
        const ratedListItemExists = await prisma.ratedListItem.findFirst({
            where: {
                userId: parseInt(userId, 10),
                bookId: parseInt(bookId, 10)
            },
        });

        // If the book is already in the rated list, update the rating
        if (ratedListItemExists) {
            const updatedRatedListItem = await prisma.ratedListItem.update({
                where: {
                    id: ratedListItemExists.id,
                },
                data: {
                    rating: parseInt(rating)
                },
            });

            return NextResponse.json(updatedRatedListItem, { status: 200 });
        }

        // Create a new rated list item
        const ratedListItem = await prisma.ratedListItem.create({
            data: {
                userId: parseInt(userId, 10),
                bookId: parseInt(bookId, 10),
                rating: parseInt(rating)
            },
        });

        // Add to the ratings list too
        const ratings = await prisma.ratings.create({
            data: {
                userId: parseInt(userId, 10),
                bookId: parseInt(bookId, 10),
                rating: parseInt(rating)
            },
        });


        return NextResponse.json(ratedListItem, { status: 201 });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
