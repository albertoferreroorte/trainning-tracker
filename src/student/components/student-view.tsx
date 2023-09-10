import { Card, CardContent, CardHeader, Button, CardActions } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import { Student } from '../entities';

export const StudentView: React.FC<Partial<Student>> = ({ fullName, jobPosition }) => {
  const isEdited = false;
  return (
    <Card sx={{ padding: 7, width: '100%' }}>
      <CardHeader
        action={
          <Button
            aria-label="delete"
            color="warning"
            variant="outlined"
            startIcon={<PersonOutline fontSize='large' sx={{ transform: 'rotate(180deg)' }} />}
          >
            Delete student
          </Button>
        }
        title={ fullName }
        subheader={ jobPosition }
      />
        <CardContent>
        
      </CardContent>
      <CardActions>
        <Button
          aria-label="delete"
          color="primary"
          disabled={ !isEdited }
          variant="outlined"
          startIcon={<PersonOutline fontSize='large' />}
          >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};