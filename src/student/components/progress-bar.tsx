import { Box, Grid, Typography } from '@mui/material';
import { PersonPinCircle } from '@mui/icons-material';

export const ProgressBar: React.FC<{ name: string, progress: number}> = ({ name, progress }) => {
  return (
    <Grid container alignItems='center' justifyContent='space-between' marginBottom={ 1 }>
      <Grid item sx={{ mr: 3, minWidth: 120, overflow: "hidden", textOverflow: "ellipsis" }}>
        <Typography noWrap>{ name }</Typography>
      </Grid>
      <Grid item flex='0 0 100' sx={{ backgroundColor: 'lightgray', height: 3, width: 100 }}>
        <Box
          role="progressbar"
          style={{ backgroundColor: progress === 100 ? '#2e7d32' : 'orange', height: 3, position: 'relative', width: `${progress}%` }}
          aria-valuenow={ progress }
          aria-valuemin={ 0 }
          aria-valuemax={ 100 }
        >
          {
            progress !== 0
              ? <PersonPinCircle color={ progress === 100 ? 'success' : 'disabled'} sx={{ bottom: 0, position: 'absolute', right: -12, width: 24, }} />
              : ''
          }
        </Box>
      </Grid>
    </Grid>
  );
}