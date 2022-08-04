import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput, CustomSelect } from '../form/custom-form';
import AlertDialog from '../alert/alertDialog';
import { setOpen } from '../../store/modalSlice';
import { createProject } from '../../store';
import { ProjectShcema } from '../form/validators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ProjectForm = () => {

   const dispatch = useDispatch();

   const { businessSectors, locations } = useSelector((state) => state.projectState);
   const { user } = useSelector((state) => state.authState);

   const submit = (values, actions) => {
      dispatch(setOpen(true))
      dispatch(createProject({ user, values }));
      actions.resetForm();
   }
   const faCheked = <FontAwesomeIcon className='fa-circle-form cheked' icon={faCheck} />;

   return (
      <Formik
         onSubmit={submit}
         initialValues={{ name: '', description: '', location: '', city: '', progress: 'En cours', businessSector: '', phone: '', file: '' }}
         validationSchema={ProjectShcema}
      >
         {
            ({ handleSubmit, setFieldValue }) => (

               <div className="form-content shadow">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">

                     <CustomInput name="name" label="Nom *" type="text" placeholder="Le nom du project" />
                     <CustomInput id="description" label="Déscription *" type="textarea" name="description" rows="10" />

                     <CustomSelect name="progress" label="Etat d'avencement *">
                        <option value='test'> En cours </option>
                     </CustomSelect>

                     <CustomSelect name="businessSector" label="Secteur d'activité">
                        <option value='' disabled>Sélectionnez une option</option>
                        {businessSectors ? businessSectors.map(sector => <option key={sector.id} value={sector.id}> {sector.name} </option>) : null}
                     </CustomSelect>

                     <CustomInput name="city" label="Ville *" type="text" placeholder="Votre ville" />

                     <CustomSelect name="location" label="Région/Pays">
                        <option value='' disabled>Sélectionnez une option</option>
                        {locations ? locations.map(l => <option key={l.id} value={l.id}> {l.name} </option>) : null}
                     </CustomSelect>

                     <CustomInput name="phone" label="Votre numéro de téléphone *" type="text" placeholder="Votre numéro ne sera pas communiqué sur le site et restera confidentiel." />

                     {/* <CustomInput name="file" label="Image de profile *" type="file" placeholder="Image de profile" /> */}

                     <div className="form-group">
                        <input type="file" name="file" accept="image/*" onChange={(e) =>
                           setFieldValue('file', e.currentTarget.files[0])
                        } />
                     </div>

                     <div className="btn-container">
                        <button type='submit' className="btn btn-primary my-1">Suivant</button>
                     </div>
                  </form>
                  <AlertDialog title='Votre projet a été crée avec succès !' content={faCheked} />
               </div>
            )
         }
      </Formik>
   );
}

export default ProjectForm;
