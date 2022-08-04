import axios from "axios";

const defaultHeaders = (user) => axios.defaults.headers.common = { 'Authorization': `Bearer ${user ? user.token : null}` }

const create = async ({ user, values }) => {
   defaultHeaders(user);

   const formData = new FormData();
   for (let value in values) { formData.append(value, values[value]) }

   const response = await axios.post(`${process.env.REACT_APP_URL}/project/new`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
   });
   return response.data;
}

const findAllWithPagination = async ({ user, page }) => {
   defaultHeaders(user);
   const response = await axios(`${process.env.REACT_APP_URL}/project?skip=${(page * 12) - 12}`);
   return response.data;
}

const findCount = async ({ user, values }) => {
   defaultHeaders(user);
   let response;
   if (values) {
      if (values.city && values.location && values.businessSector)
         response = await axios(`${process.env.REACT_APP_URL}/project/count?city=${values.city}&location=${values.location}&businessSector=${values.businessSector}`)
      else if (values.location)
         response = await axios(`${process.env.REACT_APP_URL}/project/count?location=${values.location}`);
      else
         response = await axios(`${process.env.REACT_APP_URL}/project/count?city=${values.city}`)
   } else {
      response = await axios(`${process.env.REACT_APP_URL}/project/count`);
   }
   return response.data;
}

const findOne = async ({ user, id }) => {
   defaultHeaders(user);
   const response = await axios(`${process.env.REACT_APP_URL}/project/${id}`);
   return response.data;
}

const findFilterWithPagination = async ({ user, city, location, businessSector, page }) => {
   defaultHeaders(user);

   let response;

   if (businessSector && city && location)
      response = await axios(`${process.env.REACT_APP_URL}/project/filter?city=${city}&locationId=${location}&businessSectorId=${businessSector}&skip=${((page * 12) - 12)}`)
   else if (location)
      response = await axios(`${process.env.REACT_APP_URL}/project/filter?locationId=${location}&skip=${((page * 12) - 12)}`);
   else
      response = await axios(`${process.env.REACT_APP_URL}/project/filter?city=${city}&skip=${((page * 12) - 12)}`);

   return response.data;
}

const findBusinessSector = async () => {
   // defaultHeaders(user);
   const response = await axios(`${process.env.REACT_APP_URL}/businessSector/findAll`);
   return response.data;
}

const findLocation = async () => {
   // defaultHeaders(user);
   const response = await axios(`${process.env.REACT_APP_URL}/location/findAll`);
   return response.data;
}

const projectService = { findAllWithPagination, findCount, findOne, findFilterWithPagination, create, findBusinessSector, findLocation };

export default projectService