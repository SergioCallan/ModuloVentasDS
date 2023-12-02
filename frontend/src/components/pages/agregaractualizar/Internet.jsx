import {Button, Card, CardContent, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Dialog, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import ListInternet from './ListInternet';
import { CabeceraModulo } from '../../extras/CabeceraModulo.jsx';

const createProxyHandler = (setStateFunction) => {
  return {
    set: function (target, key, value) {
      if (key in target) {
        // Realizar validaciones aquí, por ejemplo, verificar si "precio" es un número válido
        if (key === 'precio' && isNaN(parseFloat(value)) && value!="") {
          // Mostrar un mensaje de error amigable cerca del campo de entrada
          const errorMessage = 'El precio debe ser un número válido.';
          // Muestra el mensaje de error cerca del campo de entrada
          document.getElementById('precio-error').textContent = errorMessage;
          return true; // Indica que la operación fue exitosa
        }
        // Si pasa la validación, actualiza el estado
        setStateFunction({ ...target, [key]: value });
        // Borra el mensaje de error si se ha corregido
        if (key === 'precio') {
          document.getElementById('precio-error').textContent = '';
        }
        return true; // Indica que la operación fue exitosa
      } else {
        throw new Error(`La propiedad "${key}" no es válida.`);
      }
    },
  };
};

export default function Internet(){
  const locked=false
  const navigate =  useNavigate();
  const params = useParams();

    const [internet, setInternet] = useState({
        id: "",
        megas: "",
        precio: "",
        estado: "Disponible",
        tipo: ""
      })

      // Genera un nuevo UUID para el ID
    const newId = uuidv4();

    // Asigna el nuevo UUID al objeto phone
    const updatedInternet = { ...internet, id: newId };

    const proxyInternet = new Proxy(updatedInternet, createProxyHandler(setInternet));
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [editing, setEditing] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setMostrarConfirmacion(true);
    };
  
    const handleChange = (e) => {
      proxyInternet[e.target.name] = e.target.value;
    };

    const handleConfirmar = () => {
      setMostrarConfirmacion(true);
    };

    const handleRegresar = () => {
      // Navegar de nuevo a la página principal
      navigate('/');
    };

    const handleConfirmacionFinal = async(e) => {
      e.preventDefault();
      
      setMostrarConfirmacion(false);
      if(editing){
        
        await axios.put(`https://modulo-ventas.onrender.com/internet/${params.id}`, proxyInternet, {
          headers: { "Content-Type": "application/json" }
        });
      }else{
        const response = await axios.post("https://modulo-ventas.onrender.com/internet", proxyInternet, {
          headers: { "Content-Type": "application/json" },
        });
        const newIntenetId = response.data.id;
        console.log("Nuevo ID asignado:", newIntenetId);
        
      }
      window.location.reload();
    };
    
    const loadTask = async (id) => {
      
      const res = await axios.get(`https://modulo-ventas.onrender.com/internet/${id}`);
      const data = await res.data;
      setInternet({
        megas: data.megas,
        precio: data.precio,
        tipo: data.tipo
      });
      setEditing(true)
    };

    useEffect(() => {
      if(params.id){
        loadTask(params.id);
      }
    },[params.id])

    return(
        <div>
        <CabeceraModulo lock={locked}/>
        <Grid container alignItems='center' justifyContent='center' columns={9}>
        <Grid item xs={8}>
            <Card
                sx={{
                    mt: 5,
                    p:2,
                    borderRadius:2,
                    display: 'grid',
                }}
                elevation={6}
                style={{
                  marginBottom: ".7rem",
                }}
            >
                <CardContent>
                    <form onSubmit={handleSubmit}>
                    <TextField
                    disabled
                    id="outlined-required"
                    label="Internet"
                    variant="outlined"
                    style={{
                      margin: '10px'
                    }}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Megas"
                      variant="outlined"
                      name="megas"
                      value={proxyInternet.megas}
                      onChange={handleChange}
                      style={{
                        margin: '10px'
                      }}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Precio"
                      variant="outlined"
                      name="precio"
                      value={proxyInternet.precio}
                      onChange={handleChange}
                      style={{
                        margin: '10px'
                      }}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Tipo"
                      variant="outlined"
                      name="tipo"
                      value={proxyInternet.tipo}
                      onChange={handleChange}
                      style={{
                        margin: '10px'
                      }}
                    />
                    <Typography id="precio-error" style={{ color: 'red' }}></Typography>
                    <div style={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'end'
                      }}
                    >
                    <Button variant="contained" color="success" disabled={!proxyInternet.megas  || !proxyInternet.precio} onClick={handleConfirmar} type="submit">Confirmar</Button>
                    <Button variant="contained" color="error" onClick={handleRegresar} style={{marginLeft: '20px'}}>
                      Regresar
                    </Button>
                    </div>
                
                    </form>
                </CardContent>
                
                <Dialog
                open={mostrarConfirmacion}
                onClose={() => setMostrarConfirmacion(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">Confirmación</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <strong>Megas:</strong> {proxyInternet.megas}
                    <br />
                    <strong>Precio:</strong> {proxyInternet.precio}
                    <br />
                    <strong>Estado: </strong> {proxyInternet.estado}
                    <br />
                    <strong>Tipo: </strong> {proxyInternet.tipo}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setMostrarConfirmacion(false)} color="primary">
                    Cerrar
                  </Button>
                  <Button onClick={handleConfirmacionFinal} color="primary"  autoFocus>
                    Confirmar
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
            <Card
            sx={{
              mt: 5,
              p:2,
              borderRadius:2,
              display: 'grid',
          }}
          elevation={6}
          style={{
            marginBottom: ".7rem",
          }}>
            <ListInternet/>
            </Card>
        </Grid>
    </Grid>
    </div>
    )
}