import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  tabs: Tab[];
}

export interface Tab {
  label: string;
  path: string;
  value: number;
}

export const useTabs = ({ tabs }: Props) => {
  const location = useLocation();

  const [tab, setTabs] = useState<number>(0);

  useEffect(() => {
    const tab = tabs.find(t => t.path === location.pathname) || tabs[0];
    setTabs(tab.value);
  }, [location.pathname, tab, tabs]);

  return {
    tab,
    setTabs,
  };
}