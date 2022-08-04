import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { CustomInput } from '../form/custom-form';
import { Link } from 'react-router-dom';
import { authShcema } from '../form/validators';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Alerts from '../alert/alert';
import { login } from '../../store';
import { reset } from '../../store/authSlice';

const Login = () => {

   const navigate = useNavigate()

   const dispatch = useDispatch()


   const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.authState)


   useEffect(() => {
      if (isSuccess || user) navigate('/projects')
      if (!isError) dispatch(reset())
   }, [user, isError, isSuccess, message, navigate, dispatch])


   const handleSubmit = ({ email, password }) => dispatch(login({ email, password }))


   if (isLoading) return <div className="spinner-container mt-4"><FontAwesomeIcon className="fa-location" icon={faSpinner} spin /></div>

   return (
      <div className="form-container">
         <Formik onSubmit={handleSubmit} initialValues={{ email: '', password: '' }} validationSchema={authShcema.pick(['email', 'password'])}>
            {
               ({ handleSubmit }) => (
                  <div className="form-content shadow">
                     <h2>Connexion</h2>
                     <form onSubmit={handleSubmit}>

                        <CustomInput name="email" type="email" placeholder="Email *" />
                        <CustomInput name="password" type="password" placeholder="Mot de passe *" />

                        <div className="btn-container">
                           <div className="d-flex justify-content-end">
                              <small> <Link className='link text-blue' to='#' >Mot de passe oublié</Link></small>
                           </div>
                           <button type='submit' className="btn btn-primary my-1">Se connecter</button>
                        </div>
                     </form>
                     <div className="btn-container mb-2">
                        <small className='my-1 text-center'>Pas encore inscris ?</small>
                        <Link className='text-light' to='/register' ><button className='btn btn-outline-primary'>S'inscrire</button></Link>
                     </div>
                     {(isError) ? <Alerts type="error" title="Erreur" content={message} /> : null}
                  </div>
               )
            }
         </Formik>
      </div>
   );
}

export default Login;

