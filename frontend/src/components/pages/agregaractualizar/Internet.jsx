import {Button, Card, CardContent, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ListInternet from './ListInternet'

export default function Internet(){
  const navigate =  useNavigate();
  const params = useParams();

    const [internet, setInternet] = useState({
        id: "",
        megas: "",
        precio: "",
        estado: "Disponible",
        tipo: ""
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
        setMostrarConfirmacion(false);
        navigate('/internet')
        window.location.reload();
        if(editing){
          await axios.put(`http://localhost:4000/internet/${params.id}`, internet, {
            headers: { "Content-Type": "application/json" }
          });
        }else{
          setInternet(internet.id= uuidv4())
          await axios.post("http://localhost:4000/internet", internet, {
            headers: { "Content-Type": "application/json" },
          });
        }
        
      };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMostrarConfirmacion(true);
  }
    const handleChange = (e) =>
      setInternet({...internet, [e.target.name]: e.target.value});

      const loadTask = async (id) => {

        const res = await axios.get(`http://localhost:4000/internet/${id}`);
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
                      value={internet.megas}
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
                      value={internet.precio}
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
                      value={internet.tipo}
                      onChange={handleChange}
                      style={{
                        margin: '10px'
                      }}
                    />
                    <div style={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'end'
                      }}
                    >
                    <Button variant="contained" color="success"   disabled={!internet.megas  || !internet.precio} onClick={handleConfirmar} type="submit">Confirmar</Button>
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
                    <strong>Megas:</strong> {internet.megas}
                    <br />
                    <strong>Precio:</strong> {internet.precio}
                    <br />
                    <strong>Estado: </strong> {internet.estado}
                    <br />
                    <strong>Tipo: </strong> {internet.tipo}
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
    )
}