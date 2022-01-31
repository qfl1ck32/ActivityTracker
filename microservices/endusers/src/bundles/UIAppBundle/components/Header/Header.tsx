import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <Box display="flex" alignContent="space-between">
      <Link href="/activity-logs">Activity Logs</Link>
      <Link href="/note-models">Note Models</Link>
    </Box>
  );
};
