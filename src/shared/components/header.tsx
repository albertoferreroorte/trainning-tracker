import { TimelineOutlined } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
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
      <Typography fontSize='large' fontFamily='Oswald' sx={{ mx: 3 }}>Trainning tracker</Typography>
      <TabsComponent />
      <Button
        aria-label="overview"
        color="primary"
        variant="outlined"
        startIcon={<TimelineOutlined fontSize='large' />}
        sx={{ mx: 3 }}
      >
        Tracking grid
      </Button>
    </Grid>
  );
}