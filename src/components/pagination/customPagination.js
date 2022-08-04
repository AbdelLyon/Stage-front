import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/projectSlice';

const CustomPagination = () => {

   const dispatch = useDispatch();
   const { page, count } = useSelector((state) => state.projectState);

   return (
      <Stack spacing={2} padding={2}>
         <Typography>Page: {page}</Typography>
         <Pagination count={Math.ceil(count / 12)} page={page} onChange={(event, value) => dispatch(setPage(value))} />
      </Stack>
   );

}

export default CustomPagination