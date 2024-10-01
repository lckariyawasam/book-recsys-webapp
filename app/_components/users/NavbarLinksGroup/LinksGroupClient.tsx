'use client';

import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconCalendarStats, IconNotes, IconGauge, IconPresentationAnalytics, IconChevronRight,IconFileAnalytics,IconAdjustments,IconLock } from '@tabler/icons-react'; // Import icons here
import classes from './NavbarLinksGroup.module.css';

interface LinksGroupClientProps {
  iconName: string; // Change to a string or identifier to specify the icon
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

// Map icon names to actual icons
const iconMap: Record<string, React.FC<any>> = {
  IconCalendarStats, IconNotes, IconGauge, IconPresentationAnalytics, IconChevronRight,IconFileAnalytics,IconAdjustments,IconLock
};

export function LinksGroupClient({
  iconName,
  label,
  initiallyOpened,
  links,
}: LinksGroupClientProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const Icon = iconMap[iconName]; // Use the iconName to get the right icon from the map

  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30} color='yellow'>
              <Icon style={{ width: rem(18), height: rem(18)}} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
