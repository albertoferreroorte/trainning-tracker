import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import { useTabs } from '../hooks/use-tabs';
import { TABS } from '../../assets/data/tabs';

const tabs = TABS;

export const TabsComponent = () => {
  const { tab, setTabs } = useTabs({ tabs });

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };
  return (
    <Tabs
      value={ tab }
      onChange={ handleChange }
      aria-label="nav tabs"
      textColor='inherit'
      TabIndicatorProps={{ style: { background: "orange" } }}
      sx={{ mt: 3 }}
    >
      <Tab label="Courses" component={ Link } to="/courses" />
      <Tab label="Students" component={ Link } to="/students" />
      <Tab label="Tracking" component={ Link } to="/tracking" />
    </Tabs>
  );
}