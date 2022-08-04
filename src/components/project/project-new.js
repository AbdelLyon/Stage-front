import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findBusinessSector, findLocation } from '../../store/asyncThunk';
import ProjectForm from './project-create';

const ProjectNew = () => {

   const dispatch = useDispatch();
   const { businessSectors, locations } = useSelector((state) => state.projectState);


   useEffect(() => {
      if (!businessSectors.length && !locations.length) {
         return () => {
            dispatch(findBusinessSector());
            dispatch(findLocation());
         }
      }
   }, [])

   return (
      <div className="form-container">
         <ProjectForm />
      </div>
   );
}

export default ProjectNew;
