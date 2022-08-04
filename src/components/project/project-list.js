import React, { useEffect } from "react";
import './project.css';
import ProjectItem from "./project-item";
import Search from "./search";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import CustomPagination from "../pagination/customPagination";
import { findAllWithPagination, findCountProjects, findFilterWithPagination } from "../../store";
import { findBusinessSector, findLocation } from "../../store/asyncThunk";

const ProjectList = () => {

   const dispatch = useDispatch();

   const { projects, isLoading, page, count, valuesForm, locations, businessSectors } = useSelector((state) => state.projectState);
   const { user } = useSelector((state) => state.authState);

   useEffect(() => {
      if (!valuesForm) {
         dispatch(findCountProjects({ user }));
         dispatch(findAllWithPagination({ user, page }));
      } else {
         dispatch(findFilterWithPagination({ user, values: valuesForm, page }))
         dispatch(findCountProjects({ user, values: valuesForm }));
      }
      if (!locations.length && !businessSectors.length) {
         return () => {
            dispatch(findLocation());
            dispatch(findBusinessSector());
         }
      }
   }, [page]);

   if (isLoading) return <div className="spinner-container mt-4"><FontAwesomeIcon className="fa-location" icon={faSpinner} spin /></div>

   return (
      <main className="container-fluid">
         <Search />
         {projects.length ?
            <div className="project-list scroll">
               <h2 className="mx-2">Porteur de projet</h2>
               <ul className="list-group">
                  {projects.length ? projects.map(project => <ProjectItem key={project.id} project={project} />) : null}
               </ul>
               {count && count > 12 ? <CustomPagination /> : null}
            </div> : <p className="text-center w-100 bold"> Aucun projet trouvé! </p>
         }
      </main>
   )
}

export default ProjectList;