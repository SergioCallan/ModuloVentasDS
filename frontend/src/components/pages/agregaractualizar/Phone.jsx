import {Button, Card, CardContent, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ListPhone from './ListPhone';
export default function Phone(){

  const navigate =  useNavigate();
  const params = useParams();

  const [phone, setPhone] = useState({
    id: "",
    marca: "",
    modelo: "",
    color: "",
    almacenamiento: "",
    precio: "",
  })

const handleRegresar = () => {
    // Navegar de nuevo a la página principal
    navigate('/');
  };

  const handleConfirmar = () => {
    setMostrarConfirmacion(true);
  };

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleConfirmacionFinal = async(e) => {
    e.preventDefault();
    navigate('/phone')
    window.location.reload();
    setMostrarConfirmacion(false);
    if(editing){
      await axios.put(`http://localhost:4000/phone/${params.id}`, phone, {
        headers: { "Content-Type": "application/json" }
      });
    }else{
      setPhone(phone.id= uuidv4())
      await axios.post("http://localhost:4000/phone", phone, {
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMostrarConfirmacion(true);
  }
  const handleChange = (e) =>
    setPhone({...phone, [e.target.name]: e.target.value});

    const loadTask = async (id) => {

        const res = await axios.get(`http://localhost:4000/phone/${id}`);
        const data = await res.data;
        setPhone({
          id: data.id_celular,
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
                        name= "ID"
                        variant="outlined"
                        value={phone.id}
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
                        value={phone.marca}
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
                        value={phone.modelo}
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
                        value={phone.color}
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
                        value={phone.almacenamiento}
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
                        value={phone.precio}
                        onChange={handleChange}
                        style={{
                          margin: '10px'
                        }}
                      />
                      <div style={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'end'
                      }}>
                      <Button variant="contained" color="success" disabled={!phone.modelo || !phone.marca || !phone.color || !phone.almacenamiento || !phone.precio} onClick={handleConfirmar} type="submit">Confirmar</Button>

                      <Button variant="contained" color="success" onClick={handleRegresar} style={{marginLeft: '20px'}}>
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
            <strong>Marca:</strong> {phone.marca}
            <br />
            <strong>Modelo:</strong> {phone.modelo}
            <br />
            <strong>Color:</strong> {phone.color}
            <br />
            <strong>Almacenamiento:</strong> {phone.almacenamiento}
            <br />
            <strong>Precio:</strong> {phone.precio}
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
    )
}