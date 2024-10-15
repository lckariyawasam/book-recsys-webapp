import prisma from '@/prisma/prisma_client'


export async function getUserByEmail(email: string) {
    console.log(email);
    return prisma.user.findUnique({ where: { email } });
  }

  export async function createUser({ email, password, name }: { email: string; password: string; name: string }) {
    
    console.log(email, password, name);
    
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });
      console.log(user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }