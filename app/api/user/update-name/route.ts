import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma_client';

export async function PUT(request: Request) {
  try {
    const { userId, name } = await request.json();
    const user = await prisma.user.findFirst({
      where: { userId: userId },
    });
    console.log(user, name);
    const updatedUser = await prisma.user.update({
      where: { userId: userId },
      data: { 
        name: name.trim(),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update name' },
      { status: 500 }
    );
  }
}