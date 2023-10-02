import { useEffect, useState } from 'react';
import { PersonOutline } from '@mui/icons-material';
import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Course, Lesson } from '../../course';
import { useForm } from '../../shared/hooks';
import { Student } from '../entities';

const setSelectLessonTitle = ( index: number, title: string ) => ( `${index}. ${title}`);

export const EditStudentForm: React.FC<{
  courses: Course[];
  lessons: Lesson[];
  onEditStudent: (student: Partial<Student>) => void,
  onSelectCourse: (course: number) => void,
  onSelectLessonIds: (lessonIds: number[]) => void,
  onSetLessonIds: (lessons: number[]) => void,
  selectedCourseId: number | null;
  selectedLessonIds: number[];
  selectedStudent: Student | null;
}> = ({ courses, lessons, onEditStudent, onSelectCourse, onSelectLessonIds, onSetLessonIds, selectedCourseId, selectedLessonIds, selectedStudent }) => {

  const { formState, setFormState, onInputChange } = useForm({ ...selectedStudent });

  const updatedLessons = lessons.filter(lesson => selectedLessonIds.includes(lesson.id));
  const lessonsStringFormat = updatedLessons.map(lesson => lesson.title);

  const [selectedStudentLessons, setStudentSelectedLessons] = useState<string[]>([]);

  useEffect(() => {
    setStudentSelectedLessons(lessonsStringFormat);
  }, [selectedCourseId]);

  useEffect(() => {
    if (selectedStudent) {
      setFormState({
        id: selectedStudent.id || 0,
        fullName: selectedStudent.fullName || '',
        jobPosition: selectedStudent.jobPosition || '',
      });
    }
  }, [ lessons, setFormState, selectedStudent]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (formState.fullName?.trim().length === 0) return;
    onEditStudent({ ...selectedStudent, fullName: formState.fullName, id: formState.id, jobPosition: formState.jobPosition });
  }

  const handleSelectCourse = (event: SelectChangeEvent) => {
    const id = Number(event.target.value.replace(/,/g, ''));
    const course = courses?.find(c => c.id === id);
    if (!course) return;
    onSelectCourse(course.id);
    onSetLessonIds(course.courseLessonIds);
  }

  const handleSelectLesson = (event: SelectChangeEvent<typeof selectedStudentLessons>) => {
    const {
      target: { value },
    } = event;
    setStudentSelectedLessons(
      typeof value === 'string' ? value.split(',') : value,
    );
    const updatedLessons = lessons.filter(lesson => event.target.value.includes(lesson.title.toLocaleString())).map(lesson => lesson.id);
    if (!updatedLessons) return;
    onSelectLessonIds(updatedLessons);
  }

  return (
    <Grid container sx={{ maxWidth: 500, mt: 3 }}>
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
        <Typography marginTop={ 5 } variant='h5'>Tracking time</Typography>
        <FormControl fullWidth sx={{ my: 3 }}>
          <InputLabel id="course-selection">
            Select course
          </InputLabel>
          <Select
            input={<OutlinedInput label="Select course" />}
            labelId='course-selection'
            name="select-course"
            onChange={ handleSelectCourse }
            value={ selectedCourseId?.toLocaleString() ?? '0'}
          >
            <MenuItem value="0"></MenuItem>
            {
              courses.map(course => (
                <MenuItem key={ course.id } value={ course.id.toLocaleString() }>{ course.name }</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        {
          lessons.length > 0 && (
            <FormControl fullWidth sx={{ mb: 2, maxWidth: 500 }}>
              <InputLabel id="lesson-selection">
                Select completed lessons
              </InputLabel>
              <Select
                input={<OutlinedInput label="Select completed lessons" />}
                labelId='lesson-selection'
                multiple
                name="select-lesson"
                onChange={ handleSelectLesson }
                renderValue={(selected) => selected.join(', ')}
                value={ selectedStudentLessons }
              >
                {
                  lessons.map((lesson: Lesson, index: number) => {
                    const title = setSelectLessonTitle(index + 1, lesson.title);
                    return (<MenuItem key={ lesson.id } value={ lesson.title }>
                      <Checkbox checked={  selectedStudentLessons.indexOf(lesson.title) > -1 } />
                      <ListItemText primary={ title } />
                    </MenuItem>);
                  })
                }
              </Select>
            </FormControl>
          )
        }
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