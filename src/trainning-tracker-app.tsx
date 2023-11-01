import { ThemeProvider } from '@mui/material';
import { AppRouter } from './router';
import { useTheme } from './shared/hooks';
import { HeaderComponent } from './shared/components';
import { MainLayoutComponent } from './shared/layout';

export const TrainningTrackerApp = () => {

  const { theme } = useTheme();

  return (
    <ThemeProvider theme={ theme }>
      <MainLayoutComponent>
        <HeaderComponent />
        <AppRouter />
      </MainLayoutComponent>
    </ThemeProvider>
  );
}