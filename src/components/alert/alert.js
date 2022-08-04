import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Alerts = ({ type, title, content }) => {
   return (
      <Stack sx={{ width: '100%', fontSize: 16 }} spacing={2}>
         <Alert severity={type} sx={{ fontSize: 14 }}>
            <AlertTitle sx={{ fontSize: 15 }}>{title}</AlertTitle>
            {content}
         </Alert>
      </Stack >
   );
}

export default Alerts;


// export const AlertWarning = () => {
//    return (
//       <Stack sx={{ width: '100%' }} spacing={2}>
//          <Alert severity="warning">
//             <AlertTitle>Warning</AlertTitle>
//             This is a warning alert — <strong>check it out!</strong>
//          </Alert>
//       </Stack>
//    );
// }




// export const AlertInfo = () => {
//    return (
//       <Stack sx={{ width: '100%' }} spacing={2}>
//          <Alert severity="info">
//             <AlertTitle>Info</AlertTitle>
//             This is an info alert — <strong>check it out!</strong>
//          </Alert>
//       </Stack>
//    );
// }

// export const AlertSuccess = () => {
//    return (
//       <Stack sx={{ width: '100%' }} spacing={2}>
//          <Alert severity="success">
//             <AlertTitle>Success</AlertTitle>
//             This is a success alert — <strong>check it out!</strong>
//          </Alert>
//       </Stack>
//    );
// }








