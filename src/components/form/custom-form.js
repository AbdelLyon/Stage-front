import { useField } from 'formik';
import React from 'react';
import '../form/form.css'

export const CustomInput = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
      <div className="form-group">
         <label className='label' htmlFor={props.id || props.name}>{label}</label>
         {props.type === 'textarea' ?
            <textarea className='my-1' {...field} {...props} placeholder={props.placeholder} /> :
            <input className='my-1' {...field} {...props} placeholder={props.placeholder} />
         }

         {meta.touched && meta.error ? (<small className="text-danger mt-1">{meta.error}</small>) : null}

      </div>
   )
}

export const CustomSelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
      <div className='form-group'>
         <label className='label' htmlFor={props.id || props.name}>{label}</label>
         <select className='my-1' {...field} {...props} />
         {meta.touched && meta.error ? (<small className="text-danger mt-1">{meta.error}</small>) : null}
      </div>
   );
}

export const CustomCheckbox = ({ children, ...props }) => {
   const [field, meta] = useField({ ...props });
   return (
      <div className='d-flex flex-column'>
         <label className="checkbox-input my-1">
            <input {...field} {...props} />
            {children}
         </label>
         {meta.touched && meta.error ? (<small className="text-danger">{meta.error}</small>) : null}
      </div>
   );
}





