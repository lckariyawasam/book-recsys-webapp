import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma_client';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request) {
  try {
    const { userId, oldPassword, newPassword } = await request.json();
    
    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify old password
    const isValid = await bcrypt.compare(oldPassword, user.password as string);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid old password' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
} 