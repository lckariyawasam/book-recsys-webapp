'use client'

import cx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from "next-auth/react"
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderTabs.module.css';
import { useSession } from 'next-auth/react';

export function HeaderTabs() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { data: session } = useSession();

  const links = [
    { link: '/find-similar', label: 'Find Similar' },
    { link: '/input-read-books', label: 'Surprise Me' },
    { link: '/faqs', label: 'FAQ' },
    { link: '/contact-us', label: 'Contact Us' },
  ];

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
    >
      {link.label}
    </Link>
  ));
  

  return (
    <div className={`${classes.header} bg-white` }>
      <Container className={`${classes.mainSection} bg-white w-full`} size="2xl">
        <Group justify="space-between">
          <Link href='/'><div className='text-2xl text-secondary-400 font-semibold'>Book<span className='text-primary'>Match</span></div></Link>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Group>
            <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
              {items}
            </Group>
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group gap={7}>
                    <Avatar src={session?.user?.image} alt={session?.user?.name || ''} radius="xl" size={20} />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {session?.user?.name || 'Guest'}
                    </Text>
                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                >
                  <button onClick={() => signOut()}>Logout</button>
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                >
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Container>
    </div>
  );
}
 
// export function SignOut() {
//   return <button onClick={() => signOut()}>Sign Out</button>
// }
