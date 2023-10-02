import { Lesson } from "../../course";

export const calculateUpdatedCourseInfo = (studentsSelectedLessons: Lesson[], selectedStudentCourseLessons: Lesson[]) => {
  // Create a map to keep track of completion counts for each lesson
  const completionCounts = new Map();

  // Initialize completion counts for course lessons
  selectedStudentCourseLessons.forEach((lesson) => {
    completionCounts.set(lesson.id, {
      ...lesson,
      completionCount: 0, // Initialize completion count to 0 for course lessons
    });
  });

  // Increment completion counts for lessons in studentsSelectedLessons
  studentsSelectedLessons.forEach((lesson) => {
    if (completionCounts.has(lesson.id)) {
      const existingLesson = completionCounts.get(lesson.id);
      completionCounts.set(lesson.id, {
        ...existingLesson,
        completionCount: existingLesson.completionCount + 1,
      });
    }
  });

  // Convert the map of completion counts back to an array of lessons
  const updatedStudents = Array.from(completionCounts.values());

  return updatedStudents;
}
