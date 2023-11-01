type TrackAction = 'Added' | 'Removed' | 'Progress';

type TrackTarget = 'Course' | 'Lesson' | 'Student';

export class Track {
  action: string;
  date: string;
  id: number;
  target: string;
  targetLabel: string;

  constructor(
    action: TrackAction,
    date: number,
    target: TrackTarget,
    targetLabel: string,
  ) {
    this.action = action;
    this.date = new Date(date).toLocaleDateString();
    this.id = new Date().getTime();
    this.target = target;
    this.targetLabel = `${ target }: ${ targetLabel }`;
  }

}

export interface TracksByDate {
  [date: string]: Track[];
}