'use client'

import { ScrollArea } from '@mantine/core';
import Link from 'next/link';
import { NavbarLinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from '../UserButton/UserButton';
import classes from './NavbarNested.module.css';
import { useSession } from 'next-auth/react';

export function NavbarNested() {
  const { data: session } = useSession();
  const user = session?.user;
  if (!user) {
    return null;
  }
  const userId = user.id;

  const mockdata = [
    { label: 'Recommendations', iconName: 'IconGauge', link: `/user/${userId}/recommendations` },
    {
      label: 'My List',
      iconName: 'IconNotes',
      initiallyOpened: true,
      links: [
        { label: 'All', link: `/user/${userId}/my-list` },
        { label: 'Wish List', link: `/user/${userId}/wish-list` },
        { label: 'Finished List', link: `/user/${userId}/finished-list` },
      ],
    },
    { label: 'Rated Books', iconName: 'IconCalendarStats', link: `/user/${userId}/rated-books` },
    { label: 'Top Books', iconName: 'IconPresentationAnalytics', link: `/user/${userId}/top-books` },
    { label: 'Explore Books', iconName: 'IconFileAnalytics', link: `/user/${userId}/explore` },
    { label: 'Settings', iconName: 'IconAdjustments', link: `/user/${userId}/settings` },
  ];

  const links = mockdata.map((item) => <NavbarLinksGroup {...item} key={item.label} />);

  return (
    <nav className={`${classes.navbar} h-full justify-between`}>
      <div className={`${classes.header} flex items-center`}>
          <Link href='/'><div className='text-2xl text-secondary-400 font-semibold'>Book<span className="text-primary-300">Match</span></div></Link>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
