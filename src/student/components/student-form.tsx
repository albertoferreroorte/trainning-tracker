import { useForm } from '../../shared/hooks';

const initialForm = {
  fullName: '',
  jobPosition: '',
};

export const StudentForm: React.FC<{onAddStudent: (name: string, position: string) => void}> = ({ onAddStudent }) => {

  const { formState, onInputChange } = useForm(initialForm);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (formState.fullName.trim().length === 0) return;

    onAddStudent(formState.fullName, formState.jobPosition);
  }

  return (
    <form aria-label="form" onSubmit={ submitHandler }>
      <div>
        <label>Student name</label>
        <input
          placeholder='Your Student name'
          type='text'
          name='fullName'
          value={ formState.fullName }
          onChange={ onInputChange }
        />
      </div>
      <div>
        <label>Job position</label>
        <input
          placeholder='Your Job position'
          type='text'
          name='jobPosition'
          value={ formState.jobPosition }
          onChange={ onInputChange }
        />
      </div>
      <button type='submit'>Add student</button>
    </form>
  );
}