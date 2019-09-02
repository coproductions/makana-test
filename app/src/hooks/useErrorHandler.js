import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export const useErrorHandler = error => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (error) {
      console.log(error);
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  }, [error]);
};
