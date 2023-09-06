import { ChangeEvent, useState } from 'react';

type FormState<T> = {
  [K in keyof T]: string;
};

export const useForm = <T extends Record<string, string>>(
  initialForm: T
) => {
  const [formData, setFormData] = useState<FormState<T>>(
    Object.keys(initialForm).reduce((acc, key) => {
      acc[key as keyof T] = '';
      return acc;
    }, {} as FormState<T>)
  );
  
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return {
    formData,
    onInputChange,
  };
}
