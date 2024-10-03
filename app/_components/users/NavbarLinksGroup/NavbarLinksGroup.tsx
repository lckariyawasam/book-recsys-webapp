import { Box } from '@mantine/core';
import { LinksGroupClient } from './LinksGroupClient'; // Import the Client Component

export function NavbarLinksGroup(items: any) {
  return (
    <Box>
      <LinksGroupClient {...items} />
    </Box>
  );
}
