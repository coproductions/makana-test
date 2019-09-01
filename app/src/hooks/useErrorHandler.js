import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export const useErrorHandler = error => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  }, [error]);
};
