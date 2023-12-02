import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../styles/EstilosAgregarActualizar/listado.css'

export default function ListInternet(){

    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate()
    const loadList = async () => {
        try {
          const response = await axios.get('https://modulo-ventas.onrender.com/internet');
          setTasks(response.data);
        } catch (error) {
          console.error('Error al cargar la lista:', error);
        }
      };
    
      const handleDelete = async (id) => {
        try {
          await axios.delete(`https://modulo-ventas.onrender.com/internet/${id}`);
          setTasks(tasks.filter((task) => task.id_internet !== id));
        } catch (error) {
          console.error('Error al eliminar el elemento:', error);
        }
      };
      const handleEdit = (id) => {
        navigate(`/internet/${id}/edit`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    useEffect(() => {
        loadList();
    },[])

    return (
        <>
            <h1>Lista de Internet</h1>
            {
            tasks.map((task) =>(
                    <Card style={{
                        marginBottom: ".7rem",
                        backgroundColor: "#006d77"
                    }}
                    key={task.id_plan}
                    >
                        <CardContent style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                        >
                            <div style={{color: "white"}}>
                                <Typography>Megas: {task.megas}</Typography>
                                <Typography>Precio: {task.precio}</Typography>
                                <Typography>Tipo: {task.tipo}</Typography>
                                <Typography>Estado: {task.estado}</Typography>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent : 'center', 
                                alignItems: 'center'
                            }}>
                                <Button
                                    variant="contained"
                                    type = "button"
                                    color="inherit"
                                    onClick={()=> handleEdit(task.id_plan)}
                                >Editar</Button>
                                <Button
                                    variant="contained"
                                    type = "button"
                                    onClick={()=> handleDelete(task.id_plan)}
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