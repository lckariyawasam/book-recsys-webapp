'use client'

import { Avatar, Badge, Table, Group, Text, ActionIcon, Anchor, rem } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';

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

export function BooksTable({ books, userId, deleteCallback }: { books: any[], userId: string, deleteCallback: Function | null }) {
  console.log("From the booktable, books are", books)
  const rows = books?.length > 0 && books.map((item) => (
    <Table.Tr key={item.title}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item.imageURL} radius={30} />
          <Text fz="sm" fw={500}>
            {item.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={genreColors[item.genres.toLowerCase()]} variant="light">
          {item.genres}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.author}</Text>
      </Table.Td>
      <Table.Td>
        <Link href={`/user/${userId}/book/${item.bookId}`}>
        {/* <Text fz="sm">Preview</Text> */}
        <Anchor component="button" size="sm">
          Preview
        </Anchor>
        </Link>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          {/* <ActionIcon variant="subtle" color="gray">
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon> */}
          <ActionIcon variant="subtle" color="red" onClick={() => deleteCallback && deleteCallback(item.bookId, userId)}>
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