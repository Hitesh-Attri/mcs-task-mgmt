import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dltID: null,
  tasksData: [],
  showTaskList: true,
  isUpdate: false,
  updateID: null,
  editTaskObj: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setDltId: (state, action) => {
      state.dltID = action.payload;
    },
    setTasksData: (state, action) => {
      state.tasksData = action.payload;
    },
    setShowTastList: (state, action) => {
      state.showTaskList = action.payload;
    },
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
    setUpdateID: (state, action) => {
      state.updateID = action.payload;
    },
    setEditTaskObj: (state, action) => {
      state.editTaskObj = action.payload;
    },
    appendTasksData: (state, action) => {
      state.tasksData = [...state.tasksData, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDltId,
  appendTasksData,
  setTasksData,
  setShowTastList,
  setIsUpdate,
  setUpdateID,
  setEditTaskObj,
} = counterSlice.actions;

export default counterSlice.reducer;
