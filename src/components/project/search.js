import React from "react";
import SearchByCity from "./searchByLocation";
import AvancedSearch from "./advancedSearch";
import { findAllWithPagination, findCountProjects } from "../../store";
import { setCount, setPage, setValuesForm } from "../../store/projectSlice";
import { useDispatch, useSelector } from "react-redux";


const Search = () => {

   const dispatch = useDispatch();

   const { page } = useSelector((state) => state.projectState);
   const { user } = useSelector((state) => state.authState);

   const handleClick = () => {
      dispatch(findCountProjects({ user }));
      dispatch(findAllWithPagination({ user, page }));
      dispatch(setPage(1))
      dispatch(setCount(0))
      dispatch(setValuesForm(null))
   };

   return (
      <aside className="bg-white">
         <div className="btn-container w-100 p-2">
            <button className='btn btn-outline-primary' onClick={handleClick}>Tous les projets</button>
         </div>
         <SearchByCity />
         <AvancedSearch />
      </aside >
   )
}

export default Search;
