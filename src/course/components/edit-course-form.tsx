import { useEffect, useState } from 'react';
import { AddCircleOutlined, PersonOutline } from '@mui/icons-material';
import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Course, Lesson } from '../../course';
import { useForm } from '../../shared/hooks';
import { LessonsList } from './lessons-list';

export const EditCourseForm: React.FC<{
  courses: Course[],
  lessons: Lesson[],
  onAddLesson: (lesson: Lesson) => void,
  onDeleteLesson: (id: number) => void,
  onEditCourse: (course: Partial<Course>) => void,
  selectedCourse: Course | null,
}> = ({ lessons, onAddLesson, onDeleteLesson, onEditCourse, selectedCourse }) => {

  const { formState, setFormState, onInputChange } = useForm({ ...selectedCourse });

  const [newLessonName, setNewLessonName] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('');

  useEffect(() => {
    if (selectedCourse) {
      setFormState({
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

  const handleAddLesson = () => {
    if (!selectedCourse || !newLessonName || !newLessonDuration) return;
    
    const newLesson: Lesson = new Lesson(newLessonDuration, newLessonName);

    onAddLesson(newLesson);

    setNewLessonName('');
    setNewLessonDuration('');
  }

  const handleDeleteLesson = (id: number) => {
    onDeleteLesson(id);
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
        <Box display='flex' gap={ 2 }>
          <Box>
            <TextField
              fullWidth
              label='Lesson Name'
              margin='normal'
              name='newLessonName'
              value={newLessonName}
              variant='outlined'
              onChange={(e) => setNewLessonName(e.target.value)}
            />
            <TextField
              fullWidth
              label='Lesson Duration'
              margin='normal'
              name='newLessonDuration'
              value={newLessonDuration}
              variant='outlined'
              onChange={(e) => setNewLessonDuration(e.target.value)}
            />
          </Box>
          <Button
            aria-label="add-lesson"
            color="primary"
            startIcon={<AddCircleOutlined fontSize='medium' />}
            variant='outlined'
            onClick={ handleAddLesson }
            sx={{ alignSelf: 'flex-end', mb: 1, mt: 2}}
          >
            Add
          </Button>
        </Box>
        <Divider sx={{ mt: 3 }} />
        <LessonsList
          lessons={ lessons }
          onDeleteLesson={ handleDeleteLesson }
        />
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