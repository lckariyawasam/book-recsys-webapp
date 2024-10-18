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
    <Paper shadow="md" p="xl" radius="md" className={cx(classes.card, 'h-[280px] w-[200px]')}
    style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div>
        <Text className={classes.genre} size="xs">
          {genre}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Link href={book_id ? `/user/${session?.user?.id}/book/${book_id}` : previewLink}>
      <Button variant="white" color="dark" className="mx-auto shadow-xl hover:shadow-2xl">
        See More
      </Button>
      </Link>
    </Paper>
  );
}