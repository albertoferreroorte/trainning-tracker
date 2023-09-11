import { Button, Grid, TextField } from '@mui/material';
import { useForm } from '../../shared/hooks';
import { StudentFormData } from '../entities';

const initialForm: StudentFormData = {
  fullName: '',
  jobPosition: '',
};

export const AddStudentForm: React.FC<{
  onAddStudent: (name: string, position: string) => void,
}> = ({ onAddStudent }) => {

  const { formState: { fullName = '', jobPosition = '' }, onInputChange } = useForm(initialForm);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (fullName.trim().length === 0) return;

    onAddStudent(fullName, jobPosition);
  }

  return (
    <Grid container sx={{ mt: 3 }}>
      <form aria-label="form" onSubmit={ submitHandler }>
        <TextField
          fullWidth
          label='Student name'
          margin='normal'
          name='fullName'
          placeholder='Student full name'
          required
          value={ fullName }
          variant='outlined'
          onChange={ onInputChange }
        />
        <TextField
          fullWidth
          label='Job position'
          margin='normal'
          name='jobPosition'
          placeholder='Student Job position'
          value={ jobPosition }
          variant='outlined'
          onChange={ onInputChange }
        />
        <Button
          type='submit'
          variant='outlined'
          sx={{ my: 3 }}
        >
          Create
        </Button>
      </form>
    </Grid>
  );
}