
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircle, faLocationDot, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { findPrejectById } from '../../store/asyncThunk';

const ProjectDetails = () => {

   let { id } = useParams();
   const dispatch = useDispatch();

   const { project, isLoading } = useSelector((state) => state.projectState);
   const { user } = useSelector((state) => state.authState);


   useEffect(() => {
      return () => dispatch(findPrejectById({ user, id }))
   }, [])

   if (isLoading) return <div className="spinner-container mt-4"><FontAwesomeIcon className="fa-location" icon={faSpinner} spin /></div>

   const displayProject = () => {
      if (project) {
         return (
            <>
               <aside>
                  <div className='card'>
                     <div className="img-content">
                        <img crossOrigin="anonymous" src={project.author.user.imageFile} alt="image_profile" />
                        <FontAwesomeIcon className={project.author.user.active ? "fa-circle text-success" : "fa-circle text-danger"} icon={faCircle} />
                     </div>
                     <div className="project-info">
                        <small className="text-muted">Mise en ligne le: {new Date(project.createdAt).toLocaleDateString()} </small>
                        <div className="my-2">
                           <h3 className="card-title">{project.name}</h3>
                        </div>
                        <div className="location">
                           <FontAwesomeIcon className="text-secondary" icon={faLocationDot} />
                           <span>{project.city}</span>
                        </div>
                     </div>
                  </div>
                  <div className='card my-1'>
                     <div className="project-info">
                        <div className="my-2">
                           <h3>Déscription</h3>
                        </div>
                        <div className="my-2">
                           <p> {project.description}</p>
                           <div className="link-register">
                              <Link to='/register'> Inscrivez-vous pour consulter la déscription complète du projet </Link>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className='card'>
                     <div className="project-info">
                        <div className="my-2">
                           <h3>Type de projet</h3>
                        </div>
                        <p className="my-2"> {project.description}</p>
                        <p className="bg-primary-light p-1">{project.businessSector}</p>

                     </div>
                  </div>
                  <div className='card'>
                     <div className="project-info">
                        <div className="my-2">
                           <h3>Périmètre de recherche</h3>
                        </div>
                        <p className="my-2"> {project.location}</p>
                     </div>
                  </div>
               </aside>

               <div className="project-list">
                  <div className='card shadow w-100'>
                     <div className="project-info">
                        <div className="my-2">
                           <h3> {project.name} </h3>
                        </div>
                        <div className="location">
                           <FontAwesomeIcon className="text-secondary" icon={faLocationDot} />
                           <span>{project.city}</span>
                           <p className="bg-primary-light my-2 p-1">{project.businessSector}</p>
                        </div>
                     </div>
                  </div>
                  <div className='card shadow my-2 w-100'>
                     <div className="project-info">
                        <div className="my-2">
                           <h3>Périmètre de recherche</h3>
                        </div>
                        <p className="my-2"> {project.location}</p>
                     </div>
                  </div>
                  <div className='card shadow w-100'>
                     <div className="project-info">
                        <div className="my-2 text-center">
                           <h2 className='my-2'>Ce projet t'intéresse ?</h2>
                           <Link className='text-light' to='/register' ><button className='btn btn-primary'> Je m'inscris</button></Link>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         )
      }
   }

   return (
      <div className="container">
         <Link className='text-primary bold' to='/projects' ><FontAwesomeIcon icon={faAngleLeft} />Retour</Link>
         <main className='container my-2'>
            {displayProject()}
         </main>
      </div>
   )
}

export default ProjectDetails;