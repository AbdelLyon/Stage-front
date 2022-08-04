import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./asyncThunk";

const currentUser = JSON.parse(localStorage.getItem('user'));

const addActions = (builder, pending, fulfilled, rejected) => {
   builder.addCase(pending, state => {
      state.isLoading = true;
   }).addCase(fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = actions.payload
   }).addCase(rejected, (state, actions) => {
      state.isLoading = false;
      state.isError = true;
      state.message = actions.payload;
      state.user = null
   })
}

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: currentUser ? currentUser : null,
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: ''
   },
   reducers: {
      reset: (state) => {
         state.isLoading = false;
         state.isSuccess = false;
         state.isError = false;
         state.message = '';
      }
   },
   extraReducers: (builder) => {

      //register
      addActions(builder, register.pending, register.fulfilled, register.rejected);

      //login
      addActions(builder, login.pending, login.fulfilled, login.rejected);

      //logout
      builder.addCase(logout.fulfilled, (state) => { state.user = null });

   }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
