'use client'

import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './Footer.module.css';
import { useSession } from 'next-auth/react';

// const { data: session } = useSession();
//   const user = session?.user;
//   // if (!user) {
//   //   // return null;
//   // }
//   const userId = user?.id;

const data = [
  {
    title: 'About Us',
    links: [
      { label: 'Home', link: '/' },
      { label: 'Create an Account', link: '/auth/signup' }, // Changed link to an example
      { label: 'LogIn', link: '/auth/signin' }, // Changed link to an example
    ],
  },
  {
    title: 'Try Out',
    links: [
      { label: 'Find Similar', link: '/find-similar' },
      // { label: 'Explore Books', link: `/user/${userId}/explore` }, // Changed link to an example
      // { label: 'Recommendations', link: `/user/${userId}/recommendations` },  
      { label: 'Explore Books', link: `/user//explore` }, // Changed link to an example
      { label: 'Recommendations', link: `/user/recommendations` },  
      { label: 'Rate Books', link: '/rate-books' }, // Changed link to an example
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', link: '/help-center' }, // Changed link to an example
      { label: 'FAQs', link: '/faqs' }, // Changed link to an example
      { label: 'Contact Us', link: '/contact-us' }, // Changed link to an example
    ],
  },
];

export function FooterLinks() {
  const { data: session } = useSession();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link key={index} href={link.link} className={classes.link}>
        <Text component="span">{link.label}</Text>
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size='lg' className={classes.inner}>
        <div className={classes.logo}>
          <div className='text-xl text-gray-600'>Book<span className='text-primary-300'>Match</span></div>
          <Text size="xs" c="dimmed" className={classes.description}>
            Discover books tailored just for you. We connect you with stories that resonate with your unique taste
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm" style={{ textAlign: 'center', width: '100%' }}>
          © 2024 bookmatch.dev. All rights reserved.
        </Text>

        {/* Uncomment if you want to add social media links */}
        {/* <Group gap={3} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandFacebook style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group> */}
      </Container>
    </footer>
  );
}
