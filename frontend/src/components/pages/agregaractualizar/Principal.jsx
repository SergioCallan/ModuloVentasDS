// import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { useNavigate } from 'react-router-dom';
import { Grid, Card } from '@mui/material';
import {Cambio} from './patronObservador.ts'


export default function Principal() {
  // const navigate = useNavigate();


 const tipoProducto = new Cambio()

 const handleSelectionChange = (event,value) => {

  tipoProducto.cambiarTipoProducto(value.label)

 }
  
  // const handleSelectionChange = (event, value) => {
  //   if (value && value.label === 'Celular') {
  //     navigate('/phone');
  //   } else if (value && value.label === 'Plan') {
  //     navigate('/internet');
  //   }
  // };
  
  return (
    <Grid container alignItems='center' justifyContent='center' columns={16}>
      <Grid item xs={8}>
        <Card 
          sx={{
            mt: 5,
            p:2,
            borderRadius:2,
            display: 'grid',
          }}
          elevation={6}
        >
          <Autocomplete 
          disablePortal
          id="combo-box-demo"
          options={Elementos}
          onChange={handleSelectionChange}
          renderInput={(params) => <TextField {...params} label="Tipo" />}
        />
        </Card>
      </Grid>
    </Grid>
  );
}

const Elementos = [
  { label: 'Celular' },
  { label: 'Plan' },
];