import { Box } from '@mantine/core';
import { LinksGroupClient } from './LinksGroupClient'; // Import the Client Component
import classes from './NavbarLinksGroup.module.css';

export function NavbarLinksGroup(items: any) {
  return (
    <Box>
      <LinksGroupClient {...items} />
    </Box>
  );
}
