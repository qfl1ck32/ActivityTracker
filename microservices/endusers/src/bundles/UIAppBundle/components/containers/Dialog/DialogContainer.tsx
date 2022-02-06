import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export type DialogContainerProps = {
  open: boolean;
  onClose: () => void;

  title?: string;
};

export const DialogContainer: React.FC<DialogContainerProps> = ({ title, children, open, onClose }) => {
  return (
    <Dialog
      {...{
        open,
        onClose,
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
          {title && (
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton sx={{ borderRadius: 0 }} onClick={onClose}>
              <Typography fontSize={12} variant="h5" component="h1">
                Close
              </Typography>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
