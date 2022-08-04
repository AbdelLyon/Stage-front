import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/background.png';
import { findCountProjects, findFilterWithPagination } from '../../store';
import { reset, setValuesForm } from '../../store/projectSlice';
import Alerts from '../alert/alert';
import { CustomInput } from '../form/custom-form';
import { ProjectShcema } from '../form/validators';
import './home.css'

const Home = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { page, message, isError, count } = useSelector((state) => state.projectState);
   const { user } = useSelector((state) => state.authState);

   useEffect(() => {
      dispatch(reset())
      dispatch(findCountProjects({ user }));
   }, [])


   const submit = (values) => {
      dispatch(findFilterWithPagination({ user, values, page }));
      dispatch(findCountProjects({ user, values }));
      dispatch(setValuesForm(values))
      if (!isError) navigate('/projects')
   }

   return (
      <div className='background' style={{ backgroundImage: `linear-gradient(to right, #31374328, #734c3343),url(${backgroundImage})` }}>
         <div className="home-container">
            <div className="home-content">
               <h1 className='text-light mb-4'>Trouvez votre associé développeur/CTO</h1>
               <Formik
                  onSubmit={submit}
                  initialValues={{ city: '' }}
                  validationSchema={ProjectShcema.pick(['city'])}
               >
                  {
                     ({ handleSubmit }) => (

                        <form className='form-home' onSubmit={handleSubmit}>
                           <CustomInput className="input-home" name="city" type="text" placeholder="Ville" />
                           <button className='btn-small' type='submit'>Rechercher</button>
                        </form>
                     )
                  }
               </Formik>
               <div className="d-flex justify-content-around align-items-center w-50 m-2-auto text-light bold">
                  <p> {count} projets</p>
                  <span className='text-secondary bold fs-3'>|</span>
                  <p>4500 Développeurs</p>
               </div>
               {isError && message ? <Alerts type="error" title="Erreur" content={message} /> : null}
            </div>
         </div>

      </div>
   )
}

export default Home;