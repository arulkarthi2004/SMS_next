import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Student } from "@/api/studentApi";

interface StudentState {
  items: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  items: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.items = action.payload;
    },
    setStudentLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setStudentError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearStudents: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setStudents, setStudentLoading, setStudentError, clearStudents } =
  studentSlice.actions;
export default studentSlice.reducer;

