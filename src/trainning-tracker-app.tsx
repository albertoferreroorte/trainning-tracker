import { useEffect, useState } from 'react';
import { Button, createTheme, Grid, Tab, Tabs, ThemeProvider, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { AppRouter } from './router';
import { TimelineOutlined } from '@mui/icons-material';

const tabs = [
  {
    label: 'Courses',
    value: 0,
    path: '/courses',
  },
  {
    label: 'Students',
    value: 1,
    path: '/students',
  }
];

export const TrainningTrackerApp: React.FC = () => {
  const location = useLocation();
  const [value, setValue] = useState<number>(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Roboto', 'Oswald'
      ].join(','),
    },});

  useEffect(() => {
    const tab = tabs.find(t => t.path === location.pathname) || tabs[0];
    setValue(tab.value);
  }, [location.pathname, value]);

  return (
    <ThemeProvider theme={ theme }>
      <Grid
        alignItems="center"
        container
        direction="column"
        height="100%"
        justifyContent="center"
        spacing={0}
        width="100%"
      >
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
          <Tabs
            value={value}
            onChange={ handleChange}
            aria-label="nav tabs"
            textColor='inherit'
            TabIndicatorProps={{ style: { background: "orange" } }}
            sx={{ mt: 3 }}
          >
            <Tab label="Courses" component={ Link } to="/courses" />
            <Tab label="Students" component={ Link } to="/students" />
          </Tabs>
          <Button
            aria-label="overview"
            color="primary"
            variant="outlined"
            startIcon={<TimelineOutlined fontSize='large' />}
            sx={{ mx: 3 }}
          >
            Timeline
          </Button>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <AppRouter />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}