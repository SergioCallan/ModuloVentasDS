import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../styles/EstilosAgregarActualizar/listado.css'

export default function ListPhone(){

    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate()
    const loadList = async () => {
        try {
          const response = await axios.get('https://modulo-ventas.onrender.com/phone');
          setTasks(response.data);
        } catch (error) {
          console.error('Error al cargar la lista:', error);
        }
      };
    
      const handleDelete = async (id) => {
        try {
          await axios.delete(`https://modulo-ventas.onrender.com/phone/${id}`);
          setTasks(tasks.filter((task) => task.id_celular !== id));
        } catch (error) {
          console.error('Error al eliminar el elemento:', error);
        }
      };
      const handleEdit = (id) => {
        navigate(`/phone/${id}/edit`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    useEffect(() => {
        loadList();
    },[])

    return (
        <>
            <h1 className="title-list">Lista de Celulares</h1>
            {
            tasks.map((task) =>(
                    <Card style={{
                        marginBottom: ".7rem",
                        backgroundColor: "#006d77"
                    }}
                    key={task.id_celular}
                    >
                        <CardContent style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}  
                        >
                            <div style={{color: "white"}}>
                                <Typography>Marca: {task.marca}</Typography>
                                <Typography>Modelo: {task.modelo}</Typography>
                                <Typography>Color: {task.color}</Typography>
                                <Typography>Almacenamiento: {task.almacenamiento} GB</Typography>
                                <Typography>Precio: {task.precio}</Typography>
                            </div>
                            <div
                            style={{
                                display: 'flex',
                                justifyContent : 'center', 
                                alignItems: 'center'
                            }}>
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    onClick={()=> handleEdit(task.id_celular)}
                                >Editar</Button>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={()=> handleDelete(task.id_celular)}
                                    style={{marginLeft: ".5rem",
                                    backgroundColor: 'red',
                                    color: 'white'}}
                                >Eliminar</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}