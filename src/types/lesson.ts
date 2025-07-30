export type Lesson = {
  _id: string;
  title: string;
  course_id: string;
  thumbnail: string;
  duration: number;
  type: 'article' | 'video' | 'quiz'; // extend union if more types exist
  point: number;
  order: number;
  createdAt: string; // or `Date` if parsed
  updatedAt: string; // or `Date` if parsed
};