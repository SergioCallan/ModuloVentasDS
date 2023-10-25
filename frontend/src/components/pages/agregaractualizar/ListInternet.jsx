import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ListInternet(){

    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate()
    const loadList = async () => {
        try {
          const response = await axios.get('http://localhost:4000/internet');
          setTasks(response.data);
        } catch (error) {
          console.error('Error al cargar la lista:', error);
        }
      };
    
      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:4000/internet/${id}`);
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
                    key={task.id_internet}
                    >
                        <CardContent style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                        >
                            <div style={{color: "white"}}>
                                <Typography>Megas: {task.megas}</Typography>
                                <Typography>Precio: {task.precio}</Typography>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent : 'center', 
                                alignItems: 'center'
                            }}>
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    onClick={()=> handleEdit(task.id_internet)}
                                >Editar</Button>
                                <Button
                                    variant="contained"
                                    onClick={()=> handleDelete(task.id_internet)}
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