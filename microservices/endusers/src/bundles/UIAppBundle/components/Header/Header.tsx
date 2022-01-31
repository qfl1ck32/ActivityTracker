import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <Box display="flex" alignContent="center">
      <Link href="/activities">Activities</Link>
      <Link href="/note-models">Note Models</Link>
    </Box>
  );
};
