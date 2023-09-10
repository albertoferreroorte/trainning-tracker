import { ChangeEvent, useState } from 'react';

export const useForm = <T>( initialForm: T = {} as T ) => {
  const [formState, setFormState] = useState<T>(initialForm);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [ name ]: value,
    })
  }

  return {
    ...formState,
    formState,
    onInputChange,
    setFormState,
  } 
}
