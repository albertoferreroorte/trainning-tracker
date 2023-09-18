import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { Lesson } from '../entities';

export const LessonsList: React.FC<{ onDeleteLesson: (id: number) => void, lessons: Lesson[] }>= ({ onDeleteLesson, lessons }) => {
  const handleDeleteLesson = (_e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    onDeleteLesson(id);
  };

  return (
    <List>
      {
        lessons.length > 0
        ? lessons.map((lesson, index) => (
            <ListItem
              key={ lesson.id }
              secondaryAction={
                <IconButton
                  aria-label="delete"
                  edge="end"
                  onClick={ (e) => handleDeleteLesson(e, lesson.id) }
                >
                  <DeleteOutline />
                </IconButton>
              }
            >
              <ListItemText
                primary={ `${index + 1} - ${lesson.title}` }
                secondary={ `${ lesson.duration } hours` }
              />
            </ListItem>
          ))
        : []
      }
    </List>
  );
}