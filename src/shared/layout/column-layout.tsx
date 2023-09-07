import { Grid } from '@mui/material';

export const ColumnLayout: React.FC<{
  children: React.ReactNode,
  fullWidthChildren: React.ReactNode,
}> = ({ children, fullWidthChildren }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(45deg, #fff0e0, #fff)})`,
        padding: 4,
        width: '100%',
      }}
    >
      <Grid
        item
        sx={{
          my: 3,
          width: 750,
        }}
      >
        { children }
      </Grid>
      <Grid
        item
        sx={{
          alignItems: 'start',
          backgroundColor: 'white',
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          p: 3,
          width: '100%',
        }}
      >
        { fullWidthChildren }
      </Grid>
    </Grid>
  )
}