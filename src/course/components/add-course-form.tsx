import { Button, Grid, TextField } from '@mui/material';
import { useForm } from '../../shared/hooks';
import { CourseFormData } from '../entities';

interface Props {
  onAddCourse: (name: string, objectives: string) => void;
}

const initialForm: CourseFormData = {
  name: '',
  objectives: '',
};

export const AddCourseForm = ({ onAddCourse }: Props) => {

  const { formState: { name = '', objectives = '' }, onInputChange } = useForm(initialForm);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (name.trim().length === 0) return;

    onAddCourse(name, objectives);
  }

  return (
    <Grid container sx={{ mt: 3 }}>
      <form aria-label="form" onSubmit={ submitHandler }>
        <TextField
          fullWidth
          label='Course name'
          margin='normal'
          name='name'
          placeholder='Course name'
          required
          value={ name }
          variant='outlined'
          onChange={ onInputChange }
        />
        <TextField
          fullWidth
          label='Course objectives'
          margin='normal'
          name='objectives'
          placeholder='Course objectives'
          value={ objectives }
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