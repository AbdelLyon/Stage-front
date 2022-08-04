import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const authShcema = Yup.object().shape({
   firstname: Yup.string().required('Champ obligatoire'),
   lastname: Yup.string().required('Champ obligatoire'),
   phone: Yup.string().matches(phoneRegExp, 'Numéro de téléphone incorrect').required('Champ obligatoire'),
   email: Yup.string().email('Email incorrect').required('Champ obligatoire'),
   password: Yup.string().min(3, 'Trop court').required('Champ obligatoire'),

})

export const ProjectShcema = Yup.object().shape({
   name: Yup.string().required('Champ obligatoire'),
   description: Yup.string().required('Champ obligatoire'),
   city: Yup.string().required('Champ obligatoire'),
   location: Yup.string().required('Champ obligatoire'),
   progress: Yup.string().required('Champ obligatoire'),
   businessSector: Yup.string().required('Champ obligatoire'),
   phone: Yup.string().matches(phoneRegExp, 'Numéro de téléphone incorrect').required('Champ obligatoire'),
})
