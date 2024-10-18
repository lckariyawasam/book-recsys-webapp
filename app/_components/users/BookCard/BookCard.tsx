import { Paper, Text, Title, Button } from '@mantine/core';
import classes from './BookCard.module.css';
import cx from 'clsx';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface BookCardProps {
  book_id?: string;
  backgroundImage: string;
  title: string;
  genre: string;
  previewLink: string;
}

export function BookCard({backgroundImage, title, genre, previewLink, book_id} : BookCardProps) {
  const { data: session } = useSession();
  
  return (
    <Paper shadow="md" p="xl" radius="md" className={cx(classes.card, 'h-[280px] w-[200px] relative')}
    style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-grow">
          <Text className={classes.genre} size="xs">
            {genre}
          </Text>
          <Title order={3} className={cx(classes.title, 'text-sm line-clamp-4 mb-2')}>
            {title}
          </Title>
        </div>
        <Link href={book_id ? `/user/${session?.user?.id}/book/${book_id}` : previewLink}>
          <Button variant="white" color="dark" className="mx-auto shadow-xl hover:shadow-2xl">
            See More
          </Button>
        </Link>
      </div>
    </Paper>
  );
}
