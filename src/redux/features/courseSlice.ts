import { Lesson } from '@/types/lesson';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';




interface CourseState {
  lessons: Lesson[];
}

const initialState: CourseState = {
  lessons: [],
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setLessons(state, action: PayloadAction<Lesson[]>) {
      state.lessons = action.payload;
    },
  },
});

export const { setLessons } = courseSlice.actions;
export default courseSlice.reducer;
