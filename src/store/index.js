import { configureStore } from "@reduxjs/toolkit";
import projectState from './projectSlice';
import modalState from './modalSlice';
import authState from './authSlice';
import * as thunks from "./asyncThunk";

export const {
   register,
   login,
   logout,
   createProject,
   findAllWithPagination,
   findCountProjects,
   findFilterWithPagination,
   findPrejectById
} = thunks;

export default configureStore({
   reducer: {
      projectState,
      modalState,
      authState
   }
})

