import prisma from '@/prisma/prisma_client';
import { NextRequest,  NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {  
    // Get the book ID from the request body
    const { bookId, userId } = await req.json();

    console.log(bookId, userId)
    // Validate the input
    if (!bookId) {
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

        // If the book is book present, delete it
        if (ratedListItemExists) {
            const deletedRatedListItem = await prisma.ratedListItem.delete({
                where: {
                    id: ratedListItemExists.id,
                }
            });
        }

        // Check if the book is already in the ratings
        const ratingsExists = await prisma.ratings.findFirst({
            where: {
                userId: parseInt(userId, 10),
                bookId: parseInt(bookId, 10)
            },
        });

        // If the book is book present, delete it
        if (ratingsExists) {
            const deletedRating = await prisma.ratings.delete({
                where: {
                    id: ratingsExists.id,
                }
            });
        }

        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
       
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
