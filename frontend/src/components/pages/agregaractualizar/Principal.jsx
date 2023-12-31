//import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Grid, Card, Button } from '@mui/material';
import {Cambio} from './patronObservador.ts'
import '../../styles/Principal.css'
import { CabeceraModulo } from '../../extras/CabeceraModulo.jsx';

export default function Principal() {
  const locked=false
  const navigate= useNavigate()

  const handleSelectionChange = (event,value) => {
    if(value.label==="Celular"){
      navigate("/phone")
    }
    else{
      navigate("/internet")
    }
 
  }
  const [mostrarLista, setMostrarLista] = useState(false);

  const handleLista = () => {
    setMostrarLista(true);
    if(setMostrarLista){
      navigate('/listado');
    }

  };
  return (
    <div className='contenedor-agregacion'>
    <CabeceraModulo lock={locked}></CabeceraModulo>
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
    </div>
  );
}

const Elementos = [
  { label: 'Celular' },
  { label: 'Plan' },
];