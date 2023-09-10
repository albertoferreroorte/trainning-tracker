import { Button, FormControl, Grid, InputLabel, NativeSelect, TextField } from '@mui/material';
import { Course } from '../../course';
import { useAppSelector, useForm } from '../../shared/hooks';
import { StudentFormData } from '../entities';

const initialForm: StudentFormData = {
  fullName: '',
  jobPosition: '',
};

export const AddStudentForm: React.FC<{
  onAddStudent: (course: Course, name: string, position: string) => void,
  onAddCourse: (course: Course) => void,
}> = ({ onAddStudent, onAddCourse }) => {

  const { courses, selectedCourse } = useAppSelector(state => state.course);

  const { formState: { fullName = '', jobPosition = '' }, onInputChange } = useForm(initialForm);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (fullName.trim().length === 0) return;

    onAddStudent(selectedCourse || courses[0], fullName, jobPosition);
  }

  const handleSelectCourse = (event: React.FormEvent) => {
    event.preventDefault();

    const course = courses.find(c => c.id.toLocaleString() === (event.target as HTMLInputElement).value);
    
    if (!course) return;
    onAddCourse(course);
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
        <FormControl fullWidth sx={{ my: 3 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Course
          </InputLabel>
          <NativeSelect
            value={ selectedCourse?.id }
            inputProps={{
              name: 'course',
              id: 'uncontrolled-native',
            }}
            onChange={ handleSelectCourse }
          >
            {
              courses.map(course => (
                <option key={ course.id } value={ course.id }>{ course.name }</option>
              ))
            }
          </NativeSelect>
        </FormControl>
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