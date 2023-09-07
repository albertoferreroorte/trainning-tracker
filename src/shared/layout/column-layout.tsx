import { Grid } from '@mui/material';

export const ColumnLayout: React.FC<{
  children: React.ReactNode,
}> = ({ children }) => {
  return (
    <Grid
      alignItems="center"
      className="column-section"
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