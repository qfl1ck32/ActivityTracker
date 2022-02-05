import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export const Loading: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  )
};
