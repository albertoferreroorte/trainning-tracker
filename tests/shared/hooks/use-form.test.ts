import { renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';
import { act } from 'react-dom/test-utils';
import { useForm } from '../../../src/shared/hooks'

describe('useForm unit testing', () => {
  
  const initialForm = {
    fullName: 'Full name',
    jobPosition: 'Job position',
  };
  
  test('should return default values', () => {
    const { result } = renderHook( () => useForm(initialForm));
    expect(result.current).toEqual({
      formState: initialForm,
      onInputChange: expect.any(Function),
    });
    expect(result.current.formState).toEqual({
      fullName: initialForm.fullName,
      jobPosition: initialForm.jobPosition,
    });
  });

  test('should change FullName form input', () => {
    const fullName = 'Pink Floyd';
    const event = {
      target: {
        name: 'fullName',
        value: fullName,
      },
    };
    const { result } = renderHook( () => useForm(initialForm));
    act(() => {
      result.current.onInputChange(event as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formState.fullName).toBe(fullName);
  });

});
