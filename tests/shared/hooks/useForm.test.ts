import { renderHook } from '@testing-library/react';
import { useForm } from '../../../src/shared/hooks'

describe('useForm unit testing', () => {
  
  const initialForm = {
    fullName: 'FullName',
    jobPosition: 'B',
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
});
