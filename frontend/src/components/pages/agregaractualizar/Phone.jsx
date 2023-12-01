import {Button, Card, CardContent, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Dialog, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import ListPhone from './ListPhone';
import { CabeceraModulo } from '../../extras/CabeceraModulo';

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

export default function Phone() {
  const navigate = useNavigate();
  const params = useParams();

  const [phone, setPhone] = useState({
    id: '',
    marca: '',
    modelo: '',
    color: '',
    almacenamiento: '',
    precio: '',
  });

  // Genera un nuevo UUID para el ID
  const newId = uuidv4();

  // Asigna el nuevo UUID al objeto phone
  const updatedPhone = { ...phone, id: newId };

  // Crea el Proxy con el objeto actualizado
  const proxyPhone = new Proxy(updatedPhone, createProxyHandler(setPhone));
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMostrarConfirmacion(true);
  };

  const handleChange = (e) => {
    proxyPhone[e.target.name] = e.target.value;
  };

  const handleRegresar = () => {
    // Navegar de nuevo a la página principal
    navigate('/');
  };

  const handleConfirmar = () => {
    setMostrarConfirmacion(true);
  };

  const handleConfirmacionFinal = async (e) => {
    e.preventDefault();

    setMostrarConfirmacion(false);
    if (editing) {
      await axios.put(`https://modulo-ventas.onrender.com/phone/${params.id}`, proxyPhone, {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const response = await axios.post("https://modulo-ventas.onrender.com/phone", proxyPhone, {
        headers: { "Content-Type": "application/json" },
      });
      const newPhoneId = response.data.id;
      console.log("Nuevo ID asignado:", newPhoneId);
      window.location.reload();
    }
  };

    const loadTask = async (id) => {

        const res = await axios.get(`https://modulo-ventas.onrender.com/phone/${id}`);
        const data = await res.data;
        setPhone({
          marca: data.marca,
          modelo: data.modelo,
          color: data.color,
          almacenamiento: data.almacenamiento,
          precio: data.precio
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
        <CabeceraModulo></CabeceraModulo>
        <Grid container alignItems='center' justifyContent='center' columns={9} >
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
                    <CardContent> 
                        <form onSubmit={handleSubmit}>
                        <TextField
                        disabled
                        id="outlined-required"
                        label="Celular" 
                        variant="outlined"
                        style={{
                          margin: '10px'
                        }}
                      />
                      <TextField
                        required
                        id="outlined-basic"
                        label="Marca"
                        variant="outlined"
                        name="marca"
                        value={proxyPhone.marca}
                        onChange={handleChange}
                        style={{
                          margin: '10px'
                        }}
                      />
                      <TextField
                        required
                        id="outlined-basic"
                        label="Modelo"
                        variant="outlined"
                        name="modelo"
                        value={proxyPhone.modelo}
                        onChange={handleChange}
                        style={{
                          margin: '10px'
                        }}
                      />
                      <TextField
                        required
                        id="outlined-basic"
                        label="Color"
                        variant="outlined"
                        name="color"
                        value={proxyPhone.color}
                        onChange={handleChange}
                        style={{
                          margin: '10px'
                        }}
                      />
                      <TextField
                        required
                        id="outlined-basic"
                        label="Almacenamiento"
                        variant="outlined"
                        name="almacenamiento"
                        value={proxyPhone.almacenamiento}
                        onChange={handleChange}
                        style={{
                          margin: '10px'
                        }}
                      />
                      <TextField
                        required
                        id="outlined-basic"
                        label="Precio"
                        variant="outlined"
                        name="precio"
                        value={proxyPhone.precio}
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
                      }}>
                      <Button variant="contained" color="success" disabled={!proxyPhone.modelo || !proxyPhone.marca || !proxyPhone.color || !proxyPhone.almacenamiento || !proxyPhone.precio} onClick={handleConfirmar} type="submit">Confirmar</Button>

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
            <strong>Marca:</strong> {proxyPhone.marca}
            <br />
            <strong>Modelo:</strong> {proxyPhone.modelo}
            <br />
            <strong>Color:</strong> {proxyPhone.color}
            <br />
            <strong>Almacenamiento:</strong> {proxyPhone.almacenamiento}
            <br />
            <strong>Precio:</strong> {proxyPhone.precio}
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
            <ListPhone/>
            </Card>
            </Grid>
        </Grid>
        </div>
    )
}