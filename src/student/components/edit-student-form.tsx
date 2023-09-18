import { useEffect, useState } from 'react';
import { PersonOutline } from '@mui/icons-material';
import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Course, Lesson } from '../../course';
import { useAppSelector, useForm } from '../../shared/hooks';
import { Student } from '../entities';

const setSelectLessonTitle = ( index: number, title: string ) => ( `${index}. ${title}`);

export const EditStudentForm: React.FC<{
  onEditStudent: (student: Partial<Student>) => void,
  onSelectCourse: (course: Course) => void,
  onSelectLessons: (lesson: Lesson[]) => void,
}> = ({ onEditStudent, onSelectCourse, onSelectLessons }) => {

  const { selected, selectedStudentCourse, students } = useAppSelector(state => state.student);

  const { courses } = useAppSelector(state => state.course);

  const { formState, setFormState, onInputChange } = useForm({ ...selected });

  const studentCompleteLessons = students.find(s => s.id === selected?.id)?.courses?.find(c => c.id === selectedStudentCourse?.id)?.completedLessons;
  const studentCompleteLessonsByString = studentCompleteLessons?.map(l => l.title);
  const [selectedLessons, setSelectedLessons] = useState<string[]>(studentCompleteLessonsByString || []);

  useEffect(() => {
    if (selected) {
      setFormState({
        courses: selected.courses,
        fullName: selected.fullName || '',
        jobPosition: selected.jobPosition || '',
      });
    }
  }, [setFormState, selected]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (formState.fullName?.trim().length === 0) return;
    
    onEditStudent({ fullName: formState.fullName, jobPosition: formState.jobPosition });
  }

  const handleSelectCourse = (event: SelectChangeEvent) => {
    const courseId = Number(event.target.value.replace(/,/g, ''));
    const course = courses?.find(c => c.id === courseId);
    if (!course) return;
    onSelectCourse(course);
    const student = students.find(s => s.id === selected?.id)?.courses?.find(c => c.id === course.id);
    const studentCompletedLessons = student?.completedLessons.map(l => l.title) || []
    setSelectedLessons(studentCompletedLessons);
    const lessons = student?.completedLessons.filter(l => selectedLessons.includes(l.title)) || [];
    onSelectLessons(lessons);
  }

  const handleSelectLesson = (event: SelectChangeEvent<typeof selectedLessons>) => {
    const {
      target: { value },
    } = event;
    setSelectedLessons(
      typeof value === 'string' ? value.split(',') : value,
    );
    const lessons = courses.flatMap(c => c.courseLessons.filter(l => event.target.value.includes(l.title)));
    if (!lessons) return;
    onSelectLessons(lessons);
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
            value={ selectedStudentCourse?.id.toLocaleString() ?? '0'}
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
          selectedStudentCourse?.courseLessons && (
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
                value={ selectedLessons }
              >
                {
                  selectedStudentCourse?.courseLessons.map((lesson: Lesson, index: number) => {
                    const title = setSelectLessonTitle(index + 1, lesson.title);
                    return (<MenuItem key={ lesson.id } value={ lesson.title }>
                      <Checkbox checked={ selectedLessons.indexOf(lesson.title) > -1 } />
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