import { Grid } from '@mui/material';

export const ColumnLayout: React.FC<{
  children: React.ReactNode,
  layout?: string,
}> = ({ children, layout = 'main' }) => {
  return (
    <Grid
      alignItems="center"
      className={ `column-section column-section--${ layout }` }
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