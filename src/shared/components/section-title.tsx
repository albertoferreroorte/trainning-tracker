import { Typography } from '@mui/material';

interface Props {
  length: number;
  name: string;
}

export const SectionTitleComponent = ({ length, name }: Props) => {
  return (
    <Typography
      component='h3'
      variant="h2"
      sx={{ my: 3 }}
    >
      {
        !length && (
          <Typography fontSize={ 30 } sx={{ mr: 3, opacity: 0.75 }}>No</Typography>
        )
      }
      { name }
    </Typography>
  );
}