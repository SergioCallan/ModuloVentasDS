// import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Grid, Card, Button } from '@mui/material';
import {Cambio} from './patronObservador.ts'
import '../../styles/Principal.css'
import Sidebar from '../../extras/Sidebar.jsx';
import {IconButton} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";

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

  //sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };



  return (
    <div className='contenedor-agregacion'>
       <div className="Header">
                    <IconButton className="contenedor-acordeon" onClick={handleSidebarOpen} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon className="icono-acordeon"/>
                    </IconButton>
                    <Sidebar className="Menu-lateral-desplegable" open={sidebarOpen} onClose={handleSidebarClose}/>
                    <div className="Contenedor-Nombre-Modulo">
                    <h1 className="Nombre-Modulo">Módulo de Ventas</h1>
                    </div> 
                </div>

    <Grid container alignItems='center' justifyContent='center' columns={16}>
      <Grid item xs={9}>
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

      <div>
      <Button variant="contained" color="primary" onClick={handleLista} style={{marginLeft: '20px'}}>Listado de celulares y planes</Button>
      </div>
   
    </div>
  );
}

const Elementos = [
  { label: 'Celular' },
  { label: 'Plan' },
];