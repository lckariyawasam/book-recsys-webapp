import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import classes from './UserButton.module.css';

export function UserButton() {
  const { data: session } = useSession();

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src={session?.user?.image || ''}
          alt={session?.user?.name || ''}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {session?.user?.name || 'Guest User'}
          </Text>

          <Text c="dimmed" size="xs">
            {session?.user?.email || 'guest@example.com'}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
