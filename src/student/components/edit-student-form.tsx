import { PersonOutline } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import { useAppSelector, useForm } from '../../shared/hooks';
import { Student } from '../entities';

export const EditStudentForm: React.FC<{
  onEditStudent: (student: Partial<Student>) => void,
}> = ({ onEditStudent }) => {

  const { selected } = useAppSelector(state => state.student);

  const initialForm = { fullName: selected?.fullName, jobPosition: selected?.jobPosition };

  const { formState, onInputChange } = useForm(initialForm);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (formState.fullName?.trim().length === 0) return;
    onEditStudent({ fullName: formState.fullName, jobPosition: formState.jobPosition });
  }

  return (
    <Grid container sx={{ mt: 3 }}>
      <form aria-label="form" onSubmit={ submitHandler }>
        <TextField
          fullWidth
          label='Student name'
          margin='normal'
          name='fullName'
          required
          value={ selected?.fullName }
          variant='outlined'
          onChange={ onInputChange }
        />
        <TextField
          fullWidth
          label='Job position'
          margin='normal'
          name='jobPosition'
          value={ selected?.jobPosition }
          variant='outlined'
          onChange={ onInputChange }
        />
        <Button
          aria-label="delete"
          color="primary"
          startIcon={<PersonOutline fontSize='large' />}
          type='submit'
          variant='outlined'
          sx={{ my: 3 }}
        >
          Save
        </Button>
      </form>
    </Grid>
  );
}