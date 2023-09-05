import React from 'react';
import { render, screen } from '@testing-library/react';
import { StudentsList } from '../../../src/student/components';
import { Student } from '../../../src/student/entities/student';

describe('Tests for <StudentsList />', () => {

  test('should call onAddStudent function', () => {
    const studentsMock: Student[] = [
      {
        id: '1',
        fullName: 'A B',
        jobPosition: 'Front',
      },
      {
        id: '2',
        fullName: 'C D',
        jobPosition: 'Back',
      },
      {
        id: '3',
        fullName: 'E F',
        jobPosition: 'Fullstack',
      }
    ];

    render(
      <StudentsList students={ studentsMock } />
    );
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(studentsMock.length);
  });

});
