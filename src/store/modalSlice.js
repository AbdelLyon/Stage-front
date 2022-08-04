import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
   name: 'modal',
   initialState: { isOpen: false },
   reducers: {
      setOpen: (state, { payload }) => { state.isOpen = payload },
   }
});

export const { setOpen } = modalSlice.actions;
export default modalSlice.reducer;
