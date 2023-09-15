import { useEffect } from 'react';
import { PersonOutline } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Course } from '../../course';
import { useAppSelector, useForm } from '../../shared/hooks';

export const EditCourseForm: React.FC<{
  onEditCourse: (course: Partial<Course>) => void,
}> = ({ onEditCourse }) => {

  const { selectedCourse } = useAppSelector(state => state.course);

  const { formState, setFormState, onInputChange } = useForm({ ...selectedCourse });

  useEffect(() => {
    if (selectedCourse) {
      setFormState({
        lessons: selectedCourse.lessons,
        name: selectedCourse.name || '',
        objectives: selectedCourse.objectives || '',
      });
    }
  }, [setFormState, selectedCourse]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (formState.name?.trim().length === 0) return;
    
    onEditCourse({ name: formState.name, objectives: formState.objectives });
  }

  return (
    <Grid container sx={{ maxWidth: 500, mt: 3 }}>
      <form aria-label="form" onSubmit={ submitHandler }>
        <TextField
          fullWidth
          label='Name'
          margin='normal'
          name='name'
          required
          value={ formState.name }
          variant='outlined'
          onChange={ onInputChange }
        />
        <TextField
          fullWidth
          label='Course objectives'
          margin='normal'
          name='objectives'
          value={ formState.objectives }
          variant='outlined'
          onChange={ onInputChange }
        />
        <Typography marginTop={ 5 } variant='h5'>Add lessons</Typography>
        <Button
          aria-label="submit"
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