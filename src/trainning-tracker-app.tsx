import { useEffect, useState } from 'react';
import { Grid, Tab, Tabs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { AppRouter } from './router';

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

export const TrainningTrackerApp = () => {
  const location = useLocation();
  const [value, setValue] = useState<number>(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const tab = tabs.find(t => t.path === location.pathname) || tabs[1];
    setValue(tab.value);
  }, [location.pathname, value]);

  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      height="100%"
      justifyContent="center"
      spacing={0}
      width="100%"
    >
      <Grid color='dark' item sx={{ mt: 3 }}>
        <Tabs
          value={value}
          onChange={ handleChange}
          aria-label="nav tabs"
          textColor='inherit'
          TabIndicatorProps={{ style: { background: "orange" } }}
        >
          <Tab label="Courses" component={ Link } to="/courses" />
          <Tab label="Students" component={ Link } to="/students" />
        </Tabs>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <AppRouter />
      </Grid>
    </Grid>
  );
}