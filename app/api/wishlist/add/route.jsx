import prisma from '@/prisma/prisma_client';
import { NextResponse } from 'next/server';

export async function POST(req, res) {  
    // Get the book ID from the request body
    const { bookId, userId } = await req.json();

    // Validate the input
    if (!bookId) {
        return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
    }

    try {
        // Create a new WishListItem
        const wishListItem = await prisma.wishListItem.create({
            data: {
                user: {
                    connect: { userId: parseInt(userId, 10) }, // Assuming session.user.id holds the user's ID
                },
                book: {
                    connect: { bookId: parseInt(bookId, 10) }, // Assuming bookId is the unique identifier for the book
                },
            },
        });

        return NextResponse.json(wishListItem, { status: 201 });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}