import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { StudentForm } from '../../../src/student/components';
import { useForm } from '../../../src/shared/hooks';

jest.mock('../../../src/shared/hooks/useForm');

describe('Tests for <StudentForm />', () => {

  const onAddStudentMock = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should call onAddStudent function', () => {
    const formData = {
      fullName: 'Name',
      jobPosition: 'Developer',
    };
    (useForm as jest.Mock).mockReturnValue({
      formState: formData,
      onInputChange: () => {},
    });
    render(
      <StudentForm initialForm={ formData } onAddStudent={ onAddStudentMock } />
    );
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect( onAddStudentMock ).toHaveBeenCalledWith(formData.fullName, formData.jobPosition);
  });

  test('should not call onAddStudent function when no fullName', () => {
    const formData = {
      fullName: '',
      jobPosition: 'Developer',
    };
    (useForm as jest.Mock).mockReturnValue({
      formState: formData,
      onInputChange: () => {},
    });
    render(
      <StudentForm initialForm={ formData } onAddStudent={ onAddStudentMock } />
    );
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect( onAddStudentMock ).not.toHaveBeenCalled();
  });

});