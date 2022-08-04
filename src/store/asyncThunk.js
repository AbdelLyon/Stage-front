import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import projectService from "../services/projectService";

// auth
export const register = createAsyncThunk('/register', async (user, thunkAPI) => {
   try {
      return await authService.register(user)
   } catch ({ response }) {
      const message = response && response.data.message;
      return thunkAPI.rejectWithValue(message)
   }
})

export const login = createAsyncThunk('/login', async (user, thunkAPI) => {
   try {
      return await authService.login(user)
   } catch ({ response }) {
      const message = response && response.data.message;
      return thunkAPI.rejectWithValue(message)
   }
})

export const logout = createAsyncThunk('/logout', async () => await authService.logout())

//project
export const createProject = createAsyncThunk('/project/new', async ({ user, values }, thunkAPI) => {
   try {
      return await projectService.create({ values, user });
   } catch ({ response }) {
      const message = response && response.data.message;
      return thunkAPI.rejectWithValue(message)
   }
})

export const findPrejectById = createAsyncThunk('/project/:id', async ({ user, id }, thunkAPI) => {
   try {
      return await projectService.findOne({ user, id });
   } catch ({ response }) {
      const message = response && response.data.message;
      return thunkAPI.rejectWithValue(message)
   }
})


export const findAllWithPagination = createAsyncThunk('/projects', async ({ user, page }, thunkAPI) => {
   try {
      return await projectService.findAllWithPagination({ user, page });
   } catch ({ response }) {
      const message = response && response.data.message;
      return thunkAPI.rejectWithValue(message)
   }
})

export const findCountProjects = createAsyncThunk('/projects/count', async ({ user, values }, thunkAPI) => {
   try {
      return await projectService.findCount({ user, values });
   } catch ({ response }) {
      const message = response && response.data.message;
      return thunkAPI.rejectWithValue(message)
   }
})

export const findFilterWithPagination = createAsyncThunk('/projects/filter', async ({ user, values, page }, thunkAPI) => {
   try {
      return await projectService.findFilterWithPagination({ user, ...values, page });
   } catch ({ response }) {
      const message = response && response.data.message;
      return thunkAPI.rejectWithValue(message)
   }
})

export const findBusinessSector = createAsyncThunk('/projects/businessSelector', async (thunkAPI) => {
   try {
      return await projectService.findBusinessSector();
   } catch ({ response }) {
      const message = response && response.data.message;
      return thunkAPI.rejectWithValue(message)
   }
})

export const findLocation = createAsyncThunk('/projects/location', async (thunkAPI) => {
   try {
      return await projectService.findLocation();
   } catch ({ response }) {
      const message = response && response.data.message;
      return thunkAPI.rejectWithValue(message)
   }
})




