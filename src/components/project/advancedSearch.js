import React from "react";
import { Formik } from "formik";
import { CustomCheckbox, CustomInput, CustomSelect } from "../form/custom-form";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../store/modalSlice";
import { Box, Modal } from "@mui/material";
import { findCountProjects, findFilterWithPagination } from "../../store";
import { setPage, setValuesForm } from "../../store/projectSlice";

const AvancedSearch = () => {

   const dispatch = useDispatch();

   const { isOpen } = useSelector(state => state.modalState)
   const { page, businessSectors, locations } = useSelector((state) => state.projectState);
   const { user } = useSelector((state) => state.authState);

   const submit = (values) => {
      dispatch(setPage(1));
      dispatch(setOpen(false));
      dispatch(setValuesForm(values))
      dispatch(findFilterWithPagination({ user, values, page }));
      dispatch(findCountProjects({ user, values }));
   }

   return (
      <>
         <div className="btn-container w-100 p-2">
            <button className="btn btn-outline-primary" onClick={() => dispatch(setOpen(true))}>Recherche avencer</button>
         </div>

         <Modal open={isOpen} onClose={() => dispatch(setOpen(false))} >
            <Box className="modal">
               <Formik
                  onSubmit={submit}
                  initialValues={{ city: "", location: "", businessSector: "" }}>
                  {
                     ({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>

                           <CustomInput name="city" type="text" label="Ville" placeholder="Ville" />

                           <CustomSelect name="location" label="Région/Pays">
                              <option value='' disabled>Sélectionnez une option</option>
                              {locations ? locations.map(l => <option key={l.id} value={l.id}> {l.name} </option>) : null}
                           </CustomSelect>

                           <h3>Etat d"avancement</h3>
                           <CustomCheckbox type="checkbox" name="idee"> Idée </CustomCheckbox>
                           <CustomCheckbox type="checkbox" name="business"> Business Plan rédigé </CustomCheckbox>
                           <CustomCheckbox type="checkbox" name="prototype"> Prototype développé </CustomCheckbox>
                           <CustomCheckbox type="checkbox" name="product"> Produit testé </CustomCheckbox>
                           <CustomCheckbox type="checkbox" name="user"> Utilisateurs actifs </CustomCheckbox>

                           <CustomSelect name="businessSector" label="Secteur d'activité">
                              <option value='' disabled>Sélectionnez une option</option>
                              {businessSectors ? businessSectors.map(sector => <option key={sector.id} value={sector.id}> {sector.name} </option>) : null}
                           </CustomSelect>

                           <button type="submit" className="btn btn-primary my-1">Chercher</button>
                        </form>
                     )
                  }
               </Formik>
            </Box>
         </Modal>
      </>
   )
}

export default AvancedSearch;
