'use client'

import { Avatar, Badge, Table, Group, Text, ActionIcon, Anchor, rem } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';

const mockBooks = [
  { title: 'The Lord of the Rings', author: 'J. R. R. Tolkien', genre: 'Fantasy', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book1' },
  { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book2' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book3' },
  { title: '1984', author: 'George Orwell', genre: 'Science Fiction', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book4' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book5' },
  { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J. K. Rowling', genre: 'Fantasy', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book6' },
  { title: 'The Catcher in the Rye', author: 'J. D. Salinger', genre: 'Classic', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book7' },
  { title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', genre: 'Science Fiction', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book8' },
  { title: 'The Hunger Games', author: 'Suzanne Collins', genre: 'Young Adult', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book9' },
  { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Novel', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book10' },
  { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', genre: 'Children\'s', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book11' },
  { title: 'The Three Musketeers', author: 'Alexandre Dumas', genre: 'Adventure', backgroundImage:'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book12' },
  { title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Classic', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book13' },
  { title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'Gothic', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book14' },
  { title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', genre: 'Adventure', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book15' }
];

const genreColors: Record<string, string> = {
  // Add more genres here as needed
  'adventure': 'pink',
  'biography': 'cyan',
  'business': 'pink',
  'children': 'yellow',
  'classic': 'green',
  'cooking': 'orange',
  'crime': 'purple',
  'drama': 'red',
  'fantasy': 'red',
  'fiction': 'darkcyan',
  'history': 'lightgreen',
  'horror': 'darkorange',
  'novel': 'lightsalmon',
  'mystery': 'lightseagreen',
  'nonfiction': 'lightcoral',
  'poetry': 'lightyellow',
  'romance': 'lightpink',
  'science': 'lightskyblue',
  'science fiction': 'blue',
  'selfHelp': 'lightgreen',
  'sports': 'lightcoral',
  'travel': 'lightsalmon',
  'trueCrime': 'lightseagreen',
  'young adult': 'orange',
};

export function BooksTable({ books }: { books: any[] }) {
  console.log("From the booktable, books are", books)
  const rows = books?.length > 0 && books.map((item) => (
    <Table.Tr key={item.title}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item.backgroundImage} radius={30} />
          <Text fz="sm" fw={500}>
            {item.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={genreColors[item.genre.toLowerCase()]} variant="light">
          {item.genre}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {item.author}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Link href={item.previewLink}><Text fz="sm">Preview</Text></Link>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          {/* <ActionIcon variant="subtle" color="gray">
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon> */}
          <ActionIcon variant="subtle" color="red">
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Genre</Table.Th>
            <Table.Th>Author</Table.Th>
            <Table.Th>Preview</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}