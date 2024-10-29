import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma_client';

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json();
    
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
} 