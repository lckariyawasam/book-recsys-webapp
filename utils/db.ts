import prisma from '@/prisma/prisma_client'


export async function getUserByEmail(email: string) {
    console.log(email);
    return prisma.user.findUnique({ where: { email } });
  }

  export async function createUser({ email, password, name }: { email: string; password: string; name: string }) {
    
    console.log(email, password, name);
    
    // try {
    //   const user = await prisma.user.create({
    //     data: {
    //       email,
    //       password,
    //       name,
    //     },
    //   });
    //   console.log(user);
    //   return user;
    // } catch (error) {
    //   console.error('Error creating user:', error);
    //   throw error;
    // }
    try {
      const [userId, user] = await prisma.$transaction(async (prisma: { counter: { upsert: (arg0: { where: { name: string; }; update: { count: { increment: number; }; }; create: { name: string; count: number; }; }) => any; }; user: { create: (arg0: { data: { userId: any; email: string; password: string; name: string; }; }) => any; }; }) => {
        const counter = await prisma.counter.upsert({
          where: { name: 'user_id' },
          update: { count: { increment: 1 } },
          create: { name: 'user_id', count: 1 },
        });

        console.log("counter", counter);
    
        const user = await prisma.user.create({
          data: {
            userId: counter.count,
            email,
            password,
            name,
          },
        });
    
        return [counter.count, user];
      });

      console.log(`Created user with ID ${userId}`);
      return user;

    } catch(e) {
      console.error('Error creating user:', e);
      throw e;
    }
  }