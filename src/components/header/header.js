import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faRightToBracket, faLandmark, faRightFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from "react-router-dom";
import './header.css';
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../store/authSlice";
import { logout } from "../../store";

const Header = () => {

   let location = useLocation();
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.authState)

   const handlClick = async () => {
      await dispatch(logout())
      dispatch(reset())
      navigate('/login');
   }

   return (
      <header>
         <nav className={location.pathname !== "/" ? "shadow" : null} >
            <Link className="logo" to="/"><FontAwesomeIcon icon={faLandmark} /></Link>
            <div className="nav-user">
               <Link className="nav-link" to="/devloppeur" >Développeurs</Link>
               <Link className="nav-link" to="/projects" >projets</Link>
            </div>
            <div className="nav-auth">

               {!user ?
                  <>
                     <Link className="nav-link" to="/login" ><FontAwesomeIcon icon={faRightToBracket} /></Link>
                     <Link className="nav-link" to="/register" ><FontAwesomeIcon icon={faUserPlus} /></Link>
                  </> :
                  <>
                     <Link className="nav-link" to="/project/new" ><FontAwesomeIcon icon={faPlus} /></Link>
                     <i className="nav-link" onClick={handlClick} ><FontAwesomeIcon icon={faRightFromBracket} /></i>
                  </>
               }
            </div>
         </nav>
      </header>
   )
}

export default Header;
