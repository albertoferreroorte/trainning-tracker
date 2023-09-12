import { PersonOutline } from '@mui/icons-material';
import { Button, FormControl, Grid, InputLabel, NativeSelect, TextField } from '@mui/material';
import { useEffect } from 'react';
import { coursesData } from '../../assets/courses';
import { Course, Lesson } from '../../course';
import { useAppSelector, useForm } from '../../shared/hooks';
import { Student } from '../entities';

export const EditStudentForm: React.FC<{
  onEditStudent: (student: Partial<Student>) => void,
  onSelectCourse: (course: Course) => void,
  onSelectLesson: (lesson: Lesson) => void,
}> = ({ onEditStudent, onSelectCourse, onSelectLesson }) => {

  const { selected } = useAppSelector(state => state.student);

  const { selectedCourse, selectedLesson } = useAppSelector(state => state.course);

  const { formState, setFormState, onInputChange } = useForm({ ...selected });

  useEffect(() => {
    if (selected) {
      setFormState({
        courses: selected.courses,
        fullName: selected.fullName || '',
        jobPosition: selected.jobPosition || '',
      });
    }
  }, [setFormState, selected, selectedCourse]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (formState.fullName?.trim().length === 0) return;
    
    onEditStudent({ fullName: formState.fullName, jobPosition: formState.jobPosition });
  }

  const handleSelectCourse = (event: React.FormEvent) => {
    event.preventDefault();
    const course = coursesData?.find(c => c?.id.toLocaleString() === (event.target as HTMLInputElement).value);
    if (!course) return;
    onSelectCourse(course);
  }

  const handleSelectLesson = (event: React.FormEvent) => {
    event.preventDefault();
    const lesson = selectedCourse?.lessons.find(c => c.id.toLocaleString() === (event.target as HTMLInputElement).value);
    if (!lesson) return;
    onSelectLesson(lesson);
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
          value={ formState.fullName }
          variant='outlined'
          onChange={ onInputChange }
        />
        <TextField
          fullWidth
          label='Job position'
          margin='normal'
          name='jobPosition'
          value={ formState.jobPosition }
          variant='outlined'
          onChange={ onInputChange }
        />
        <FormControl fullWidth sx={{ my: 3 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Course
          </InputLabel>
          <NativeSelect
            name='selectedCourse'
            value={ selectedCourse?.id ?? 0}
            inputProps={{
              name: 'course',
              id: 'uncontrolled-native',
            }}
            onChange={ handleSelectCourse }
          >
            <option value="0"></option>
            {
              coursesData.map(course => (
                <option key={course.id} value={course.id}>{ course.name }</option>
              ))
            }
          </NativeSelect>
        </FormControl>
        {
          selectedCourse && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Lesson
              </InputLabel>
              <NativeSelect
                name='selectedLesson'
                defaultValue={ selectedLesson?.id }
                inputProps={{
                  name: 'lesson',
                  id: 'uncontrolled-native',
                }}
                onChange={ handleSelectLesson }
              >
                {
                  selectedCourse.lessons.map(lesson => (
                    <option key={lesson.id} value={lesson.id}>{ lesson.title }</option>
                  ))
                }
              </NativeSelect>
            </FormControl>
          )
        }
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