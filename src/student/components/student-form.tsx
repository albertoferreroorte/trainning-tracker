import { Button, TextField } from '@mui/material';
import { useForm } from '../../shared/hooks';

interface StudentFormProps<T> {
  initialForm: T;
  onAddStudent: (data: T) => void;
}

export const StudentForm = <T extends Record<string, string>>({
  initialForm,
  onAddStudent,
}: StudentFormProps<T>) => {

  const { formData, onInputChange } = useForm(initialForm);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (Object.values(formData).some((value) => value.trim().length === 0)) {
      return;
    }

    onAddStudent(formData as T);
  }

  return (
    <form aria-label="form" onSubmit={ submitHandler }>
      {
        Object.entries(initialForm).map(([fieldName, fieldLabel]) => (
          <TextField
            key={fieldName}
            fullWidth
            label={fieldLabel}
            margin="normal"
            name={fieldName}
            placeholder={`Student ${fieldLabel}`}
            variant="outlined"
            value={formData[fieldName]}
            onChange={onInputChange}
          />
        ))
      }
      <Button
        type='submit'
        variant='outlined'
        sx={{ my: 3 }}
      >
        Create
      </Button>
    </form>
  );
}