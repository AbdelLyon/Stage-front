import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { CustomInput } from '../form/custom-form';
import { Link, useNavigate } from 'react-router-dom';
import { authShcema } from '../form/validators';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../store/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Alerts from '../alert/alert';
import { register } from '../../store';

const Register = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { user, isLoading, isError, message } = useSelector((state) => state.authState);

   useEffect(() => {
      if (!isError) dispatch(reset())
   }, [user, isError, message, dispatch])

   const submit = (values, actions) => {
      dispatch(register(values))
      actions.resetForm();
      navigate('/projects');
   }

   if (isLoading) {
      return <div className="spinner-container mt-4"><FontAwesomeIcon className="fa-location" icon={faSpinner} spin /></div>
   }

   return (
      <div className="form-container">
         <Formik
            onSubmit={submit}
            initialValues={{ firstname: '', lastname: '', phone: '', email: '', password: '' }}
            validationSchema={authShcema}
         >
            {
               ({ handleSubmit, errors }) => (
                  <div className="form-content shadow">
                     <h2>Inscription</h2>
                     <form onSubmit={handleSubmit}>
                        <div className="d-flex">
                           <div className="w-100 mr-1">
                              <CustomInput name="firstname" type="text" placeholder="Prénom *" />
                           </div>
                           <div className="w-100">
                              <CustomInput name="lastname" type="text" placeholder="Nom *" />
                           </div>
                        </div>

                        <CustomInput name="phone" type="text" placeholder="Numéro de téléphone *" />
                        <CustomInput name="email" type="email" placeholder="Email *" conflict_email={errors.conflictEmail ? errors.conflictEmail : null} />
                        <CustomInput name="password" type="password" placeholder="Mot de passe *" />

                        <div className="btn-container">
                           <button type='submit' className="btn btn-primary my-1">S'inscrire</button>
                           <small> En continuant, vous acceptez <Link className='link text-blue' to='/termsAndConditions' > les conditions générales</Link></small>
                        </div>
                     </form>
                     <div className="btn-container mb-2">
                        <small className='my-1 text-center'>Déjà inscris ?</small>
                        <Link className='text-light' to='/login' ><button className='btn btn-outline-primary'> Se connecter</button></Link>
                     </div>
                     {(isError) ? <Alerts type="error" title="Erreur" content={message} /> : null}

                  </div>
               )
            }
         </Formik>
      </div>
   );
}

export default Register;
