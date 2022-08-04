import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const ProjectItem = ({ project }) => {

   return (
      <Link to={`/project/${project.id}`} className="card m-2 scale-animate shadow" >
         <div className="img-content">
            <img crossOrigin="anonymous" src={project.author.user.imageFile} alt="image_profile" />
            <FontAwesomeIcon className={project.author.user.active ? "fa-circle text-success" : "fa-circle text-danger"} icon={faCircle} />
         </div>
         <div className="project-info">
            <div className="location">
               <FontAwesomeIcon className="text-secondary" icon={faLocationDot} />
               <span>{project.city}</span>
            </div>
            <div className="description-content">
               <h3 className="card-title">{project.businessSector}</h3>
               <p> {project.description}</p>
               <p>{project.progress}</p>
            </div>
         </div>
      </Link >
   )
}

export default ProjectItem;