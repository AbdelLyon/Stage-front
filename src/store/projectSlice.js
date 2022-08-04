import { createSlice } from "@reduxjs/toolkit";
import { createProject, findAllWithPagination, findCountProjects, findFilterWithPagination, findPrejectById, findBusinessSector, findLocation } from "./asyncThunk";

const addActions = (type, builder, pending, fulfilled, rejected, value) => {

   builder.addCase(pending, state => {
      state.isLoading = true;
   }).addCase(fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;

      if (type === '/projects') state.projects = actions.payload
      else if (type === '/project') state.project = actions.payload
      else if (type === '/businessSectors') state.businessSectors = actions.payload
      else if (type === '/locations') state.locations = actions.payload

      else state.count = actions.payload
   }).addCase(rejected, (state, actions) => {
      state.isLoading = false;
      state.isError = true;
      state.message = actions.payload;

      if (type === '/projects') state.projects = value
      else if (type === '/project') state.project = value
      else if (type === '/businessSectors') state.businessSectors = value
      else if (type === '/locations') state.locations = value

      else state.count = value
   })
}

const initialState = {
   projects: [],
   businessSectors: [],
   locations: [],
   count: 0,
   project: null,
   isLoading: false,
   isSuccess: false,
   isError: false,
   message: '',
   page: 1,
   valuesForm: null
}

export const projetsSlice = createSlice({
   name: 'projects',
   initialState,
   reducers: {

      reset: (state) => {
         state.projects = [];
         state.businessSectors = [];
         state.locations = [];
         state.count = 0;
         state.project = null;
         state.isLoading = false;
         state.isSuccess = false;
         state.isError = false;
         state.message = '';
         state.page = 1;
         state.valuesForm = null;
      },

      setCount: (state, { payload }) => { state.count = payload },
      setPage: (state, { payload }) => { state.page = payload },
      setValuesForm: (state, { payload }) => { state.valuesForm = payload },


   },

   extraReducers: (builder) => {
      //createProject
      addActions('/project', builder, createProject.pending, createProject.fulfilled, createProject.rejected, 0)

      //findOneproject
      addActions('/project', builder, findPrejectById.pending, findPrejectById.fulfilled, findPrejectById.rejected, null)

      //findAllWithPagination
      addActions('/projects', builder, findAllWithPagination.pending, findAllWithPagination.fulfilled, findAllWithPagination.rejected, [])

      //findFilterWithPagination
      addActions('/projects', builder, findFilterWithPagination.pending, findFilterWithPagination.fulfilled, findFilterWithPagination.rejected, [])

      //findCountProjects
      addActions('/count', builder, findCountProjects.pending, findCountProjects.fulfilled, findCountProjects.rejected, 0);

      //findBusinessSector
      addActions('/businessSectors', builder, findBusinessSector.pending, findBusinessSector.fulfilled, findBusinessSector.rejected, [])

      //findLocation
      addActions('/locations', builder, findLocation.pending, findLocation.fulfilled, findLocation.rejected, [])

   }
});

export const { reset, setPage, setCount, setValuesForm } = projetsSlice.actions;
export default projetsSlice.reducer;

