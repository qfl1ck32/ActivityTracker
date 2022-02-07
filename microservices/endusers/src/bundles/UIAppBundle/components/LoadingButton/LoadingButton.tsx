import { LoadingButton as BaseLoadingButton, LoadingButtonProps } from '@mui/lab';

export const LoadingButton: React.FC<LoadingButtonProps> = ({ children, ...props }) => {
  return <BaseLoadingButton {...props}>{children}</BaseLoadingButton>;
};
