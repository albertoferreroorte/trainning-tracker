import { ReactNode } from 'react';
import { Grid } from '@mui/material';

interface Props {
  children: ReactNode;
  layout?: string;
}

export const ColumnLayout = ({ children, layout = 'main' }: Props) => {
  return (
    <Grid
      alignItems="center"
      className={ `column-section ${ layout && 'column-section--layout' }` }
      container
      direction="column"
      height="100%"
      justifyContent="center"
      spacing={0}
      width="100%"
    >
      { children }
    </Grid>
  )
}