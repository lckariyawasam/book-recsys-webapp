import { Paper, Text, Title, Button } from '@mantine/core';
import classes from './BookCard.module.css';
import cx from 'clsx';
import Link from 'next/link';

interface BookCardProps {
  book_id?: string;
  backgroundImage: string;
  title: string;
  genre: string;
  previewLink: string;
}

export function BookCard({backgroundImage, title, genre, previewLink, book_id} : BookCardProps) {
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
      <Link href={book_id ? `/book/${book_id}` : previewLink}>
      <Button variant="white" color="dark" className="mx-auto shadow-xl hover:shadow-2xl">
        See More
      </Button>
      </Link>
    </Paper>
  );
}