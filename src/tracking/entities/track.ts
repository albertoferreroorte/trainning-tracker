type TrackAction = 'Created' | 'Edited' | 'Removed' | 'Progress' | 'Started';

type TrackTarget = 'Course' | 'Lesson' | 'Student';

interface TargetLabel {
  category: TrackTarget;
  name: string;
}

export class Track {
  action: string;
  date: string;
  id: number;
  target: string[];

  constructor(
    action: TrackAction,
    date: number,
    target: TargetLabel[],
  ) {
    this.action = action;
    this.date = new Date(date).toLocaleDateString();
    this.id = new Date().getTime();
    this.target = target.map(({ category, name }) => `${ category }: ${ name }`);
  }

}

export interface TracksByDate {
  [date: string]: Track[];
}