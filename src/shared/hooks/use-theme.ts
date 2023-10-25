import { createTheme } from '@mui/material';

export const useTheme = () => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Roboto', 'Oswald'
      ].join(','),
    },
  });
  return {
    theme,
  }
}