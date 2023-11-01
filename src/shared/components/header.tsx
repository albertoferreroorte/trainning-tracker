import { Grid, Typography } from '@mui/material';
import { TabsComponent } from './tabs';

export const HeaderComponent = () => {
  return (
    <Grid
      alignItems='center'
      color='dark'
      container
      justifyContent='space-between'
      position='sticky'
      top={ 0 }
      sx={{ backgroundColor: 'white' }}
      zIndex={ 2 }
    >
      <Typography fontSize='large' fontFamily='Oswald' sx={{ mx: 3 }}>Trainning ...</Typography>
      <TabsComponent />
      <Typography fontSize='large' fontFamily='Oswald' sx={{ mx: 3 }}>... Tracker</Typography>
    </Grid>
  );
}