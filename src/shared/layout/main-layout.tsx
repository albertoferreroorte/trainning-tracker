import { ReactElement } from 'react';
import { Grid } from '@mui/material';

interface Props {
  children: ReactElement[];
}

export const MainLayoutComponent = ({ children }: Props) => {
  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      height="100%"
      justifyContent="center"
      spacing={ 0 }
      width="100%"
    >
      { children }
    </Grid>
  );
}