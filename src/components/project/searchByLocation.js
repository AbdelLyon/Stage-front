import React from "react";
import { Formik } from 'formik';
import { CustomSelect } from '../form/custom-form';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { findCountProjects, findFilterWithPagination } from "../../store";
import { setPage, setValuesForm } from "../../store/projectSlice";
import * as Yup from 'yup';

const SearchByLocation = () => {

   const dispatch = useDispatch();

   const { page, locations } = useSelector((state) => state.projectState);
   const { user } = useSelector((state) => state.authState);


   const submit = (values) => {
      dispatch(setPage(1))
      dispatch(setValuesForm(values))
      dispatch(findFilterWithPagination({ user, values, page }));
      dispatch(findCountProjects({ user, values }));
   };

   return (
      <Formik onSubmit={submit} initialValues={{ location: "" }} validationSchema={Yup.object().shape({ location: Yup.string().required('Champ obligatoire') })}>
         {
            ({ handleSubmit }) => (
               <div className=" w-100 p-2">
                  <form onSubmit={handleSubmit}>

                     <CustomSelect name="location" label="Région/Pays">
                        <option value='' disabled>Sélectionnez une option</option>
                        {locations ? locations.map(l => <option key={l.id} value={l.id}> {l.name} </option>) : null}
                     </CustomSelect>
                     <button type='submit' className="btn btn-primary my-1"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                  </form>
               </div>
            )
         }
      </Formik>
   )
}

export default SearchByLocation;
