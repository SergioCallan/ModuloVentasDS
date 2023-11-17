// import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Grid, Card, Button } from '@mui/material';
import {Cambio} from './patronObservador.ts'

export default function Principal() {
  const navigate= useNavigate()
  const tipoProducto = new Cambio()

  const handleSelectionChange = (event,value) => {
 
   tipoProducto.cambiarTipoProducto(value.label)
 
  }
  const [mostrarLista, setMostrarLista] = useState(false);

  const handleLista = () => {
    setMostrarLista(true);
    if(setMostrarLista){
      navigate('/listado');
    }

  };
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
      <Card>
      <Button variant="contained" color="success" onClick={handleLista} style={{marginLeft: '20px'}}>Listado</Button>
      </Card>
    </Grid>
  );
}

const Elementos = [
  { label: 'Celular' },
  { label: 'Plan' },
];